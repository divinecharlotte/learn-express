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
 *      bearerAuth:
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
          url: "http://localhost:5000/api",
        },
      ],
    },
    apis: ["src/server.js"],
  };
  const swaggerSpec = swaggerJSDoc(options);
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  /**
 * @swagger
 * /blogs:
 *  post:
 *    security:
 *      - bearerAuth: []
 *    summary: To add blog
 *    description: Used to add blog
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *           $ref: "#components/schemas/blogSchema"
 *    responses:
 *      200:
 *          description: Blog added successfully
 */



  /**
 * @swagger
 * /blogs/{id}:
 *  patch:
 *    security:
 *      - bearerAuth: []
 *    summary: Used for editing blog
 *    description: This API is used to edit a blog
 *    parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: numeric ID required
 *            schema:
 *              type: string
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *           $ref: "#components/schemas/blogSchema"
 *    responses:
 *      200:
 *          description: Blog updated successfully
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
 * /blogs/{id}:
 *  delete:
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
 *      summary: This API is used to check if get method on users is working or not
 *      description: This API is used to check if get method is working or not
 *      responses:
 *          200:
 *              description: To test Get method
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