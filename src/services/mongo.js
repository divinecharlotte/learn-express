import mongoose from "mongoose";
import dotenv from 'dotenv'

import color from "colors";

dotenv.config()

const MONGO_URL = "mongodb+srv://charlottedivine:charlotte82@cluster0.9wzuljl.mongodb.net/?retryWrites=true&w=majority"

mongoose.connection.once("open", () =>{
    console.log("Database connected!!".blue.underline);
});


mongoose.connection.on("open", () =>{
});

const mongoConnect = async () =>{
    await mongoose.connect(MONGO_URL,{ useNewUrlParser: true});
}

const mongoDisconnect  = async() =>{
    await mongoose.disconnect();
}

export {mongoConnect, mongoDisconnect}; 