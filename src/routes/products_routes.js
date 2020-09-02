const express = require('express')
const productController = require('../controllers/products_controllers')

const upload = require('../helpers/upload')

const router = express.Router()

router
    .get('/getAll', productController.getAll)
    .get('/getDetail/:id', productController.getDetail)
    .post('/insert', upload.single('picture'),productController.insert)
    .patch('/update/:id', upload.single('picture'), productController.update)
    .delete('/delete/:id', productController.delete)

module.exports = router