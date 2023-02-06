import Blog from "../models/Blog.js";
import cloudinary from "../services/cloudinary.js"


let blog_creation = async (req, res) => {
  try{
    const result= await cloudinary.uploader.upload(req.file.path)

    const blogData = new Blog ({
      title: req.body.title,
      content: req.body.content,
      image: req.file.path
    });
    await blogData.save()
    res.status(201).json({Blog:blogData})
  }catch (error){
    res.status(500).json({error:error.message})
    console.log(error.message);
  }}

  let get_blog = async (req, res) => {
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
      res.send(blog);
    } catch {
      res.status(404);
      res.send({ error: "blog doesn't exist!" });
    }
  }

let delete_blog = async (req, res) => {
	try {
		await Blog.deleteOne({ _id: req.params.id })
		res.status(204).send()
	} catch {
		res.status(404)
		res.send({ error: "blog doesn't exist!" })



	}
}

  export {
    blog_creation,
    get_blog,
    patch_blog,
    delete_blog
}
