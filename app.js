const express = require('express')
const passport = require('passport')
const cors = require('cors')
const morgan = require('morgan')
const Routes = require('./routes/route')
require('./middleware/passport')(passport)

const app = express()



app.use(passport.initialize())
app.use(morgan('dev'))
app.use(cors())
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use('/api', Routes)

module.exports = app