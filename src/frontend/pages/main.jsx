import React, { useEffect } from "react";
import { observer } from "mobx-react";
import useStores from "../hooks/use-stores";
import YourRent from "../components/bike-sections/YourRent";
import CreateNewRent from "../components/bike-sections/CreateNewRent";
import AvailableBikes from "../components/bike-sections/AvailableBikes";

const MainPage = observer(() => {
    const { bikesStore } = useStores();

    useEffect(() => {
        bikesStore.getBikes();
    }, []);
    return (
        <main>
            {bikesStore.serverError && (
                <div className="error-msg">{bikesStore.serverError.toString()}</div>
            )}

            <CreateNewRent />

            <YourRent />

            <AvailableBikes />
        </main>
    );
});

export default MainPage;
