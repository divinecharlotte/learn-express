import mongoose from "mongoose"

const schema = mongoose.Schema
const BlogSchema = new schema({
	title: { type:String, required:true},
	content: { type:String, required:true},
	image: { type:String, required:true},
	comment : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'comments'
      }],
	  like : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'likes'
      }],
    
})

const Blog = mongoose.model("Blog",BlogSchema)

export default Blog


