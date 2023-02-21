import express from "express";

import morgan from "morgan";
import cors from "cors"
import routes from "./routes.js";
import sessions from "express-session";
const app = express();
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

//our movie will use api/v1/movies/

// app.listen(5000, ()=>{
//     console.log(" blog server has started");
//  })

export default app;