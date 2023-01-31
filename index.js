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


