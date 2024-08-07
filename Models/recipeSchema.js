// Schema map to mongodb collections

// 1. import mongoose
const mongoose = require('mongoose')

//2. schema creation
const recipeSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    ingredients:{
        type:String,
        required:true
    },
    instructions:{
        type:String,
        required:true
    },
    preparationtime:{
        type:String,
        required:true
    },
    youtube:{
        type:String,
        required:true
    },
    recipeImage:{
        type:String,
        required:true
    },
    userId:{
        type:String,
        required:true
    }
   
})

//create model
const recipes = mongoose.model('recipes',recipeSchema)

module.exports = recipes