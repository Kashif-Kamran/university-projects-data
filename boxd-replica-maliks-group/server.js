const connectDatabase = require('./src/config/database');
const app = require('./index.js');
require("./src/config/config"); // This is for environment variables

// Function to handle Uncaught Exception missed by try catch block
process.on('uncaughtException',(err) =>
{
    console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...");
    console.log(err.name,err.message);
    process.exit(1);
});

// Database Connection and Starting the Server 
var server;
connectDatabase().then(() =>
{
    server = app.listen(process.env.PORT,() =>
    {
        console.log(`Server is working on 'http://localhost:${process.env.PORT}/health'`);
    });
}).catch((err) =>
{
    console.log("Error Occured While Connecting The Database");
    console.log(err);
});



// Function to handle unhandle rejections caused by promises
process.on('unhandledRejection',(err) =>
{
    console.log("UNHANDLED REJECTION! 💥 Shutting down...");
    console.log(err.name,err.message);
    server.close(() =>
    {
        process.exit(1);
    });
});

