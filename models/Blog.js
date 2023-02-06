import mongoose from "mongoose"

const schema = mongoose.Schema
const BlogSchema = new schema({
	title: { type:String, required:true},
	content: { type:String, required:true},
	image: { type:String, required:true},
})

const Blog = mongoose.model("Blog",BlogSchema)
// export default mongoose.model("Blog", schema)
export default Blog


// const mongoose = require("mongoose")

// const schema = mongoose.Schema({
// 	title: String,
// 	content: String,
// 	image: String,
// })

// module.exports = mongoose.model("Blog", schema)