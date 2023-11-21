const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    email:{
        type: String,
        required: true,
        unique: true
    },
    /*phone:{// раскомментироватьб если логин по телефону, а email удалить
        type: String,
        required: true,
        unique: true
    },*/
    password:{
        type: String,
        required: true
    },
    isActivated: {
        type: Boolean,
         default: false
    },
    activationLink: {
        type: String
    },
    avatar:{
        type: String
    },
    nickname:{
        type: String
    }

})

module.exports = mongoose.model('users', userSchema)