const express = require("express")
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
const Blog = require("./models/Blog")
const Contact = require("./models/Contact");
const { json } = require("express");
const router = express.Router()
cloudinary.config({
	cloud_name: "ds779tmo7",
	api_key: "194959594414752",
	api_secret: "194959594414752",
  });
  const storage = new CloudinaryStorage({
	cloudinary: cloudinary,
	params: {
	  folder: "DEV",
	},
  });
  const upload = multer({ storage: storage });
  router.post("/blogs", async (req, res) => {
	// const { error } = validatePost(req.body);
	// if (error) return res.status(404).send(error.details[0].message);

  console.log(req.body);
	// const imageUrl = req.file.path;
  
	const blog = new Blog({
	  title: req.body.title,
	  content: req.body.content,
	//   picture: imageUrl,

	});
  
	await blog.save();
	res.status(201).send(blog);
  });

//  router.post("/blogs", async (req, res) => {
// 	// const result = await cloudinary.uploader.upload(req.file.path);
// 	// console.log(result.secure_url);
// 	// const picture = JSON.stringify()
// 	const newBlog = new Blog({
// 		title: req.body.title,
// 		content : req.body.content,
// 		// image:result.secure_url
	
// 	})
// 	// console.log(result.secure_url);
// 	// return res.json({ picture: req.file.path });
// 	await newBlog.save();
// 	res.status(201).json(newBlog)
//   });
// //   const start = (5000) => {
// // 	try {
// // 	  app.listen(5000, () => {
// // 		console.log(Api up and running at: http://localhost:${5000});
// // 	  });
// // 	} catch (error) {
// // 	  console.error(error);
// // 	  process.exit();
// // 	}
// //   };
// //   start(3333);
// // router.post("/blogs", async (req,res)=>{
// //  const blog = new Blog({
// // title: req.body.title,
// // content: req.body.content,
// //  })
// //  await blog.save()
// //  res.send(blog)
// // })
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




// const express = require("express")
// const cloudinary = require("cloudinary").v2;
// const { CloudinaryStorage } = require("multer-storage-cloudinary");
// const multer = require("multer");
// const Blog = require("./models/Blog")
// const Contact = require("./models/Contact")
// const router = express.Router()


// cloudinary.config({
// 	cloud_name: "ds779tmo7",
// 	api_key: "194959594414752",
// 	api_secret: "194959594414752",
//   });
  
//   const storage = new CloudinaryStorage({
// 	cloudinary: cloudinary,
// 	params: {
// 	  folder: "DEV",
// 	},
//   });
//   const upload = multer({ storage: storage });
//  router.post("/blogs", upload.single("picture"), async (req, res) => {
// 	// return res.json({ picture: req.file.path });
// title: req.body.title,
// content: req.body.content
//   });

// //   const start = (5000) => {
// // 	try {
// // 	  app.listen(5000, () => {
// // 		console.log(`Api up and running at: http://localhost:${5000}`);
// // 	  });
// // 	} catch (error) {
// // 	  console.error(error);
// // 	  process.exit();
// // 	}
// //   };
// //   start(3333);



// // router.post("/blogs", async (req,res)=>{
// //  const blog = new Blog({
// // title: req.body.title,
// // content: req.body.content,
// //  })
 
// //  await blog.save()
// //  res.send(blog)
// // })


// router.post("/contacts", async (req,res)=>{
// 	const contact= new Contact({
// 		name: req.body.name,
// 		email: req.body.email,
// 		message: req.body.message,
// 	})
	
// 	await contact.save()
// 	res.send(contact)
//    })

// router.get("/blogs/:id", async (req, res) => {
// 	try {
// 		const {id}= req.params 
// 		const blog = await Blog.findById(id)
// 		res.send(blog)
// 	} catch {
// 		res.status(404)
// 		res.send({ error: "Blog doesn't exist!" })
// 	}

// })



// router.get("/contacts", async (req, res) => {

	
// 	try{
// 		const contact = await Contact.find({})
// 		res.status(200).json(contact)

// 	}
// 	catch(err){
// 		res.status(404).json(error)
// 	}
//    })

// router.patch("/blogs/:id", async (req, res) => {
// 	try {
// 		const blog= await Blog.findOne({ _id: req.params.id })
// console.log(blog);
// 		if (req.body.title) {
// 			blog.title = req.body.title
// 		}

// 		if (req.body.content) {
// 			blog.content = req.body.content
// 		}

// 		await blog.save()
// 		res.send(post)
// 	} catch {
// 		res.status(404)
// 		res.send({ error: "blog doesn't exist!" })
// 	}
// })


// router.delete("/blogs/:id", async (req, res) => {
// 	try {
// 		await Blog.deleteOne({ _id: req.params.id })
// 		res.status(204).send()
// 	} catch {
// 		res.status(404)
// 		res.send({ error: "blog doesn't exist!" })
// 	}
// })

// module.exports = router
