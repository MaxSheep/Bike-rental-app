import React from "react";
import { observer } from "mobx-react";
import Remove from "../buttons/Remove";

const RentedBike = observer(({ bike, handleRemove }) => {
    return (
        <div className="bike-container">
            <p>
                {bike.name} / {bike.formattedBikeType} / {bike.formattedBikePrice}
            </p>
            <div className="btns-container">
                <Remove id={bike.id} value="Cancel rent" handleRemove={handleRemove} />
            </div>
        </div>
    );
});

export default RentedBike;
