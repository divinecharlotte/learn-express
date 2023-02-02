const express = require("express")
const mongoose = require("mongoose") 
const bodyParser = require("body-parser")
const routes = require("./routes")

const app = express()
// mongoose.connect("mongodb+srv://charlottedivine:charlotte82@cluster0.9wzuljl.mongodb.net/?retryWrites=true&w=majority",{ useNewUrlParser: true})

// .then(()=>{
//     const app = express()
//     app.use(bodyParser.urlencoded({ extended: false }))
//     app.use(bodyParser.json())
//     app.use(express.json())
//     app.use("/api", routes)
//     app.listen(5000, ()=>{
//        console.log("server has started");
//     })
// })


mongoose
  .set("strictQuery", false)
  .connect("mongodb+srv://charlottedivine:charlotte82@cluster0.9wzuljl.mongodb.net/?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(5000, () => {
      console.log("Server has started");
    });
  });
  app.use(express.json())
  app.use("/api", routes)