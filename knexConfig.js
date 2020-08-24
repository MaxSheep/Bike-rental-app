const config = require("./config/config");

module.exports = {
    development: {
        client: config.DB_CLIENT,
        useNullAsDefault: true,
        connection: {
            host: config.DB_HOST,
            user: config.DB_USER,
            database: config.DB_NAME,
            password: config.DB_PASSWORD,
        },
    },
};
