require('dotenv').config()
const mongoose = require('mongoose')

mongoose.set('strictQuery', true)

function DBConect (){
    mongoose.connect(process.env.DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    })
    .then(() => console.log('mongoDB connect'))
    .catch(error => console.log(error))
}

module.exports = DBConect