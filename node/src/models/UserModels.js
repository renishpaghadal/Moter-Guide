const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    FirstName:{
        type:String
    },
    LastName:{
        type:String
    },
   
    role:{
        type:String,
        enum:['admin','user'],
        default:'user'
    },
    password :{
        type:String
    },
    email:{
        type:String,
        required: true,
        unique: true
    }


})

module.exports = mongoose.model("users",userSchema)