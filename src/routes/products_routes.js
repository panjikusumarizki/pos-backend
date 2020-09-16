const express = require('express')
const productController = require('../controllers/products_controllers')

const redis = require('../helpers/redis')

const router = express.Router()

router
    .get('/getAll', redis.getProduct, productController.getAll)
    .get('/getDetail/:id', productController.getDetail)
    .post('/insert', productController.insert)
    .patch('/update/:id', productController.update)
    .delete('/delete/:id', productController.delete)

module.exports = router