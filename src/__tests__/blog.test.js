import request from "supertest";
import path from "path";
import { mongoConnect, mongoDisconnect } from "../services/mongo.js";
import app from '../app.js';
import { blog, blogId } from "../data/blog.data.js";
// import { generateToken } from "../services/passport.js";
import jwt from 'jsonwebtoken';

import supertest from "supertest";
import User from "../models/User.js"


describe("Blog API Test", () => {
    beforeAll(async () => {
      await mongoConnect()
    });
  
    afterAll(async () => {
      await mongoDisconnect();
    });

  it("Should sign in a user", async () => {
    const user = new User({
      email: "divinemaina@gmail.com",
      password: "user",
    });

    await user.save();

    const response = await request(app)
      .post("/api/auth/login")
      .send({ email: "divinemaina@gmail.com", password: "user" });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("user");
    expect(response.body).toHaveProperty("token");
  });

  it("Should not sign in a user with an incorrect password", async () => {
    const user = new User({
      email: "divinemaina@gmail.com",
      password: "password",
    });

    await user.save();

    const response = await request(app)
      .post("/api/auth/login")
      .send({ email: "divinemaina@gmail.com", password: "incorrect" });

    expect(response.statusCode).toBe(401);
    expect(response.body).toHaveProperty("status");
    expect(response.body.status).toBe(false);
    expect(response.body).toHaveProperty("error");
  });

  it("Should not sign in a user with an incorrect email", async () => {
    const user = new User({
      email: "testuser@email.com",
      password: "user",
    });

    await user.save();

    const response = await request(app)
      .post("/api/auth/login")
      .send({ email: "incorrect@email.com", password: "user" });

    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty("message");
  });

  it("Should register a user", async () => {
    const response = await request(app)
      .post("/api/register")
      .send({ email: "divinemaina@gmail.com", password: "user" });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("email");
    expect(response.body).toHaveProperty("_id");
  });
 
});


describe("GET /api/user", () => {

  beforeAll(async () => {
    await mongoConnect()
  });

  afterAll(async () => {
    await mongoDisconnect();
  });
  it("Should get the current user's information if the user is signed in", async () => {
    // First, sign in the user
    const user = new User({
      email: "divinemaina@gmail.com",
      password: "user",
    });

    await user.save();

    const signInResponse = await request(app)
      .post("/api/auth/login")
      .send({ email: "divinemaina@gmail.com", password: "user" });

    expect(signInResponse.statusCode).toBe(200);
    expect(signInResponse.body).toHaveProperty("user");
    expect(signInResponse.body).toHaveProperty("token");

    // Next, use the token to make a request to get the user's information
    const token = signInResponse.body.token;
    const getUserResponse = await request(app)
      .get("/api/users")
      .set("auth-token", token);

    expect(getUserResponse.statusCode).toBe(200);
    // expect(getUserResponse.body).toHaveProperty("email");
    // expect(getUserResponse.body).toHaveProperty("_id");
  });

  it("Should return a 401 error if the user is not signed in", async () => {
    const getUserResponse = await request(app).get("/api/users");

    expect(getUserResponse.statusCode).toBe(401);
 
  });
});





// jest.setTimeout(60000);
// const JWT_SECRET = "secret_key";
// const token = jwt.sign(JWT_SECRET,{expiresIn:"1d"});
// let uploadedPost;

// describe("Blog API Test", () => {
//   beforeAll(async () => {
//     await mongoConnect()
//   });

//   afterAll(async () => {
//     await mongoDisconnect();
//   });
//   describe("Test API entry point", () => {
//     test("should sign in a user", async()=>{
//       const res = await request(app).post('/api/auth/login').send({
//         "email ": "divinemaina@email.com",
//         "password ": "user"
//       })
//       .set("auth-token",token)
//       console.log(token,"token body");
//       expect(res.statusCode).toBe(404);
//       // const response =  request(app).get('/api/v1/messages').set('Cookie',eddy)
//       // expect(response.statusCode).toBe(200);
   
   
//     })

//     test("It should create Blog with valid data", async () => {
//         const { body } = await request(app)
//           .post("/api/blogs")
//           .set("auth-token",token)
//           .field("title", blog.valid.blogTitle)
//           .field("content", blog.valid.blogContent)
//           .attach("image", path.resolve(__dirname, "../data/image.PNG"))
//           .expect(201);
    
//         uploadedPost = body.blog;
//       });
//       test("It should list Blogs.", async () => {
//         const { body } = await request(app)
//           .get("/api/blogs")
//           .expect("Content-Type", /json/)
//           .expect(200);
//       });

//       test("It should list single blog with valid blog_ID.", async () => {
//         const { body } = await request(app)
//           .get(`/api/blogs/${blogId.validId}`)
//         //   .expect("Content-Type", /json/)
//           .expect(200);
//       });

//     test("It should delete blog with valid ID.", async () => {
//         const { body } = await request(app)
//           .delete(`/api/blogs/${uploadedPost}`)
//           .set("auth-token", ` ${token}`)
//           .expect("Content-Type", /json/)
//           .expect(404);
//         expect(body.message).toStrictEqual();
//       });
//   });
// })

