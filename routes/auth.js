const express = require('express')
const controller = require('../controllers/auth')
const router = express.Router()

//router.get('/login', controller.login)
//router.get('/register', controller.register)
router.post('/login', controller.login)
router.post('/register', controller.register)

module.exports = router