const express = require('express')
const router = express.Router()
const userRouter = require('./userRoutes')
const adminRouter = require('./adminRoutes')

router.use('/user', userRouter)
router.use('/admin', adminRouter)



module.exports = router