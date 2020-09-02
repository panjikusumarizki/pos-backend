const historyModel = require('../models/history_models')
const response = require('../helpers/response')

const history = {
    getAll: (req, res) => {
        const invoice = !req.query.invoices ? '' : req.query.invoices
        const sortBy = !req.query.sortBy ? 'id' : req.query.sortBy
        const sortType = !req.query.sortType ? 'asc' : req.query.sortType
        const limit = !req.query.limit ? 10 : parseInt(req.query.limit)
        const page = !req.query.page ? 1 : parseInt(req.query.page)
        const offset = page === 1 ? 0 : (page - 1) * limit
        historyModel.getAll(invoice, sortBy, sortType, limit, offset)
        .then((result) => {
            response.success(res, result, 'Get all data success')
        })
        .catch((err) => {
            response.failed(res, [], err.message)
        })
    },
    getDetail: (req, res) => {
        const id = req.params.id
        historyModel.getDetail(id)
        .then((result) => {
            response.success(res, result, 'Get detail history success')
        })
        .catch((err) => {
            response.failed(res, [], err.message)
        })
    },
    insert: (req, res) => {
        const body = req.body
        historyModel.insert(body)
        .then((result) => {
            response.success(res, result, 'Insert data success')
        })
        .catch((err) => {
            response.failed(res, [], err.message)
        })
    },
    update: (req, res) => {
        const id = req.params.id
        const body = req.body
        historyModel.update(body, id)
        .then((result) => {
            response.success(res, result, 'Update data success')
        })
        .catch((err) => {
            response.failed(res, [], err.message)
        })
    },
    delete: (req, res) => {
        const id = req.params.id
        historyModel.delete(id)
        .then((result) => {
            response.success(res, result, 'Delete data success')
        })
        .catch((err) => {
            response.failed(res, [], err.message)
        })
    }
}

module.exports = history