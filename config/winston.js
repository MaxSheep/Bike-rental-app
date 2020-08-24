const winston = require("winston");
const path = require("path");

const options = {
    errorFile: {
        level: "error",
        filename: path.join(path.dirname(__dirname), "/logs/error.log"),
        handleExceptions: true,
        json: true,
        maxsize: 5242880, // 5MB
        maxFiles: 5,
        colorize: false,
    },
    errorConsole: {
        level: "error",
        handleExceptions: true,
        json: false,
        colorize: true,
    },
    file: {
        level: "info",
        filename: path.join(path.dirname(__dirname), "/logs/info.log"),
        handleExceptions: true,
        json: true,
        maxsize: 5242880, // 5MB
        maxFiles: 5,
        colorize: false,
    },
};

const infoLog = winston.createLogger({
    exceptionHandlers: [
        new winston.transports.File({
            filename: path.join(path.dirname(__dirname), "/logs/exceptions.log"),
        }),
    ],
    transports: [new winston.transports.File(options.file)],
    exitOnError: false,
});

const errorLog = winston.createLogger({
    exceptionHandlers: [
        new winston.transports.File({
            filename: path.join(path.dirname(__dirname), "/logs/exceptions.log"),
        }),
    ],
    transports: [
        new winston.transports.File(options.errorFile),
        new winston.transports.Console(options.errorConsole),
    ],
    exitOnError: false,
});

errorLog.stream = {
    write(message) {
        errorLog.error(message);
    },
};

module.exports = {
    infoLog,
    errorLog,
};
