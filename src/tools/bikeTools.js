const moment = require("moment");
const bikesService = require("../backend/services/bikes-service");

const calculateRentedTimeAndDate = async (isRented, bikeId) => {
    const unchangedBike = await bikesService.getBikeById(bikeId);
    const result = {};
    if (isRented === true) {
        result.rentedDate = moment().format("YYYY-MM-DD[T]HH:mm:ss");
        result.rentedTime = unchangedBike.rentedTime;
    } else {
        result.rentedTime =
            unchangedBike.rentedTime +
            moment().diff(
                moment(unchangedBike.rentedDate).format("YYYY-MM-DD[T]HH:mm:ss"),
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
