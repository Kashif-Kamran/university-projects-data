const cors = require('cors');
const express = require('express');
const connectDatabase = require('./src/config/database');
const errorMiddleware = require('./src/middlewares/error');
const morgan = require('morgan');



const PORT = process.env.PORT || 3000;


// Third party middlewares Configurations
const app = express();
app.use(morgan('tiny'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Routes
const userRoute = require('./src/api/Account/userRoute');
const receiptRoute = require('./src/api/Receipt/receiptRoute');
const expenseRouter = require("./src/api/Expense/expenseRoute");
const invoiceRoute = require('./src/api/invoice/invoiceRoute');
const jonTracking = require('./src/api/JobTracking/jobTrackingRoute');
const { swaggerRoute } = require('./src/api/Docs/swaggerRoute');

app.use("/api/user",userRoute);
app.use("/api/receipt",receiptRoute);
app.use("/api/expense",expenseRouter);
app.use('/api/invoice',invoiceRoute);
app.use('/api/job', jonTracking);
app.use('/api/docs',swaggerRoute);


// route to check health of the server
app.use("/health",(req,res) =>
{
    res.send({
        status: "OK",
        message: "Server is working fine!"
    });
});

// Error Handling Middleware
app.use(errorMiddleware);

module.exports = app;