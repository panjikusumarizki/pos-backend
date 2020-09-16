const historyModel = require('../models/history_models')
const { success, failed } = require('../helpers/response')

const redis = require('redis')
const redisClient = redis.createClient()

const { REDISHIST } = require('../helpers/env')

const history = {
    getAll: (req, res) => {
        const invoice = !req.query.invoices ? '' : req.query.invoices
        const sortBy = !req.query.sortBy ? 'id' : req.query.sortBy
        const sortType = !req.query.sortType ? 'asc' : req.query.sortType
        const limit = !req.query.limit ? 9 : parseInt(req.query.limit)
        const page = !req.query.page ? 1 : parseInt(req.query.page)
        const offset = page === 1 ? 0 : (page - 1) * limit
        historyModel.getAll(invoice, sortBy, sortType, limit, offset)
        .then((result) => {
            redisClient.set(REDISHIST, JSON.stringify(result))
            success(res, result, 'Get data from database')
        })
        .catch((err) => {
            failed(res, [], err.message)
        })
    },
    getDetail: (req, res) => {
        const id = req.params.id
        historyModel.getDetail(id)
        .then((result) => {
            success(res, result, 'Get detail history success')
        })
        .catch((err) => {
            failed(res, [], err.message)
        })
    },
    insert: (req, res) => {
        const body = req.body
        historyModel.insertMaster(body)
        .then((response) => {
            const idMaster = response.insertId
            const insertDetails = body.detail.map((item) => {
                item.id_history = idMaster
                historyModel.insertDetail(item)
            })
            Promise.all(insertDetails).then(() => {
                redisClient.del(REDISHIST)
                success(res, response, 'Insert data success')
            }).catch((err) => {
                failed(res, [], err.message)
            })
        })
        .catch((err) => {
            failed(res, [], err.message)
        })
    },
    update: (req, res) => {
        const id = req.params.id
        const body = req.body
        historyModel.update(body, id)
        .then((result) => {
            redisClient.del(REDISHIST)
            success(res, result, 'Update data success')
        })
        .catch((err) => {
            failed(res, [], err.message)
        })
    },
    delete: (req, res) => {
        const id = req.params.id
        historyModel.delete(id)
        .then((result) => {
            redisClient.del(REDISHIST)
            success(res, result, 'Delete data success')
        })
        .catch((err) => {
            failed(res, [], err.message)
        })
    }
}

module.exports = history