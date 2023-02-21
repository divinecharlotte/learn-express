// import request from "supertest"
// import app from "../app.js"
// import User from "../models/User.js"
// import { mongoConnect, mongoDisconnect } from "../services/mongo.js";
// let tokenResponse;
// jest.setTimeout(10000)
// describe("Blog API Test", () => {
//     beforeAll(async () => {
//       await mongoConnect()
//     });
  
//     afterAll(async () => {
//       await mongoDisconnect();
//     });


// test("It should sign in user with valid credentials", async () => {
//   const user = new User({
//     email: "divinemaina@gmail.com",
//     password: "user",
//   });

//   await user.save();

//   const signInResponse = await request(app)
//     .post("/api/auth/login")
//     .send({ email: "divinemaina@gmail.com", password: "user" });

//   expect(signInResponse.statusCode).toBe(200);
//   expect(signInResponse.body).toHaveProperty("user");
//   expect(signInResponse.body).toHaveProperty("token");



//   tokenResponse = signInResponse.body.token;
// });
// })
// export { tokenResponse };
