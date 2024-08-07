// Schema map to mongodb collections

// 1. import mongoose
const mongoose = require('mongoose')


//2. schema creation
const userSchema = new mongoose.Schema({
    isAdmin:{
        type:String,
     
    },
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    youtube:{
        type:String,    
    },
    profile:{
        type:String,    
    },
    status:{
        type:String
    }

})

//3. create model
const users = mongoose.model('users',userSchema)
module.exports = users
