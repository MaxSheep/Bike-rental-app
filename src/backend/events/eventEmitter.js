const { EventEmitter } = require("events");
const winston = require("../../../config/winston.js");

const logger = new EventEmitter();

logger.on("error", (err) => {
    winston.errorLog.error(err);
});
logger.on("success", (message) => {
    winston.infoLog.info(message);
});

module.exports = logger;
