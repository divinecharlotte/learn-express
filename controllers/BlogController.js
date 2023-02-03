const Blog = require("../models/Blog");
const Joi = require('joi');


let blog_creation = async (req, res) => {
	if (!req.file) {
	  return res.status(400).send({ message: "No image provided" });
	}
  
	const blogData = {
	  title: req.body.title,
	  content: req.body.content,
	  image: req.file.path
	};
  
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
	const { error, value } = validateBlog(blogData);
	if (error) {
	  return res.status(400).send({ message: error.message });
	}
  
	const blog = new Blog(value);
	await blog.save();
	res.send(JSON.stringify(blog));
  };


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
  module.exports = {
    blog_creation,
    get_blog
}

  