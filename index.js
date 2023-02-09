import express from "express"
import mongoose from "mongoose" 
import bodyParser from "body-parser"
import routes from "./src/routes.js"
import sessions from "express-session"
const app = express()


mongoose.connect("mongodb+srv://charlottedivine:charlotte82@cluster0.9wzuljl.mongodb.net/?retryWrites=true&w=majority",{ useNewUrlParser: true})

.then(()=>{
    const app = express()
    app.use(sessions({
        secret: 'SecretStringForCookies',
        cookie: { maxAge: 600000 },
        resave: true,
        saveUninitialized: true
    }))

    app.use(bodyParser.json());
    
        app.use(express.json())
        app.use("/api", routes)
    app.listen(5000, ()=>{
       console.log("server has started");
    })
})