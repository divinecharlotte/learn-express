const express = require("express")
const mongoose = require("mongoose") 
const routes = require("./routes")


mongoose.connect("mongodb+srv://charlottedivine:charlotte82@cluster0.9wzuljl.mongodb.net/?retryWrites=true&w=majority",{ useNewUrlParser: true})

.then(()=>{
    const app = express()
    app.use(express.json())
    app.use("/api", routes)
    app.listen(5000, ()=>{
       console.log("server has started");
    })
})



// mongoose
//   .set("strictQuery", false)
//   .connect("mongodb+srv://charlottedivine:charlotte82@cluster0.9wzuljl.mongodb.net/?retryWrites=true&w=majority", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => {
//     app.listen(5000, () => {
//       console.log("Server has started");
//     });
//   });
//   app.use(express.json())
//   app.use("/api", routes)



// const Joi = require('joi');
// // const express = require('express');
// const app = express();

// app.use(express.json());

// const blogs = [    { id: 1, name: 'Blog 1', image: 'image1.jpg', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },    { id: 2, name: 'Blog 2', image: 'image2.jpg', description: 'Pellentesque in ipsum id orci porta dapibus.' },    { id: 3, name: 'Blog 3', image: 'image3.jpg', description: 'Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui.' }];

// app.get('/api/blogs', (req, res) => {
//     res.send(blogs);
// });

// app.post('/api/blogs', (req, res) => {
//     const { error } = validateBlog(req.body);
//     if (error) return res.status(400).send(error.details[0].message);

//     const blog = {
//         id: blogs.length + 1,
//         name: req.body.name,
//         image: req.body.image,
//         description: req.body.description
//     };
//     blogs.push(blog);
//     res.send(blog);
// });

// function validateBlog(blog) {
//     const schema = {
//         name: Joi.string().regex(/^\S*$/).required(),
//         image: Joi.string().required(),
//         description: Joi.string().min(20).max(100).required()
//     };

//     return Joi.validate(blog, schema);
// }

// const port = process.env.PORT || 3000;
// app.listen(port, () => console.log(`Listening on port ${port}...`));
