const express = require('express')
const ctgControllers = require('../controllers/category_controllers')

const router = express.Router()

router
    .get('/getAll', ctgControllers.getAll)
    .get('/getDetail/:id', ctgControllers.getDetail)
    .post('/insert', ctgControllers.insert)
    .put('/update/:id', ctgControllers.update)
    .delete('/delete/:id', ctgControllers.delete)

module.exports = router