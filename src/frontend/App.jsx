import React from "react";
import { hot } from "react-hot-loader";
import "../../public/css/style.css";
import { observer } from "mobx-react";
import { Route, Switch, Redirect } from "react-router-dom";

// Components
import Header from "./components/Header";

// Pages
import MainPage from "./pages/main";
import Error from "./pages/error";

const App = observer(() => {
    return (
        <>
            <Header />
            <Switch>
                <Route exact path="/home" component={MainPage} />

                <Redirect exact from="/" to="/home" />
                <Route>
                    <Error error={{ message: "Page not found!", status: 404 }} />
                </Route>
            </Switch>
        </>
    );
});

export default hot(module)(App);
