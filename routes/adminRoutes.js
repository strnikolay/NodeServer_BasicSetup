const Router = require('express')
const router = new Router()
const AdminController = require('../controllers/adminController')

router.post('/Admin', AdminController.AdminLogin)

module.exports = router