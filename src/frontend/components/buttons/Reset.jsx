import React, { useState } from "react";
import images from "../../../../public/images/images";

const Reset = ({ handleReset }) => {
    const [clicked, setClicked] = useState(false);
    const handleResetClick = (event) => {
        event.preventDefault();
        setClicked(true);
        handleReset();
    };

    const handleTransitionEnd = () => {
        setClicked(false);
    };

    return (
        <div className="reset-btn-anchor">
            <input
                alt="Reset fields"
                disabled={clicked}
                type="image"
                onClick={handleResetClick}
                src={images.refresh}
                className={`reset-btn ${clicked ? "rotate" : ""}`}
                title="Reset fields"
                onTransitionEnd={handleTransitionEnd}
            />
        </div>
    );
};

export default Reset;
