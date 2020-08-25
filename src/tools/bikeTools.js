const moment = require("moment");
const bikesService = require("../backend/services/bikes-service");

const calculateRentedTimeAndDate = async (isRented, bikeId) => {
    const bike = await bikesService.getBikeById(bikeId);
    const result = {};
    if (isRented === true) {
        result.rentedDate = moment().format("YYYY-MM-DD[T]HH:mm:ss");
        result.rentedTime = bike.rentedTime;
    } else {
        result.rentedTime =
            bike.rentedTime +
            moment().diff(
                moment(bike.rentedDate).format("YYYY-MM-DD[T]HH:mm:ss"),
                "hours",
                true
            );
        result.rentedDate = null;
    }
    return result;
};

module.exports = {
    calculateRentedTimeAndDate,
};
