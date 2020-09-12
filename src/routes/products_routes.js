const express = require('express')
const productController = require('../controllers/products_controllers')
const { authentication, authorization } = require('../helpers/auth')

const router = express.Router()

router
    .get('/getAll', authentication, authorization, productController.getAll)
    .get('/getDetail/:id', authentication, authorization,productController.getDetail)
    .post('/insert', authentication, authorization,productController.insert)
    .patch('/update/:id', authentication, authorization, productController.update)
    .delete('/delete/:id', authentication, authorization, productController.delete)

module.exports = router