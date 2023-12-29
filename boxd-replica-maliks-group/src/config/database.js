const mongoose = require("mongoose");
const config = require("./config")
const connectDatabase = () =>
{
    const DB_URI = `mongodb+srv://${config.MONGO_USERNAME}:${config.MONGO_PASSWORD}@nova-backend-project.rqmfanw.mongodb.net/${config.MONGO_DB_NAME}?retryWrites=true&w=majority`;

    return mongoose.connect(DB_URI,{ useNewUrlParser: true,useUnifiedTopology: true });
};

module.exports = connectDatabase;
