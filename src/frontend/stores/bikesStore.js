import { action, computed, observable, runInAction } from "mobx";
import BikesService from "../services/bikesService";
import currencyFormatter from "../../tools/currencyFormatter";
import Bike from "../models/Bike";

const defaultBikeFields = { name: "", type: "", price: "" };

export default class BikesStore {
    constructor() {
        this.bikesService = new BikesService();
    }

    @observable bikeFields = { name: "", type: "", price: "" };

    @observable error = null;

    @action
    setError = (value) => {
        this.error = value;
    };

    @action
    handleNameChange = (event) => {
        this.bikeFields.name = event.target.value;
    };

    @action
    handleTypeChange = (event) => {
        this.bikeFields.type = event.target.value;
    };

    @action
    handlePriceChange = (event) => {
        this.bikeFields.price = event.target.value;
    };

    @observable bikes = [];

    @observable loading = true;

    @observable userError = null;

    @observable serverError = null;

    @observable status = "initial";

    @computed get getRentedBikes() {
        return this.bikes.filter((bike) => bike.isRented === true);
    }

    @computed get getAvailableBikes() {
        return this.bikes.filter((bike) => bike.isRented === false);
    }

    findBikeById = (id) => this.bikes.findIndex((currentBike) => currentBike.id === id);

    @computed get rentedBikesTotalPrice() {
        return currencyFormatter.format(
            this.getRentedBikes
                .map((bike) => bike.price)
                .reduce((total, curr) => total + +curr, 0)
        );
    }

    @action
    resetStates = () => {
        this.bikes = [];
        this.loading = true;
        this.userError = null;
        this.serverError = null;
    };

    @action resetFields = () => {
        this.bikeFields = defaultBikeFields;
    };

    @action
    resetServerError = () => {
        this.serverError = null;
    };

    @action
    getBikes = async () => {
        this.loading = true;
        this.bikes = [];
        this.serverError = null;
        try {
            const res = await this.bikesService.get();
            runInAction(() => {
                res.data.bikes.forEach((bike) => this.bikes.push(new Bike(bike)));
                this.loading = false;
            });
        } catch (e) {
            runInAction(() => {
                this.loading = false;
                this.status = "error";
                this.serverError = e;
            });
        }
    };

    @action
    rentBike = async (event) => {
        const selectedId = event.target.value;
        this.status = "initial";
        this.serverError = null;
        try {
            const res = await this.bikesService.postRent(selectedId);
            if (res.status === 201) {
                runInAction(() => {
                    this.bikes[this.findBikeById(selectedId)].isRented = true;
                    this.status = "success";
                });
            }
        } catch (e) {
            runInAction(() => {
                this.status = "error";
                if (e.response && e.response.status) {
                    this.userError = e.response.data.error;
                } else {
                    this.serverError = e;
                }
            });
        }
    };

    @action
    cancelRent = async (event) => {
        const selectedId = event.target.value;
        this.status = "initial";
        this.serverError = null;
        try {
            const res = await this.bikesService.cancelRent(selectedId);
            runInAction(() => {
                this.status = "success";
                const foundBikeIndex = this.findBikeById(selectedId);
                this.bikes[foundBikeIndex].isRented = false;
                if (
                    res.data.rentedTime > 20 &&
                    this.bikes[foundBikeIndex].rentedTime <= 20
                ) {
                    this.bikes[foundBikeIndex].price /= 2;
                    this.bikes[foundBikeIndex].rentedTime = res.data.rentedTime;
                }
            });
        } catch (e) {
            runInAction(() => {
                this.status = "error";
                this.serverError = e;
            });
        }
    };

    @action
    updateBike = async (event, bike) => {
        this.status = "initial";
        this.serverError = null;
        const model = {
            id: bike.id,
            name: bike.name,
            type: bike.type,
            price: bike.price,
        };
        try {
            const res = await this.bikesService.patch(model);
            if (res.status === 204) {
                runInAction(() => {
                    const foundIndex = this.bikes.findIndex(
                        (currentBike) => currentBike.id === model.id
                    );
                    this.bikes[foundIndex].name = model.name;
                    this.status = "success";
                });
            }
        } catch (e) {
            runInAction(() => {
                this.status = "error";
                if (e.response && e.response.status) {
                    this.userError = e.response.data.error;
                } else {
                    this.serverError = e;
                }
            });
        }
    };

    @action
    createBike = async () => {
        this.status = "initial";
        this.serverError = null;
        this.userError = null;
        try {
            const res = await this.bikesService.post({
                name: this.bikeFields.name,
                type: this.bikeFields.type,
                price: this.bikeFields.price,
            });
            if (res.status === 201) {
                runInAction(() => {
                    this.status = "success";
                    res.data.isRented = false;
                    this.bikes.push(new Bike(res.data));
                });
            }
        } catch (e) {
            runInAction(() => {
                this.status = "error";
                if (e.response && e.response.status) {
                    this.userError = e.response.data.error;
                } else {
                    this.serverError = e;
                }
            });
        }
    };

    @action
    deleteBike = async (event) => {
        const selectedId = event.target.value;
        this.status = "initial";
        this.serverError = null;
        try {
            await this.bikesService.delete(selectedId);
            runInAction(() => {
                this.bikes = this.bikes.filter(
                    (currentBike) => currentBike.id !== selectedId
                );
                this.status = "success";
            });
        } catch (e) {
            runInAction(() => {
                this.status = "error";
                this.serverError = e;
            });
        }
    };
}
