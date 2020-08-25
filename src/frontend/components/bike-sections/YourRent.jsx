import React from "react";
import { observer } from "mobx-react";
import RentedBike from "../bikes/RentedBike";
import useStores from "../../hooks/use-stores";

const YourRent = observer(() => {
    const { bikesStore } = useStores();

    return (
        <section className="bikes-section your-rent-section">
            <h2 className="section-header">
                <span role="img" aria-label="Star smiley face">
                    🤩
                </span>{" "}
                Your rent (Total: {bikesStore.rentedBikesTotalPrice})
            </h2>
            {bikesStore.loading === true ? (
                <div className="loading-spinner" />
            ) : bikesStore.getRentedBikes.length > 0 ? (
                bikesStore.getRentedBikes.map((bike) => (
                    <RentedBike
                        key={bike.id}
                        bike={bike}
                        handleRemove={bikesStore.cancelRent}
                    />
                ))
            ) : (
                <p>Currently you don&apos;t have any bikes rented</p>
            )}
        </section>
    );
});

export default YourRent;
