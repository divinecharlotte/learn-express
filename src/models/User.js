import mongoose, { Schema } from "mongoose"
import passportLocalMongoose from "passport-local-mongoose"
 const schema = mongoose.Schema({
    email: String,
    password: String,
    
 })
 schema.plugin(passportLocalMongoose)
 export default mongoose.model("User" ,schema)
