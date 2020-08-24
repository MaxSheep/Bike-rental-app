const cors = require("cors");
const express = require("express");
const Knex = require("knex");
const { Model } = require("objection");
const bodyParser = require("body-parser");

// Express
const app = express();
const server = require("http").createServer(app);

// Routers
const bikesRouter = require("./src/backend/routes/bikes-router");
const error = require("./src/backend/routes/error");

const config = require("./config/config");

// Knex ORM
const knexConfig = require("./knexConfig");

const hostname = config.NODE_HOST_NAME;
const port = config.NODE_PORT;

const knex = Knex(knexConfig.development);

Model.knex(knex);

app.use(
    cors({
        credentials: true,
        origin: `http://localhost:${config.WEBPACK_DEV_PORT}`,
    })
);

// Body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// --- ROUTERS ---
app.use("/bikes", bikesRouter);

// --- ERROR ---
app.use((err, req, res, next) => {
    error.errorHandler(req, res, err);
    next(err);
});
app.use((req, res) => {
    error.errorResponse(req, res, "Resource not found!", 404);
});

server.listen(port, hostname, () => {
    console.log(`Node server running at http://${hostname}:${port}/`);
});
