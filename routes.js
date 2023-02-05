import express from "express";
import cloudinary from "./cloudinary.js";
const router = express.Router()
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
// import UserController from "./controllers/UserController.js";
import BlogController from "./controllers/BlogController.js";
import ContactController from "./controllers/ContactController.js";
import userAuthenticationController from "./controllers/userAthenticationController.js";
const storage = new CloudinaryStorage({
	cloudinary: cloudinary,
	params: {
	  folder: "DEV",
	},
});
  const upload = multer({ storage: storage });


router.get("/users", userAuthenticationController.get_user)
router.post("/blogs",upload.single("image"),BlogController.blog_creation)
router.get("/blogs/:id",BlogController.get_blog)
router.patch("/blogs/:id",upload.single("image"), BlogController.patch_blog)
router.delete("/blogs/:id",BlogController.delete_blog)
router.post("/contacts",ContactController.post_contact)
router.get("/contacts",ContactController.get_contact)


router.post("/register",userAuthenticationController.registerUser);
router.post("/signin",userAuthenticationController.signIn);
export default router






// const express = require("express")
// const cloudinary = require("cloudinary").v2;
// const { CloudinaryStorage } = require("multer-storage-cloudinary");
// const router = express.Router()
// const multer = require("multer");
// const UserController = require("./controllers/UserController")
// const BlogController = require("./controllers/BlogController").default
// const ContactController = require("./controllers/ContactController")
// const userAuthenticationController = require("./controllers/userAthenticationController")
// cloudinary.config({
// 	cloud_name: "ds779tmo7",
// 	api_key: "194959594414752",
// 	api_secret: "i79UW8AWKD3sWXm6XdTYU3r6IwY",
//   });
//   const storage = new CloudinaryStorage({
// 	cloudinary: cloudinary,
// 	params: {
// 	  folder: "DEV",
// 	},
//   });
//   const upload = multer({ storage: storage });


// router.get("/users", UserController.get_user)
// router.post("/blogs", upload.single("image"),BlogController.blog_creation)
// router.get("/blogs/:id",BlogController.get_blog)
// router.patch("/blogs/:id", upload.single("image"), BlogController.patch_blog)
// router.delete("/blogs/:id",BlogController.delete_blog)
// router.post("/contacts",ContactController.post_contact)
// router.get("/contacts",ContactController.get_contact)


// router.post("/register",userAuthenticationController.registerUser);
// router.post("/signin",userAuthenticationController.signIn);
// module.exports = router

