import React from "react";
import { observer } from "mobx-react";
import Remove from "../buttons/Remove";
import Rent from "../buttons/Rent";

const AvailableBike = observer(({ bike, handleRemove, handleRent }) => {
    return (
        <div className={`bike-container ${bike.rentedTime > 20 ? "discounted" : ""}`}>
            <p className="bike-info">
                {bike.name} / {bike.formattedBikeType} / {bike.formattedBikePrice}{" "}
                {bike.rentedTime > 20 ? "- Special price discount!" : ""}
            </p>
            <div className="btns-container">
                <Rent id={bike.id} handleRent={handleRent} />
                <Remove value="Delete" id={bike.id} handleRemove={handleRemove} />
            </div>
        </div>
    );
});

export default AvailableBike;
