import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";
import useStores from "../../hooks/use-stores";

const BikeName = observer(() => {
    const { bikesStore } = useStores();
    const [changed, setChanged] = useState(false);

    const handleNameChange = (event) => {
        event.persist();
        bikesStore.handleNameChange(event);
        if (
            bikesStore.userError &&
            bikesStore.userError.messages &&
            bikesStore.userError.messages.name
        ) {
            setChanged(true);
        }
    };

    useEffect(() => {
        setChanged(false);
    }, [bikesStore.userError]);

    return (
        <div className="input-field-wrap">
            <label className="input-label" htmlFor="b-name">
                Bike name{" "}
            </label>
            <input
                className={`text-field ${
                    !changed
                        ? bikesStore.userError &&
                          bikesStore.userError.messages &&
                          bikesStore.userError.messages.name &&
                          "required-field"
                        : ""
                }`}
                type="text"
                placeholder="Enter bike name"
                name="name"
                onChange={handleNameChange}
                value={bikesStore.bikeFields.name}
                id="b-name"
            />
            <div className="error-text-anchor">
                {!changed &&
                    bikesStore.userError &&
                    bikesStore.userError.messages &&
                    bikesStore.userError.messages.name && (
                        <p className="error-text">{bikesStore.userError.messages.name}</p>
                    )}{" "}
            </div>
        </div>
    );
});

export default BikeName;
