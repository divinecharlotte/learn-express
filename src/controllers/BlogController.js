import Blog from "../models/Blog.js";
import cloudinary from "../services/cloudinary.js"


let blog_creation = async (req, res) => {
  try{
    const result= await cloudinary.uploader.upload(req.file.path)
    const blogData = new Blog ({
      title: req.body.title,
      content: req.body.content,
   
      image: result.url


    });
    await blogData.save()
    res.status(201).json({Blog:blogData})
  }catch (error){
    res.status(401).json({error:error.message})
    console.log(error.message);
  }}

  let get_blogs = async (req, res) => {
    try {
    const blogs = await Blog.find({})
    res.send(blogs)
    } catch {
    res.status(404)
    res.send({ error: "Blogs don't exist!" })
    }
    }
    
    
    let getSingleBlog = async (req, res) => {
      try {
        const {id}= req.params
        const blog = await Blog.findById(id)
        res.send(blog)
      } catch {
        res.status(404)
        res.send({ error: "Blog doesn't exist!" })
      }
    }
    
    

let patch_blog = async (req, res) => {
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
      // res.status(200);
      res.send(blog);
    } catch {
      res.status(404);
      res.send({ error: "blog doesn't exist!" });
    }
  }

  let delete_blog = async (req, res) => {
    try {
    await Blog.deleteOne({ _id: req.params.id })
    res.send({ message: "the blog is successfully deleted" })
    } catch {
    res.status(404)
    res.send({ error: "blog doesn't exist!" })
    }
    }

  export {
    blog_creation,
    get_blogs,
    getSingleBlog,
    patch_blog,
    delete_blog
}
