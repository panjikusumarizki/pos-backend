const productModel = require('../models/products_models')
const { success, failed, successWithMeta } = require('../helpers/response')
const upload = require('../helpers/upload')

const redis = require('redis')
const redisClient = redis.createClient()

const { REDISPRODUCT } = require('../helpers/env')

const product = {
    getAll: (req, res) => {
        const search = !req.query.search ? '' : req.query.search
        const sortBy = !req.query.sortBy ? 'id' : req.query.sortBy
        const sortType = !req.query.sortType ? 'asc' : req.query.sortType
        const limit = !req.query.limit ? 20 : parseInt(req.query.limit)
        const page = !req.query.page ? 1 : parseInt(req.query.page)
        const offset = page===1 ? 0 : (page-1)*limit
        productModel.getAll(search, sortBy, sortType, limit, offset)
        .then((result) => {
            redisClient.set(REDISPRODUCT, JSON.stringify(result))
            const totalRows = result[0].count
            const meta = {
                totalRows: totalRows,
                totalPage: Math.ceil(totalRows/limit),
                page
            }
            successWithMeta(res, result, meta, 'Get data from database')
        })
        .catch((err) => {
            failed(res, [], err.message)
        })
    },
    getDetail: (req, res) => {
        const id = req.params.id
        productModel.getDetail(id)
        .then((result) => {
            success(res, result, 'Get detail product success')
        })
        .catch((err) => {
            failed(res, [], err.message)
        })
    },
    insert: (req, res) => {
        upload.single('picture')(req, res, (err) => {
            if (err) {
                if (err.code === 'LIMIT_FILE_SIZE') {
                    failed(res, [], 'File size max 1 mb')
                } else {
                    failed(res, [], err)
                }
            } else {
                const body = req.body
                body.picture = req.file.filename
                productModel.insert(body)
                .then((result) => {
                    redisClient.del(REDISPRODUCT)
                    success(res, result, 'Insert product success')
                })
                .catch((err) => {
                    failed(res, [], err.message)
                })
            }
        })
    },
    update: (req, res) => {
        upload.single('picture')(req, res, (err) => {
            if (err) {
                if (err.code === 'LIMIT_FILE_SIZE') {
                    failed(res, [], 'File size max 1 mb')
                } else {
                    failed(res, [], err)
                }
            } else {
                const id = req.params.id
                const body = req.body
                body.picture = !req.file ? '' : req.file.filename
                productModel.update(body, id)
                .then((result) => {
                    redisClient.del(REDISPRODUCT)
                    success(res, result, 'Update product success')
                })
                .catch((err) => {
                    failed(res, [], err.message)
                })
            }
        })
    },
    delete: (req, res) => {
        const id = req.params.id
        productModel.delete(id)
        .then((result) => {
            redisClient.del(REDISPRODUCT)
            success(res, result, 'Delete product success')
        })
        .catch((err) => {
            failed(res, [], err.message)
        })
    }
}

module.exports = product