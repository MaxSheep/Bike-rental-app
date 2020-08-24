const bikesRouter = require("express").Router();
const validate = require("../validation/validate");
const { calculateRentedTimeAndDate } = require("../../tools/bikeTools");
const bikesService = require("../services/bikes-service");

bikesRouter.get("/", async (req, res, next) => {
    try {
        const bikes = await bikesService.getBikes();
        res.status(200).json({
            bikes,
        });
    } catch (e) {
        next(e);
    }
});

bikesRouter.post("/", async (req, res, next) => {
    try {
        const validated = await validate.bikeNew.validate(req.body, {
            abortEarly: false,
        });
        const bike = await bikesService.createNewBike(validated);
        res.status(201).json(bike);
    } catch (e) {
        next(e);
    }
});

bikesRouter.post("/:bikeId", async (req, res, next) => {
    try {
        const validated = await validate.changeRent.validate(
            { id: +req.params.bikeId, isRented: req.body.isRented },
            {
                abortEarly: false,
            }
        );
        const model = {
            ...(await calculateRentedTimeAndDate(validated.isRented, validated.id)),
            ...validated,
        };
        const bike = await bikesService.updateBikeRent(model);
        res.status(201).json(bike);
    } catch (e) {
        next(e);
    }
});

bikesRouter.patch("/:bikeId", async (req, res, next) => {
    try {
        const validated = await validate.bikeNew.validate(req.body, {
            abortEarly: false,
        });
        await bikesService.updateBike(validated);
        res.sendStatus(200).end();
    } catch (e) {
        next(e);
    }
});

bikesRouter.delete("/:bikeId", async (req, res, next) => {
    try {
        await bikesService.removeBike(+req.params.bikeId);
        res.sendStatus(200).end();
    } catch (e) {
        next(e);
    }
});

module.exports = bikesRouter;
