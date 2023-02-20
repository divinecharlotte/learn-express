import swaggerJSDoc from "swagger-jsdoc";
import  SwaggerUi from "swagger-ui-express";
const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: "Blog API Documentation",
        description: 'This is the API myBrand ',
        version: '1.0.0',
      },
    },

    apis: ["src/server.js"],
  }
  const swaggerSpec = swaggerJSDoc(options)
  function swaggerDocs(app, port) {

    app.use('/docs', SwaggerUi.serve, SwaggerUi.setup(swaggerSpec))
    app.get('/docs.json', (req, res) => {
      res.setHeader('Content-Type', 'application/json')
      res.send(swaggerSpec)
    })
  }
  export default swaggerDocs