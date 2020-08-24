const Bike = require("../models/Bike");
const logger = require("../events/eventEmitter");

const createNewBike = async ({ name, type, price, rentedDate }) => {
    try {
        const query = await Bike.query().insert({
            name,
            type,
            price,
            rented_date: rentedDate,
        });
        logger.emit("success", `Bike: ${query.name} was created, id: ${query.id}`);
        return query;
    } catch (e) {
        logger.emit("error", e);
        throw e;
    }
};

const updateBike = async ({ id, name, type, price }) => {
    try {
        const query = await Bike.query().findById(id).patch({ name, type, price });
        logger.emit("success", `bike was updated, id: ${id}`);
        return query;
    } catch (e) {
        logger.emit("error", e);
        throw e;
    }
};

const updateBikeRent = async ({ id, isRented, rentedDate, rentedTime }) => {
    try {
        const query = await Bike.query().findById(id).patch({
            is_rented: isRented,
            rented_date: rentedDate,
            rented_time: rentedTime,
        });
        logger.emit("success", `bike was updated, id: ${id}`);
        return query;
    } catch (e) {
        logger.emit("error", e);
        throw e;
    }
};

const removeBike = async (id) => {
    try {
        const query = await Bike.query().deleteById(id);
        logger.emit("success", `bike was deleted, id: ${id}`);
        return query;
    } catch (e) {
        logger.emit("error", e);
        throw e;
    }
};

const getBikes = async () => {
    try {
        return await Bike.query().modify("defaultSelects");
    } catch (e) {
        logger.emit("error", e);
        throw e;
    }
};

const getBikeById = async (id) => {
    try {
        const query = await Bike.query().where("id", id).modify("defaultSelects");
        return query[0];
    } catch (e) {
        logger.emit("error", e);
        throw e;
    }
};

module.exports = {
    createNewBike,
    updateBike,
    updateBikeRent,
    removeBike,
    getBikes,
    getBikeById,
};
