require('dotenv').config();
module.exports = {
    PORT: process.env.PORT || 3000,
    MONGO_USERNAME: process.env.MONGO_USERNAME,
    MONGO_PASSWORD: process.env.MONGO_PASSWORD,
    MONGO_DB_NAME: process.env.MONGO_DB_NAME,
    // 
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRE: process.env.JWT_EXPIRE,
    // 
    SMTP_HOST: process.env.SMTP_HOST,
    SMTP_PORT: process.env.SMTP_PORT,
    SMTP_PASSWORD: process.env.SMTP_PASSWORD,
}