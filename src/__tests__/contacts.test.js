// import request from "supertest"
// import { mongoConnect, mongoDisconnect } from "../services/mongo.js";
// import app from '../app.js';

// jest.setTimeout(10000)

//  const user = {
// email: "divinemaina@gmail.com",
// password:"user"
//  }
//  const userWithoutEmail = {
// password:"user"
//  }

//  const contact = {
//     name : "New Movie",
// email: "divinemaina@gmail.com",
// message:"hhhhhhhxshhhhhhhhhhhhhh"
//  }
//  const contactWithoutName = {
//     email: "divinemaina@gmail.com",
// message:"hhhhhhhxshhhhhhhhhhhhhh"
//  }


//  const comment = {
//     name : "New Movie",
// email: "divinemaina@gmail.com",
// message:"hhhhhhhxshhhhhhhhhhhhhh"
//  }
//  const commenWithoutName = {
//     email: "divinemaina@gmail.com",
// message:"hhhhhhhxshhhhhhhhhhhhhh"
//  }


//  describe("blog API tests", () =>{
//     beforeAll( async() =>{
//         await mongoConnect()
//     })
    
//     afterAll( async() =>{
//         await mongoDisconnect()
//     })



//     describe("APi Tests",() =>{
//         test("It should return a list of contacts", async () =>{
//             const {body} = await request(app)
//             .get("/api/messages")
//             .expect("Content-Type", /json/)
//             .expect(200)
//         })
        
//         test("It should return a list of comments", async () =>{
//             const {body} = await request(app)
//             .get("/api/blogs/:id/comments")
//             .expect("Content-Type", /json/)
//             .expect(200)
//         })

//         test("It should return 201 and create a contact message", async () =>{
//           const {body} =   await request(app)
//             .post("/api/messages")
//             .send(contact)
//             .expect("Content-Type", /json/)
//             .expect(201)
//         })
        
//         test("It should return 400 ", async () =>{
//             const {body} = await request(app)
//             .post("/api/messages")
//             .send(contactWithoutName)
//             // .expect("Content-Type", /json/)
//             .expect(400)
//         })
//         test("It should return nothing ", async () =>{
//             const {body} = await request(app)
//             .delete("/api/messages/:id")
//             .send({ message: "the contact is successfully deleted" })
        
//             .expect(404)
//         })


//         test("It should return a list of users", async () =>{
//             const {body} = await request(app)
//             .get("/api/users")
//             .expect("Content-Type", /json/)
//             .expect(401)
//         })

//         test("It should return 201 and create a user", async () =>{
//             const {body} =   await request(app)
//               .post("/api/register")
//               .send(user)
//               .expect("Content-Type", /json/)
//               .expect(500)
//           })

//           test("It should return 400 ", async () =>{
//             const {body} = await request(app)
//             .post("/api/register")
//             .send(userWithoutEmail)
//             .expect("Content-Type", /json/)
//             .expect(400)
//         })

//     })
//     })
