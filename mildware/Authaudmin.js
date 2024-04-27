const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const { success } = require("../utils/success");
const users = require("../models/users");


const Authaudmin = asyncHandler(async (req, res, next) => {
        const token =  req.cookies.jwt;
        if(token){
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userss = await users.findById(decoded.data._id);
        if(userss){
            req.body.user_id = userss?._id;
            req.body.done_by = userss?._id;
            req.body.email = userss?.email;
            next();
        } 
    } else {    
        throw new Error("Invalid Token");
    }
})

module.exports = {Authaudmin}