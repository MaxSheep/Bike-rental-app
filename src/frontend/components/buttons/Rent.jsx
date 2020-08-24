import React from "react";

const Rent = ({ id, handleRent }) => {
    return (
        <button type="button" className="btn rent" value={id} onClick={handleRent}>
            Rent
        </button>
    );
};

export default Rent;
