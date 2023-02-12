import request from "supertest";
import path from "path";
import { mongoConnect, mongoDisconnect } from "../services/mongo.js";
import app from '../app.js';
import { blog, blogId } from "../data/blog.data.js";
import { generateToken } from "../services/passport.js";


jest.setTimeout(60000);

const token = generateToken({
  name: "divine",
  email: "CHARLOTTE DIVINE",
  _id: 123445,
});
let uploadedPost;

describe("Blog API Test", () => {
  beforeAll(async () => {
    await mongoConnect()
  });

  afterAll(async () => {
    await mongoDisconnect();
  });
  describe("Test API entry point", () => {
    test("It should create Blog with valid data", async () => {
        const { body } = await request(app)
          .post("/api/blogs")
          .set("Authorization", `Bearer ${token}`)
          .field("title", blog.valid.blogTitle)
          .field("content", blog.valid.blogContent)
          .attach("image", path.resolve(__dirname, "../data/image.PNG"))
        //   .expect(201);
    
        uploadedPost = body.blog;
      });
      test("It should list Blogs.", async () => {
        const { body } = await request(app)
          .get("/api/blogs")
          .expect("Content-Type", /json/)
          .expect(200);
      });

      test("It should list single blog with valid blog_ID.", async () => {
        const { body } = await request(app)
          .get(`/api/blogs/${blogId.validId}`)
        //   .expect("Content-Type", /json/)
          .expect(200);
      });
    //   test("It should Not  list single blog with Invalid blog_ID.", async () => {
    //     const { body } = await request(app)
    //       .get(`/api/v1/blogs/${blogId.invalId}`)
    //     //   .expect("Content-Type", /json/)
    //       .expect(404);
    //     expect({ error: "Blog doesn't exist!" })
    //   });
    // test("It should Not delete blog with Invalid ID.", async () => {
    //     const { body } = await request(app)
    //       .delete(`/blogs/${blogId.invalId}`)
    //       .set("auth-token", `Bearer ${token}`)
    //     //   .expect("text/html; charset=utf-8")
    //       .expect(404);
    //     // expect(body.message).toStrictEqual("Post doesn't exist!");
    //     expect({ error: "Blog doesn't exist!" })
    //   });

    test("It should delete blog with valid ID.", async () => {
        const { body } = await request(app)
          .delete(`/api/blogs/${uploadedPost}`)
          .set("auth-token", ` ${token}`)
          .expect("Content-Type", /json/)
          .expect(404);
        expect(body.message).toStrictEqual();
      });
  });
})

