const express = require("express")
const Blog = require("./models/Blog")
const Contact = require("./models/Contact")
const router = express.Router()

router.post("/blogs", async (req,res)=>{
 const blog = new Blog({
title: req.body.title,
content: req.body.content,
 })
 
 await blog.save()
 res.send(blog)
})

router.post("/contacts", async (req,res)=>{
	const contact= new Contact({
		name: req.body.name,
		email: req.body.email,
		message: req.body.message,
	})
	
	await contact.save()
	res.send(contact)
   })

router.get("/blogs/:id", async (req, res) => {
	try {
		const {id}= req.params 
		const blog = await Blog.findById(id)
		res.send(blog)
	} catch {
		res.status(404)
		res.send({ error: "Blog doesn't exist!" })
	}

})

router.get("/contacts", async (req, res) => {

	
	try{
		const contact = await Contact.find({})
		res.status(200).json(contact)

	}
	catch(err){
		res.status(404).json(error)
	}
   })

router.patch("/blogs/:id", async (req, res) => {
	try {
		const blog= await Blog.findOne({ _id: req.params.id })
console.log(blog);
		if (req.body.title) {
			blog.title = req.body.title
		}

		if (req.body.content) {
			blog.content = req.body.content
		}

		await blog.save()
		res.send(post)
	} catch {
		res.status(404)
		res.send({ error: "blog doesn't exist!" })
	}
})


router.delete("/blogs/:id", async (req, res) => {
	try {
		await Blog.deleteOne({ _id: req.params.id })
		res.status(204).send()
	} catch {
		res.status(404)
		res.send({ error: "blog doesn't exist!" })
	}
})

module.exports = router
