const express = require('express')
const userController = require('../controllers/users_controllers')

const router = express.Router()

router
 .post('/register', userController.register)
 .post('/login', userController.login)

module.exports = router