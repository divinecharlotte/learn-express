const express = require("express")
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const Blog = require("./models/Blog")
const Contact = require("./models/Contact");
const { json } = require("express");
const router = express.Router()
const Joi = require('joi');
const multer = require("multer");


cloudinary.config({
	cloud_name: "ds779tmo7",
	api_key: "194959594414752",
	api_secret: "i79UW8AWKD3sWXm6XdTYU3r6IwY",
  });
  const storage = new CloudinaryStorage({
	cloudinary: cloudinary,
	params: {
	  folder: "DEV",
	},
  });


  const upload = multer({ storage: storage });

//   **************************************************************************************blogs****************
  const validateBlog = (data) => {
  const schema = Joi.object({
	title: Joi.string()
	  .min(1)
	  .max(100)
	  .regex(/^[a-zA-Z]+\s[a-zA-Z]+$/)
	  .required(),
	content: Joi.string()
	  .min(20)
	  .max(100)
	  .required(),
	image: Joi.string().required(),
  });

  return schema.validate(data);
}

router.post("/blogs", upload.single("image"), async (req, res) => {
	if (!req.file) {
	  return res.status(400).send({ message: "No image provided" });
	}
  
	const blogData = {
	  title: req.body.title,
	  content: req.body.content,
	  image: req.file.path
	};
  

	const { error, value } = validateBlog(blogData);
	if (error) {
	  return res.status(400).send({ message: error.message });
	}
  
	const blog = new Blog(value);
	await blog.save();
	res.send(JSON.stringify(blog));
  });



  
  
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


   router.patch("/blogs/:id", upload.single("image"), async (req, res) => {
	 try {
	   const blog = await Blog.findOne({ _id: req.params.id });

	   if (req.body.title) {
		 blog.title = req.body.title;
	   }
	   if (req.body.content) {
		 blog.content = req.body.content;
	   }
	   if (req.file) {
		 blog.image = req.file.path;
	   }
	   await blog.save();
	   res.send(blog);
	 } catch {
	   res.status(404);
	   res.send({ error: "blog doesn't exist!" });
	 }
   });
   
router.delete("/blogs/:id", async (req, res) => {
	try {
		await Blog.deleteOne({ _id: req.params.id })
		res.status(204).send()
	} catch {
		res.status(404)
		res.send({ error: "blog doesn't exist!" })
	}
})

//   **************************************************************************************blogs****************************************
const validateContact = (data) => {
const schema = Joi.object({
	name: Joi.string().regex(/^[a-zA-Z]+ [a-zA-Z]+$/).required(),
	email: Joi.string().email().required(),
	message: Joi.string().min(20).max(100).required()
});
return schema.validate(data);
}
router.post("/contacts", async (req,res) => {
	

	const { error, value } = validateContact(req.body);
	if (error) return res.status(400).send(error.message);
	
	const contact = new Contact({
		name: value.name,
		email: value.email,
		message: value.message,
	});
	
	await contact.save();
	res.send(contact);
});

router.get("/contacts", async (req, res) => {
	
	try{
		const contact = await Contact.find({})
		res.status(200).json(contact)
	}
	catch(err){
		res.status(404).json(error)
	}
   })


module.exports = router

