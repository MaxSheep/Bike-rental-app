import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";
import useStores from "../../hooks/use-stores";
import bikeTypeConstants from "../../../constants/bike-type-constant";

const BikeType = observer(() => {
    const { bikesStore } = useStores();
    const [changed, setChanged] = useState(false);

    const handleTypeChange = (event) => {
        event.persist();
        bikesStore.handleTypeChange(event);
        if (
            bikesStore.userError &&
            bikesStore.userError.messages &&
            bikesStore.userError.messages.type
        ) {
            setChanged(true);
        }
    };

    useEffect(() => {
        setChanged(false);
    }, [bikesStore.userError]);

    return (
        <div className="input-field-wrap">
            <label className="field-label select-label" htmlFor="bike-type-select">
                Bike type <span className="error-text">*</span>
                <select
                    id="bike-type-select"
                    name="type"
                    value={bikesStore.bikeFields.type}
                    className={`select-field ${
                        !changed
                            ? bikesStore.userError &&
                              bikesStore.userError.messages &&
                              bikesStore.userError.messages.type &&
                              "required-field"
                            : ""
                    }`}
                    onChange={handleTypeChange}
                >
                    <option hidden disabled value="">
                        Select the bike type.
                    </option>
                    {Object.entries(bikeTypeConstants).map(([key, value]) => (
                        <option key={value} value={value}>
                            {key}
                        </option>
                    ))}
                </select>
                {!changed &&
                    bikesStore.userError &&
                    bikesStore.userError.messages &&
                    bikesStore.userError.messages.type && (
                        <p className="error-text">{bikesStore.userError.messages.type}</p>
                    )}
            </label>
        </div>
    );
});

export default BikeType;
