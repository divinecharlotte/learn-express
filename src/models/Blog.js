import mongoose from "mongoose"

const schema = mongoose.Schema
const BlogSchema = new schema({
	title: { type:String, required:true},
	content: { type:String, required:true},
	image: { type:String, required:true},
})

const Blog = mongoose.model("Blog",BlogSchema)

export default Blog


