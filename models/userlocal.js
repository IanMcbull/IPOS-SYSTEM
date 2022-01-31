const mongoose = require('mongoose');
const userschema = new mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    email:{
        type: String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    image:{
        type: String,
    },
    createdAt:{
        type:Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('Userlocal',userschema)