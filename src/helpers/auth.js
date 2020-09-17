const jwt = require('jsonwebtoken')
const { tokenErrorResult } = require('../helpers/response')
const { JWTKEY } = require('../helpers/env')

module.exports = {
    authentication: (req, res, next) => {
        const token = req.headers.token
        if (token === undefined || token === '') {
            tokenErrorResult(res, [], 'Token must be filled')
        } else {
            next()
        }
    },
    authorization: (req, res, next) => {
        const token = req.headers.token
        jwt.verify(token, JWTKEY, (err) => {
            if (err && err.name === 'TokenExpiredError') {
                tokenErrorResult(res, [], 'Authentication failed, Token was expired')
            } else if (err && err.name === 'JsonWebTokenError') {
                tokenErrorResult(res, [], 'Authentication failed, Wrong Token')
            } else {
                next()
            }
        })
    }
}