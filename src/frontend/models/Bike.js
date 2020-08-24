import { computed, observable } from "mobx";
import currencyFormatter from "../../tools/currencyFormatter";
import bikeTypeConstants from "../../constants/bike-type-constant";

export default class Bike {
    @observable id;

    @observable name;

    @observable type;

    @observable price;

    @observable rentedDate;

    @observable rentedTime;

    @observable isRented;

    @observable error = null;

    @computed get formattedBikePrice() {
        return currencyFormatter.format(this.price);
    }

    @computed get formattedBikeType() {
        return Object.keys(bikeTypeConstants).find(
            (key) => bikeTypeConstants[key] === this.type
        );
    }

    constructor(bike) {
        this.id = bike.id;
        this.name = bike.name;
        this.type = bike.type;
        this.price = bike.price;
        this.rentedDate = bike.rentedDate;
        this.rentedTime = bike.rentedTime;
        this.isRented = bike.isRented;
    }
}
