import express from "express";
import morgan from "morgan";
import routes from "./routes.js";
import sessions from "express-session";
const app = express();
import cors from "cors";
app.use(cors())

app.use(morgan("combined"));
app.use(express.json());
app.use(sessions({
            secret: 'SecretStringForCookies',
            cookie: { maxAge: 600000 },
            resave: true,
            saveUninitialized: true
        }))
app.use("/api", routes)
app.get('/',(req,res)=>{
    res.render('index.ejs')
})

export default app;