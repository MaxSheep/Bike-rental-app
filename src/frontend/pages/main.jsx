import React, { useEffect } from "react";
import { observer } from "mobx-react";
import useStores from "../hooks/use-stores";
import BikeType from "../components/bike-fields/BikeType";
import BikeName from "../components/bike-fields/BikeName";
import RentPrice from "../components/bike-fields/RentPrice";
import Submit from "../components/buttons/Submit";
import RentedBike from "../components/bikes/RentedBike";
import AvailableBike from "../components/bikes/AvailableBike";

const MainPage = observer(() => {
    const { bikesStore } = useStores();

    const handleNewRentSubmit = (event) => {
        event.preventDefault();

        bikesStore.createBike();
    };

    useEffect(() => {
        bikesStore.getBikes();
    }, []);
    return (
        <main>
            <section className="bikes-section create-new-rent-section">
                <h2>Create new rent</h2>
                <form onSubmit={handleNewRentSubmit}>
                    <div>
                        <BikeName />
                        <BikeType />
                        <RentPrice />

                        <Submit value="Submit rent" />
                    </div>
                </form>
            </section>

            <section className="bikes-section your-rent-section">
                <h2>Your rent (Total: {bikesStore.rentedBikesTotalPrice})</h2>
                {bikesStore.getRentedBikes.length > 0 ? (
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

            <section className="bikes-section available-bikes-section">
                <h2>
                    Available bicycles (
                    {bikesStore.getAvailableBikes.map((bike) => bike).length})
                </h2>
                {bikesStore.getAvailableBikes.map((bike) => bike).length > 0 ? (
                    bikesStore.getAvailableBikes.map((bike) => (
                        <AvailableBike
                            key={bike.id}
                            bike={bike}
                            handleRemove={bikesStore.deleteBike}
                            handleRent={bikesStore.rentBike}
                        />
                    ))
                ) : (
                    <p>
                        There are no available bikes for rent, add your bike or come later
                    </p>
                )}
            </section>
        </main>
    );
});

export default MainPage;
