import express from "express"
import mongoose from "mongoose" 
import bodyParser from "body-parser"
import routes from "./src/routes.js"

const app = express()

mongoose.connect("mongodb+srv://charlottedivine:charlotte82@cluster0.9wzuljl.mongodb.net/?retryWrites=true&w=majority",{ useNewUrlParser: true})

.then(()=>{
    const app = express()


    app.use(bodyParser.json());
    
        app.use(express.json())
        app.use("/api", routes)
    app.listen(5000, ()=>{
       console.log("server has started");
    })
})