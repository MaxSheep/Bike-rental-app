const formatError = (err) => {
    if (err.inner) {
        const error = {};
        error.messages = {};
        err.inner.forEach((e) => {
            error.messages[e.path] = e.message;
        });
        return error;
    }
    return err;
};

const errorHandler = (req, res, err) => {
    const error = formatError(err);
    if (error.status !== undefined && error.message !== undefined) {
        res.status(error.status).send(error.message);
    } else if (error.messages) {
        res.status(400).json({ error });
    } else if (Number.isInteger(+error)) {
        res.sendStatus(+error);
    } else if (typeof error === "string") {
        res.status(400).json({ error });
    } else if (error.nativeError) {
        res.status(500).json({ error: "Something broke!", dbError: error });
    } else if (error.name && error.name === "TokenExpiredError") {
        res.status(403).json({ error });
    } else {
        res.status(500).json({ error });
    }
};

const errorResponse = (req, res, errorMessage, errorCode) => {
    res.status(errorCode).send(errorMessage);
};

module.exports = {
    errorResponse,
    formatError,
    errorHandler,
};
