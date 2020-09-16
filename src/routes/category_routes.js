const express = require('express')
const ctgControllers = require('../controllers/category_controllers')

const redis = require('../helpers/redis')

const router = express.Router()

router
    .get('/getAll', redis.getCategory, ctgControllers.getAll)
    .get('/getDetail/:id', ctgControllers.getDetail)
    .post('/insert', ctgControllers.insert)
    .put('/update/:id', ctgControllers.update)
    .delete('/delete/:id', ctgControllers.delete)

module.exports = router