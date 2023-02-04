import mongoose from "mongoose"
 const schema = mongoose.Schema({
    email: String,
    password: String,
    
 })
 export default mongoose.model("User" ,schema)

//  const mongoose = require("mongoose")
//  const schema = mongoose.Schema({
//     email: String,
//     password: String,
    
//  })
//  module.exports =mongoose.model("User" ,schema)