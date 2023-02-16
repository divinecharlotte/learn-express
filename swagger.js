import swaggerJSDoc from "swagger-jsdoc";
import  SwaggerUi from "swagger-ui-express";
const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: "Blog API Documentation",
        description: 'This is the API for KATROS',
        version: '1.0.0',
      },
    },
    // looks for configuration in specified directories
    apis: ["src/server.js"],
  }
  const swaggerSpec = swaggerJSDoc(options)
  function swaggerDocs(app, port) {
    // Swagger Page
    app.use('/docs', SwaggerUi.serve, SwaggerUi.setup(swaggerSpec))
    // Documentation in JSON format
    app.get('/docs.json', (req, res) => {
      res.setHeader('Content-Type', 'application/json')
      res.send(swaggerSpec)
    })
  }
  export default swaggerDocs