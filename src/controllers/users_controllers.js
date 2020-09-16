const userModel = require('../models/users_models')
const { success, failed, tokenResult } = require('../helpers/response')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { JWTKEY } = require('../helpers/env')

const users = {
    register: async (req, res) => {
        const body = req.body

        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(body.password, salt)

        const data = {
            email: body.email,
            password: hashPassword
        }

        userModel.register(data)
        .then((result) => {
            success(res, result, 'Insert user success')
        })
        .catch((err) => {
            failed(res, [], err.message)
        })
    },
    login: async (req, res) => {
        const body = req.body
        userModel.login(body)
        .then(async (result) => {
            const results = result[0]
            const password = results.password
            const userRefreshToken = results.refreshToken
            const isMatch = await bcrypt.compare(body.password, password)
            if (isMatch) {
                jwt.sign({
                    email: results.email
                }, JWTKEY, {expiresIn: 15},
                    (err, token) => {
                        if (err) {
                            console.log(err)
                        } else {
                            if (userRefreshToken === null) {
                                const id = results.id
                                const refreshToken = jwt.sign({ id }, 'REFRESH')
                                userModel.updateRefreshToken(refreshToken, id).then(() => {
                                    const data = {
                                        token: token,
                                        refreshToken: refreshToken
                                    }
                                    tokenResult(res, data, 'Login successful')
                                }).catch((err) => {
                                    console.log(err)
                                })
                            } else {
                                const data = {
                                    token: token,
                                    refreshToken: userRefreshToken
                                }
                                tokenResult(res, data, 'Login successful')
                            }
                        }
                    }
                )
            } else {
                failed(res, [], 'Password is wrong')
            }
        })
        .catch((err) => {
            failed(res, [], err.message)
        })
    },
    requestToken: (req, res) => {
        const refreshToken = req.body.refreshToken
        console.log(refreshToken)
        userModel.checkRefreshToken(refreshToken).then((result) => {
            console.log(result)
            if (result.length >= 1) {
                const user = result[0]
                const newToken = jwt.sign({ email: user.email }, JWTKEY, {expiresIn: 36000})
                const data = {
                    token: newToken,
                    refreshToken: refreshToken
                }
                tokenResult(res, data, 'Successfully refresh token')
            } else {
                failed(res, [], 'Refresh token not found')
            }
        }).catch((err) => {
            failed(res, [], err.message)
        })
    }
}

module.exports = users