import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";
import useStores from "../../hooks/use-stores";

const RentPrice = observer(() => {
    const { bikesStore } = useStores();
    const [changed, setChanged] = useState(false);

    const handlePriceChange = (event) => {
        event.persist();
        bikesStore.handlePriceChange(event);
        if (
            bikesStore.userError &&
            bikesStore.userError.messages &&
            bikesStore.userError.messages.price
        ) {
            setChanged(true);
        }
    };

    useEffect(() => {
        setChanged(false);
    }, [bikesStore.userError]);

    return (
        <div className="input-field-wrap">
            <label htmlFor="r-price-input">
                Rent price <span className="error-text">*</span>
                <input
                    className={`text-field ${
                        !changed
                            ? bikesStore.userError &&
                              bikesStore.userError.messages &&
                              bikesStore.userError.messages.price &&
                              "required-field"
                            : ""
                    }`}
                    type="text"
                    placeholder="Enter rent price"
                    name="price"
                    onChange={handlePriceChange}
                    value={bikesStore.bikeFields.price}
                    id="r-price-input"
                />
            </label>
            {!changed &&
                bikesStore.userError &&
                bikesStore.userError.messages &&
                bikesStore.userError.messages.price && (
                    <p className="error-text">{bikesStore.userError.messages.price}</p>
                )}{" "}
        </div>
    );
});

export default RentPrice;
