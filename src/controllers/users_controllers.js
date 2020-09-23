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
            success(res, result, 'Register success')
        })
        .catch(() => {
            failed(res, [], 'Email is exist')
        })
    },
    login: async (req, res) => {
        const body = req.body
        userModel.login(body)
        .then(async (result) => {
            const results = result[0]
            const password = results.password
            const userRefreshToken = results.refreshToken
            const isPasswordMatch = await bcrypt.compare(body.password, password)
            if (isPasswordMatch) {
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
                                    failed(res, [], err.message)
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
        .catch(() => {
            failed(res, [], 'Email is wrong')
        })
    },
    requestToken: (req, res) => {
        const refreshToken = req.body.refreshToken
        userModel.checkRefreshToken(refreshToken).then((result) => {
            if (result.length >= 1) {
                const user = result[0]
                const newToken = jwt.sign({ email: user.email }, JWTKEY, {expiresIn: 36000})
                const data = {
                    newToken: newToken
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