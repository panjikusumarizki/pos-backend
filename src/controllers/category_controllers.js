const ctgModel = require('../models/category_models')
const response = require('../helpers/response')

const category = {
    getAll: (req, res) => {
        const sortBy = !req.query.sortBy ? 'id' : req.query.sortBy
        const sortType = !req.query.sortType ? 'asc' : req.query.sortType
        const limit = !req.query.limit ? 3 : parseInt(req.query.limit)
        const page = !req.query.page ? 1 : parseInt(req.query.page)
        const offset = page === 1 ? 0 : (page - 1)*limit
        ctgModel.getAll(sortBy, sortType, limit, offset)
        .then((result) => {
            response.success(res, result, 'Get all category success')
        })
        .catch((err) => {
            response.failed(res, [], err.message)
        })
    },
    getDetail: (req, res) => {
        const id = req.params.id
        ctgModel.getDetail(id)
        .then((result) => {
            response.success(res, result, 'Get detail category success')
        })
        .catch((err) => {
            response.failed(res, [], err.message)
        })
    },
    insert: (req, res) => {
        const body = req.body
        ctgModel.insert(body)
        .then((result) => {
            response.success(res, result, 'Insert category success')
        })
        .catch((err) => {
            response.failed(res, [], err.message)
        })
    },
    update: (req, res) => {
        const id = req.params.id
        const body = req.body
        ctgModel.update(body, id)
        .then((result) => {
            response.success(res, result, 'Update category success')
        })
        .catch((err) => {
            response.failed(res, [], err.message)
        })
    },
    delete: (req, res) => {
        const id = req.params.id
        ctgModel.delete(id)
        .then((result) => {
            response.success(res, result, 'Delete category success')
        })
        .catch((err) => {
            response.failed(res, [], err.message)
        })
    }
}

module.exports = category