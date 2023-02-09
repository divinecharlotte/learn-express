import mongoose from "mongoose"
 const schema = mongoose.Schema({
   blogId: String,
    
 })
 export default mongoose.model("Likes" ,schema)