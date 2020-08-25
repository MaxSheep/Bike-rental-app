import React from "react";
import { observer } from "mobx-react";
import BikeName from "../bike-fields/BikeName";
import BikeType from "../bike-fields/BikeType";
import RentPrice from "../bike-fields/RentPrice";
import Submit from "../buttons/Submit";
import useStores from "../../hooks/use-stores";
import Reset from "../buttons/Reset";

const CreateNewRent = observer(() => {
    const { bikesStore } = useStores();
    const handleNewRentSubmit = (event) => {
        event.preventDefault();

        bikesStore.createBike();
    };

    return (
        <section className="bikes-section create-new-rent-section">
            <h2 className="section-header">
                <span role="img" aria-label="Money smiley face">
                    🤑
                </span>{" "}
                Create new rent
            </h2>
            <form onSubmit={handleNewRentSubmit}>
                <div className="fields-wrap">
                    <BikeName />
                    <BikeType />
                    <RentPrice />

                    <Submit value="Submit rent" />
                    <Reset handleReset={bikesStore.resetFields} />
                </div>
            </form>
        </section>
    );
});

export default CreateNewRent;
