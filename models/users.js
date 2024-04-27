const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const users = new mongoose.Schema({
    email:{
        type:String,
    },
    image:{
        type:String,
    },
    password:{
        type:String,
    },
    username:{
        type:String,
    }
})

module.exports = mongoose.model("users",users)

