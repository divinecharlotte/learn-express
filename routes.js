const express = require("express")
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const router = express.Router()
const multer = require("multer");
const UserController = require("./controllers/UserController")
const BlogController = require("./controllers/BlogController")
const ContactController = require("./controllers/ContactController")
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
router.post("/blogs", upload.single("image"),BlogController.blog_creation)
router.get("/blogs/:id",BlogController.get_blog)
router.patch("/blogs/:id", upload.single("image"), BlogController.patch_blog)
router.delete("/blogs/:id",BlogController.delete_blog)
router.post("/contacts",ContactController.post_contact)
router.get("/contacts",ContactController.get_contact)
module.exports = router

