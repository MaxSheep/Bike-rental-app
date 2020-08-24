import React from "react";

const Error = ({ error }) => {
    if (typeof error === "object") {
        if (error.message && error.status) {
            return (
                <main>
                    <h1>{error.status.toString()}</h1>
                    <h2>{error.message.toString()}</h2>
                </main>
            );
        }
        if (error.message && error.name) {
            return (
                <main>
                    <h1>{error.name.toString()}</h1>
                    <h2>{error.message.toString()}</h2>
                </main>
            );
        }
        if (error.response) {
            return (
                <main>
                    <h1>{error.response.status.toString()}</h1>
                    <h2>{error.response.data.toString()}</h2>
                </main>
            );
        }
    }
    return (
        <main>
            <h1>{error.toString()}</h1>
        </main>
    );
};

export default Error;
