const redis = require('redis')
const _ = require('lodash')
const { REDISPRODUCT, REDISCTG, REDISHIST } = require('../helpers/env')

const redisClient = redis.createClient()

module.exports = {
    getProduct: (req, res, next) => {
        redisClient.get(REDISPRODUCT, (err, redisResult) => {
            if (redisResult) {
                const data = JSON.parse(redisResult)

                const search = !req.query.search ? '' : req.query.search
                const sortBy = !req.query.sortBy ? 'id' : req.query.sortBy
                const sortType = !req.query.sortType ? 'asc' : req.query.sortType

                const limit = !req.query.limit ? 9 : parseInt(req.query.limit)
                const page = !req.query.page ? 1 : parseInt(req.query.page)
                
                const start = page === 1 ? 0 : (page*limit) - limit
                const end = start === 0 ? limit : start*limit

                const result = _.orderBy(data, [sortBy], [sortType])

                let redisData = result

                if (search !== null) {
                    const searchResult = result.filter(e => e.name.toLowerCase().includes(search.toLowerCase()))
                    redisData = searchResult
                }

                res.send({
                    message: 'Get data from redis',
                    code: 200,
                    success: true,
                    meta: {
                        totalRows: redisData.length,
                        totalPage: Math.ceil(redisData.length/limit),
                        page,
                        limit
                    },
                    data: redisData.slice(start, end)
                })
            } else {
                next()
            }
        })
    },
    getCategory: (req, res, next) => {
        redisClient.get(REDISCTG, (err, redisCtg) => {
            if (redisCtg) {
                const data = JSON.parse(redisCtg)

                const search = !req.query.search ? '' : req.query.search
                const sortBy = !req.query.sortBy ? 'id' : req.query.sortBy
                const sortType = !req.query.sortType ? 'asc' : req.query.sortType

                const limit = !req.query.limit ? 9 : parseInt(req.query.limit)
                const page = !req.query.page ? 1 : parseInt(req.query.page)
                
                const start = page === 1 ? 0 : (page*limit) - limit
                const end = start === 0 ? limit : start*limit

                const result = _.orderBy(data, [sortBy], [sortType])

                let redisDataCtg = result

                if (search !== null) {
                    const searchResult = result.filter(e => e.category_name.toLowerCase().includes(search.toLowerCase()))
                    redisDataCtg = searchResult
                }

                res.send({
                    message: 'Get data from redis',
                    code: 200,
                    success: true,
                    meta: {
                        totalRows: redisDataCtg.length,
                        totalPage: Math.ceil(redisDataCtg.length/limit),
                        page,
                        limit
                    },
                    data: redisDataCtg.slice(start, end)
                })
            } else {
                next()
            }
        })
    },
    getHistory: (req, res, next) => {
        redisClient.get(REDISHIST, (err, redisHist) => {
            if (redisHist) {
                const data = JSON.parse(redisHist)

                const search = !req.query.search ? '' : req.query.search
                const sortBy = !req.query.sortBy ? 'id' : req.query.sortBy
                const sortType = !req.query.sortType ? 'asc' : req.query.sortType

                const limit = !req.query.limit ? 9 : parseInt(req.query.limit)
                const page = !req.query.page ? 1 : parseInt(req.query.page)
                
                const start = page === 1 ? 0 : (page*limit) - limit
                const end = start === 0 ? limit : start*limit

                const result = _.orderBy(data, [sortBy], [sortType])

                let redisDataHist = result

                if (search !== null) {
                    const searchResult = result.filter(e => e.invoices.toLowerCase().includes(search.toLowerCase()))
                    redisDataHist = searchResult
                }

                res.send({
                    message: 'Get data from redis',
                    code: 200,
                    success: true,
                    meta: {
                        totalRows: redisDataHist.length,
                        totalPage: Math.ceil(redisDataHist.length/limit),
                        page,
                        limit
                    },
                    data: redisDataHist.slice(start, end)
                })
            } else {
                next()
            }
        })
    }
}