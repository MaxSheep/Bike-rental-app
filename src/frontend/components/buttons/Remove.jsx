import React from "react";

const Remove = ({ value, id, handleRemove }) => {
    return (
        <button value={id} type="button" className="btn remove" onClick={handleRemove}>
            {value}
        </button>
    );
};

export default Remove;
