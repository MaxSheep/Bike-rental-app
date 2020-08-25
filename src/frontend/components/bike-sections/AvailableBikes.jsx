import React from "react";
import { observer } from "mobx-react";
import AvailableBike from "../bikes/AvailableBike";
import useStores from "../../hooks/use-stores";

const AvailableBikes = observer(() => {
    const { bikesStore } = useStores();

    return (
        <section className="bikes-section available-bikes-section">
            <h2 className="section-header">
                <span role="img" aria-label="bicycle">
                    🚲
                </span>{" "}
                Available bicycles (
                {bikesStore.getAvailableBikes.map((bike) => bike).length})
            </h2>
            {bikesStore.loading === true ? (
                <div className="loading-spinner" />
            ) : bikesStore.getAvailableBikes.map((bike) => bike).length > 0 ? (
                bikesStore.getAvailableBikes.map((bike) => (
                    <AvailableBike
                        key={bike.id}
                        bike={bike}
                        handleRemove={bikesStore.deleteBike}
                        handleRent={bikesStore.rentBike}
                    />
                ))
            ) : (
                <p>There are no available bikes for rent, add your bike or come later</p>
            )}
        </section>
    );
});

export default AvailableBikes;
