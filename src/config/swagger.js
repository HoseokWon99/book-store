const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerOptions = require("../../swagger-config.json");

module.exports = [
    swaggerUi.serve,
    swaggerUi.setup(swaggerJsDoc(swaggerOptions))
];