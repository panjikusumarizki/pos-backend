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
            const isMatch = await bcrypt.compare(body.password, password)
            if (isMatch) {
                jwt.sign(
                    {
                        email: results.email
                    },
                    JWTKEY,
                    {expiresIn: 3600},
                    (err, token) => {
                        if (err) {
                            console.log(err)
                        } else {
                            tokenResult(res, { token: token }, 'Login successful')
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
    }
}

module.exports = users