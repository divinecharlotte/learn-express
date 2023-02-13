import http from 'http'
import dotenv from 'dotenv'

import { mongoConnect } from './services/mongo.js'
import app from './app.js';

dotenv.config()

const PORT = 5000;
const server = http.createServer(app)

const startServer = async () =>{
    await mongoConnect();

    server.listen(PORT, () =>{
        console.log("start");
    })
}

startServer()