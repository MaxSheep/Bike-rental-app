require("dotenv").config();

const config = {
    // --- NODE CONFIG VARIABLES - change to your server config
    NODE_HOST_NAME: process.env.NODE_HOST,
    NODE_PORT: process.env.NODE_PORT,
    NODE_ENV: process.env.NODE_ENV,
    NODE_ADDRESS: process.env.NODE_ADDRESS,

    WEBPACK_DEV_PORT: process.env.WEBPACK_DEV_PORT,

    DB_CLIENT: process.env.DB_CLIENT,
    DB_HOST: process.env.DB_HOST,
    DB_USER: process.env.DB_USER,
    DB_NAME: process.env.DB_NAME,
    DB_PASSWORD: process.env.DB_PASSWORD,
};

module.exports = config;
