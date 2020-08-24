const bikesDBOps = require("../repo/bikes-db-operations");

const createNewBike = (bike) => {
    return bikesDBOps.createNewBike(bike);
};

const updateBike = (bike) => {
    return bikesDBOps.updateBike(bike);
};

const updateBikeRent = (model) => {
    return bikesDBOps.updateBikeRent(model);
};

const removeBike = (id) => {
    return bikesDBOps.removeBike(id);
};

const getBikes = () => {
    return bikesDBOps.getBikes();
};

const getBikeById = (id) => {
    return bikesDBOps.getBikeById(id);
};

module.exports = {
    createNewBike,
    updateBike,
    updateBikeRent,
    removeBike,
    getBikes,
    getBikeById,
};
