const yup = require("yup");
const bikeTypeConstant = require("../../constants/bike-type-constant");

const validateBikePrice = yup
    .number()
    .typeError("Price must be a number")
    .positive("Price must be a positive number")
    .max(99999999, "Price is too large, max value is 99,999,999")
    .required("Price is required!");

const validateBikeId = yup
    .number()
    .typeError("Id must be a number!")
    .positive("Id must be a positive number!")
    .integer("Id must be a whole number!")
    .required("Id is required!");

const validateBikeType = yup
    .number()
    .oneOf(Object.values(bikeTypeConstant), "Select the valid bike type")
    .typeError("Bike type is incorrect")
    .required("Bike type is required");

const validateRent = yup
    .boolean()
    .typeError("Bike rent is incorrect")
    .required("Bike rent is required");

const validateBikeName = yup
    .string()
    .typeError("Bike name must be a string!")
    .matches(/^[^\s]+(\s?[^\s]+)*$/, "Bike name is incorrect!")
    .min(2, "Too short!")
    .max(50, "Bike name max length is 50 characters")
    .required("Bike name is required.");

const validateChangeRent = yup.object().shape({
    id: validateBikeId,
    isRented: validateRent,
});

const validateBikeUpdate = yup.object().shape({
    id: validateBikeId,
    name: validateBikeName,
    type: validateBikeType,
    price: validateBikePrice,
});

const validateNewBike = yup.object().shape({
    name: validateBikeName,
    type: validateBikeType,
    price: validateBikePrice,
});

module.exports = {
    changeRent: validateChangeRent,
    bikeNew: validateNewBike,
    bikeUpdate: validateBikeUpdate,
};
