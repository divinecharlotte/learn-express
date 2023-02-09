import mongoose from "mongoose"
 const schema = mongoose.Schema({
    name: String,
    message: String,
    blogId: String,
 
 })
 export default mongoose.model("Comments" ,schema)