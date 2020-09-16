const express = require('express')
const historyController = require('../controllers/history_controllers')

const redis = require('../helpers/redis')

const router = express.Router()

router
    .get('/getAll', redis.getHistory, historyController.getAll)
    .get('/getDetail/:id', historyController.getDetail)
    .post('/insert', historyController.insert)
    .patch('/update/:id', historyController.update)
    .delete('/delete/:id', historyController.delete)

module.exports = router