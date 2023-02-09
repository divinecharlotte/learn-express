import express from "express";
import { blog_creation,patch_blog,delete_blog, get_blogs, getSingleBlog } from "./controllers/BlogController.js";
const router = express.Router()
import upload from "./services/multer.js"
import ContactController from "./controllers/ContactController.js";
import userAuthenticationController from "./controllers/userAthenticationController.js";
import checkValidation from "./validate.js"
import passport from "passport"
import authUser from "./midleWare.js/auth.js"
import commentsController from "./controllers/commentsController.js"
import LikesController from "./controllers/LikesController.js";
router.use(passport.initialize())
router.use(passport.session())

router.post("/blogs",authUser,upload.single("image"),checkValidation,blog_creation)
router.get("/blogs",authUser, get_blogs)
router.get("/blogs/:id",authUser, getSingleBlog)
router.patch("/blogs/:id",upload.single("image"),authUser,checkValidation,patch_blog)
router.delete("/blogs/:id",authUser,delete_blog)
router.post("/messages",ContactController.post_contact)
router.get("/messages",ContactController.get_contact)
router.delete("/messages/:id",ContactController.deleteContact)

router.get("/users",authUser, userAuthenticationController.get_user)
router.post("/register",userAuthenticationController.registerUser);
router.post("/auth/login",userAuthenticationController.signIn);
router.post("/blogs/:id/comments",commentsController.postComment);
router.post("/blogs/:id/likes",LikesController.postLike);
router.get("/blogs/:id/likes",LikesController.countLikes);
router.get("/blogs/:id/comments",commentsController.getComments);
export default router


