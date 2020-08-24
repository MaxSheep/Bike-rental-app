import React from "react";
import { observer } from "mobx-react";
import Remove from "../buttons/Remove";
import Rent from "../buttons/Rent";

const AvailableBike = observer(({ bike, handleRemove, handleRent }) => {
    return (
        <div className="bike-container">
            <p>
                {bike.name} / {bike.formattedBikeType} / {bike.formattedBikePrice}
            </p>
            <div className="btns-container">
                <Rent id={bike.id} handleRent={handleRent} />
                <Remove value="Delete" id={bike.id} handleRemove={handleRemove} />
            </div>
        </div>
    );
});

export default AvailableBike;
