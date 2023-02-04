import mongoose from "mongoose"
 const schema = mongoose.Schema({
    name: String,
    email: String,
    message: String,
    
 })
 export default mongoose.model("Contact" ,schema)


//  const mongoose = require("mongoose")
//  const schema = mongoose.Schema({
//     name: String,
//     email: String,
//     message: String,
    
//  })
//  module.exports =mongoose.model("Contact" ,schema)