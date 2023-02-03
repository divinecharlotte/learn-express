const express = require("express")
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
// const Blog = require("./models/Blog")
const Contact = require("./models/Contact");
const User = require("./models/User");
const { json } = require("express");
const router = express.Router()
const Joi = require('joi');
const multer = require("multer");
const UserController = require("./controllers/UserController")
const BlogController = require("./controllers/BlogController")
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



router.post("/users", UserController.user_creation)
	
router.get("/users", UserController.get_user)



//   **************************************************************************************blogs****************
router.post("/blogs", upload.single("image"),BlogController.blog_creation)
router.get("/blogs/:id",BlogController.get_blog)
router.patch("/blogs/:id", upload.single("image"), BlogController.patch_blog)


//    router.patch("/blogs/:id", upload.single("image"), async (req, res) => {
// 	 try {
// 	   const blog = await Blog.findOne({ _id: req.params.id });

// 	   if (req.body.title) {
// 		 blog.title = req.body.title;
// 	   }
// 	   if (req.body.content) {
// 		 blog.content = req.body.content;
// 	   }
// 	   if (req.file) {
// 		 blog.image = req.file.path;
// 	   }
// 	   await blog.save();
// 	   res.send(blog);
// 	 } catch {
// 	   res.status(404);
// 	   res.send({ error: "blog doesn't exist!" });
// 	 }
//    });
   
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
		res.status(404).json(err)
	}
   })


module.exports = router

