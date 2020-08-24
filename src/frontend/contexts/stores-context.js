import React from "react";
import BikesStore from "../stores/bikesStore";

export default React.createContext({
    bikesStore: new BikesStore(),
});
