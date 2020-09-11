const productModel = require('../models/products_models')
const { success, failed, successWithMeta } = require('../helpers/response')

const product = {
    getAll: (req, res) => {
        const nama = !req.query.name ? '' : req.query.name
        const sortBy = !req.query.sortBy ? 'id' : req.query.sortBy
        const sortType = !req.query.sortType ? 'asc' : req.query.sortType
        const limit = !req.query.limit ? 9 : parseInt(req.query.limit)
        const page = !req.query.page ? 1 : parseInt(req.query.page)
        const offset = page===1 ? 0 : (page-1)*limit
        productModel.getAll(nama, sortBy, sortType, limit, offset)
        .then((result) => {
            const totalRows = result[0].count
            const meta = {
                totalRows: totalRows,
                totalPage: Math.ceil(totalRows/limit),
                page
            }
            successWithMeta(res, result, meta, 'Get all product success')
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
        const body = req.body
        body.picture = req.file.filename
        productModel.insert(body)
        .then((result) => {
            success(res, result, 'Insert product success')
        })
        .catch((err) => {
            failed(res, [], err.message)
        })
    },
    update: (req, res) => {
        const id = req.params.id
        const body = req.body
        body.picture = !req.file ? '' : req.file.filename
        productModel.update(body, id)
        .then((result) => {
            success(res, result, 'Update product success')
        })
        .catch((err) => {
            failed(res, [], err.message)
        })
    },
    delete: (req, res) => {
        const id = req.params.id
        productModel.delete(id)
        .then((result) => {
            success(res, result, 'Delete product success')
        })
        .catch((err) => {
            failed(res, [], err.message)
        })
    }
}

module.exports = product