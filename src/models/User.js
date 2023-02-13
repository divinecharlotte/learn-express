import mongoose, { Schema } from "mongoose"
import passportLocalMongoose from "passport-local-mongoose"
 const schema = mongoose.Schema({
    email: String,
    password: String,
    
 })
 schema.plugin(passportLocalMongoose)
 export default mongoose.model("User" ,schema)


//  const request = require("supertest");
// const app = require("../app");
// const User = require("../models/User");
// const jwt = require("jsonwebtoken");

// describe("Sign-In Controller", () => {
//   beforeEach(async () => {
//     await User.deleteMany({});
//   });

//   it("should return 404 if email is not found", async () => {
//     const res = await request(app).post("/signin").send({
//       email: "test@test.com",
//       password: "password",
//     });

//     expect(res.statusCode).toEqual(404);
//     expect(res.body).toEqual({ message: "Wrong credintial" });
//   });

//   it("should return 401 if password is incorrect",
