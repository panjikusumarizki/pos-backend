const express = require('express')
const historyController = require('../controllers/history_controllers')

const router = express.Router()

router
    .get('/getAll', historyController.getAll)
    .get('/getDetail/:id', historyController.getDetail)
    .post('/insert', historyController.insert)
    .put('/update/:id', historyController.update)
    .delete('/delete/:id', historyController.delete)

module.exports = router