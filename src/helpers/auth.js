const jwt = require('jsonwebtoken')
const { tokenResult } = require('../helpers/response')
const { JWTKEY } = require('../helpers/env')

module.exports = {
    authentication: (req, res, next) => {
        const token = req.headers.token
        if (token === undefined || token === '') {
            tokenResult(res, [], 'Token must be filled')
        } else {
            next()
        }
    },
    authorization: (req, res, next) => {
        const token = req.headers.token
        jwt.verify(token, JWTKEY, (err) => {
            if (err && err.name === 'TokenExpiredError') {
                tokenResult(res, [], 'Authentication failed, Token was expired')
            } else if (err && err.name === 'JsonWebTokenError') {
                tokenResult(res, [], 'Authentication failed, Wrong Token')
            } else {
                next()
            }
        })
    }
}