const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const Router = require('express').Router();

const options = {
    apis: ['./src/api/Account/userRoute.js','./src/api/Receipt/receiptRoute.js','./src/api/Expense/expenseRoute.js','./src/api/invoice/invoiceRoute.js'],
    definition: {
        boxD: '1.0.0',
        info: {
            title: 'BoxD Rest API Backend',
            version: '1.0.0',
            description: 'This Application is possible backend of BoxD App. This app is made for the purpose of learning and understanding the backend of the application. This app is made using Node.js, Express.js, MongoDB, Mongoose, JWT, Swagger, etc. This app is made by <a href="">Kashif Kamran</a>, <a href="">Kainat Naseer</a>, <a href="">Hammad Bashir</a> and <a href="">Ayesha Arshad</a> under supervion of  <a href="">Malik Samad</a>. '
        },
        tags: [
            {
                name: "Account",
                description: "Account related routes"
            },
            {
                name: "Receipt",
                description: "Receipt related routes"
            },
            {
                name: "Expenses",
                description: "Expense related routes"
            },
            {
                name: "Invoice",
                description: "Invoice related routes"
            }
        ],
        securityDefinitions: {
            bearerAuth: {
                type: "apiKey",
                name: "Authorization",
                scheme: "bearer",
                in: "header"
            }
        },
        host: 'localhost:8080',
        basePath: '/api/',
        security: [
            {
                bearerAuth: [],
            },
        ],
    }
}

const specs = swaggerJsdoc(options);
Router.use('/',swaggerUi.serve,swaggerUi.setup(specs));

exports.swaggerRoute = Router;