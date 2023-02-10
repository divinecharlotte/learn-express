import request from "supertest"
import { mongoConnect, mongoDisconnect } from "../services/mongo.js";
import app from '../app.js';

jest.setTimeout(10000)
const contact = {
    name : "New Movie",
email: "divinemaina@gmail.com",
message:"hhhhhhhxshhhhhhhhhhhhhh"
 }
 const contactWithoutName = {
    email: "divinemaina@gmail.com",
message:"hhhhhhhxshhhhhhhhhhhhhh"
 }

 describe("blog API tests", () =>{
    beforeAll( async() =>{
        await mongoConnect()
    })
    
    afterAll( async() =>{
        await mongoDisconnect()
    })

    // describe("Welcome APi message", () =>{
    //     test("It should return 200 and Welcome message ", async () =>{
    //         const {body} = await request(app)
    //         .get("/api")
    //         .expect("Content-Type", /json/)
    //         .expect(200)
    //     expect(body.message).toStrictEqual("Welcome to the movie api")
    //     })
    
    // })

    describe("APi Tests",() =>{
        test("It should return a list of contacts", async () =>{
            const {body} = await request(app)
            .get("/api/messages")
            .expect("Content-Type", /json/)
            .expect(200)
        })
        
        test("It should return 201 and create a contact message", async () =>{
          const {body} =   await request(app)
            .post("/api/messages")
            .send(contact)
            .expect("Content-Type", /json/)
            .expect(201)
        })
        
        test("It should return 400 ", async () =>{
            const {body} = await request(app)
            .post("/api/messages")
            .send(contactWithoutName)
            // .expect("Content-Type", /json/)
            .expect(400)
        })
        test("It should return nothing ", async () =>{
            const {body} = await request(app)
            .delete("/api/messages/:id")
            .send({ message: "the contact is successfully deleted" })
            // .expect("Content-Type", /json/)
            .expect(404)
        })
    })
    
    
    
    })