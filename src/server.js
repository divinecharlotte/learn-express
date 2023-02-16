import http from 'http'
import dotenv from 'dotenv'
import { mongoConnect } from './services/mongo.js'
import app from './app.js';
import swaggerJSDoc from "swagger-jsdoc"
import swaggerUi from "swagger-ui-express"



/**
 * @swagger
 *  components:
 *    securitySchemes:
 *      JWTAuth:
 *        type: http
 *        scheme: bearer
 *        bearerFormat: JWT
 *    schemas:
 *      blogSchema:
 *        type: object
 *        properties:
 *          title:
 *            type: string
 *          content:
 *            type: string
 *          image:
 *            type: string
 *      contactSchema:
 *        type: object
 *        properties:
 *          name:
 *            type: string
 *          email:
 *            type: string
 *          message:
 *            type: string
 *      loginSchema:
 *        type: object
 *        properties:
 *          email:
 *            type: string
 *          password:
 *            type: string
 *      signupSchema:
 *        type: object
 *        properties:
 *          email:
 *            type: string
 *          password:
 *            type: string
 *      commentSchema:
 *        type: object
 *        properties:
 *          name:
 *            type: string
 *          message:
 *            type: string
 *
 */

const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Blog API Documentation",
        version: "1.0.0",
      },
      servers: [
        {
          url: "https://localhost:5000/api",
        },
      ],
    },
    apis: ["src/server.js"],
  };
  const swaggerSpec = swaggerJSDoc(options);
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//---------- Create a blog ------------------------------//
/**
 * @swagger
 * '/blogs':
 *  post:
 *     tags:
 *     - Create_Blog
 *     summary: Create a blog
 *     parameters:
 *        - in: header
 *          name: auth-token
 *          required: true
 *          description: numeric ID required
 *     requestBody:
 *      required: true
 *      content:
 *        multipart/form-data:
 *           schema:
 *            type: object
 *            required:
 *              - title
 *              - content
 *              - image
 *            properties:
 *              title:
 *                type: string
 *                default: hello
 *              content:
 *                type: string
 *                default: greetings greetings
 *              image:
 *                type: file
 *     responses:
 *      201:
 *        description: Created
 *      409:
 *        description: Conflict
 *      404:
 *        description: Not Found
 */



/**
 * @swagger
 * '/blogs/{id}':
 *  patch:
 *     tags:
 *     - Create_Blog
 *     summary: Create a blog
 *     parameters:
 *        - in: header
 *          name: auth-token
 *          required: true
 *          description: numeric ID required
 *        - in: path
 *          name: id
 *          required: true
 *          description: numeric ID required
 *     requestBody:
 *      required: true
 *      content:
 *        multipart/form-data:
 *           schema:
 *            type: object
 *            required:
 *              - title
 *              - content
 *              - image
 *            properties:
 *              title:
 *                type: string
 *                default: hello
 *              content:
 *                type: string
 *                default: greetings greetings
 *              image:
 *                type: file
 *     responses:
 *      201:
 *        description: Created
 *      409:
 *        description: Conflict
 *      404:
 *        description: Not Found
 */

/**
 * @swagger
 * /blogs:
 *  get:
 *      summary: This API is used to check if get method is working or not
 *      description: This API is used to check if get method is working or not
 *      responses:
 *          200:
 *              description: To test Get method
 */

/**
 * @swagger
 * /blogs/{id}:
 *  get:
 *      summary: This API is used to check if get method is working or not
 *      description: This API is used to check if get method is working or not
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: numeric ID required
 *            schema:
 *            type: integer
 *      responses:
 *          200:
 *              description: To test Get method
 */

/**
 * @swagger
 * '/blogs/{id}':
 *  delete:
 *     tags:
 *     - Create_Blog
 *     summary: Create a blog
 *     parameters:
 *        - in: header
 *          name: auth-token
 *          required: true
 *          description: numeric ID required
 *        - in: path
 *          name: id
 *          required: true
 *          description: numeric ID required
 *     responses:
 *          200:
 *              description: Data deleted successfully
 */




  /**
 * @swagger
 * /messages:
 *  post:
 *    summary: To add message
 *    description: Used to add message
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *           $ref: "#components/schemas/contactSchema"
 *    responses:
 *      200:
 *          description: message added successfully
 */


/**
 * @swagger
 * /messages:
 *  get:
 *      summary: This API is used to check if get method of message is working or not
 *      description: This API is used to check if get method is working or not
 *      responses:
 *          200:
 *              description: To test Get method
 */


/**
 * @swagger
 * /messages/{id}:
 *  delete:
 *      summary: This API is used to check if the delete method is working or not
 *      description: This API is used to check if get method is working or not
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: numeric ID required
 *            schema:
 *            type: integer
 *      responses:
 *          200:
 *              description: message deleted successfully
 */


  /**
 * @swagger
 * /auth/login:
 *  post:
 *    summary: To login
 *    description: Used to login
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *           $ref: "#components/schemas/loginSchema"
 *    responses:
 *      200:
 *          description: user logged in successfully
 */

  /**
 * @swagger
 * /register:
 *  post:
 *    summary: To signup
 *    description: Used to signup
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *           $ref: "#components/schemas/signupSchema"
 *    responses:
 *      200:
 *          description: user created successfully
 */


  /**
 * @swagger
 * /users:
 *  get:
 *    parameters:
 *        - in: header
 *          name: auth-token
 *          required: true
 *          description: numeric ID required
 *    summary: Used for editing blog
 *    description: This API is used to edit a blog
 *    responses:
 *      200:
 *          description: Blog updated successfully
 */


  /**
 * @swagger
 * /blogs/:id/comments:
 *  post:
 *    summary: To a comment on a blog
 *    description: Used to post a comment
 *    parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          description: numeric ID required
 *          schema:
 *          type: integer
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *           $ref: "#components/schemas/commentSchema"
 *    responses:
 *      200:
 *          description: comment addeed successfully
 */

  /**
 * @swagger
 * /blogs/:id/comments:
 *  get:
 *      summary: This API is used to check if get method on comments is working or not
 *      description: This API is used to check if get method is working or not
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: numeric ID required
 *            schema:
 *            type: integer
 *      responses:
 *          200:
 *              description: To test Get method
 */

  /**
 * @swagger
 * /blogs/:id/likes:
 *  post:
 *    summary: To a comment on a blog
 *    description: Used to post a comment
 *    parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          description: numeric ID required
 *          schema:
 *          type: integer
 *    responses:
 *      200:
 *          description: like addeed successfully
 */

  /**
 * @swagger
 * /blogs/:id/likes:
 *  get:
 *    summary: To a comment on a blog
 *    description: Used to post a comment
 *    parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          description: numeric ID required
 *          schema:
 *          type: integer
 *    responses:
 *      200:
 *          description: like addeed successfully
 */
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