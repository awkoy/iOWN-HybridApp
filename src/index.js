import React from "react";
import ReactDOM from "react-dom";
import {Provider} from 'react-redux';
import {Route, Router, Switch} from "react-router-dom";
import history from "./history";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./views/Home";
import SignUp from "./views/SingUp";
import SignIn from "./views/SingIn";
import CreateWallet from "./views/CreateWallet";
import SuccessRegistration from "./views/SuccessRegistration";
import ComingSoon from "./views/ComingSoon";
import Dashboard from "./views/Dashboard";

import "./assets/styles/index.sass";

import {initializeStore} from "./ducks";

import {
    ROUTE_SIGNUP,
    ROUTE_CREATE_WALLET,
    ROUTE_SIGNIN,
    ROUTE_INDEX,
    ROUTE_SUCCESS_REGISTRATION,
    ROUTE_ABOUT,
    ROUTE_PRIVATE_POLICY,
    ROUTE_COOKIES_POLICY,
    ROUTE_COMING_SOON,
    ROUTE_DASHBOARD
} from "./constants/routes";

const store = initializeStore();

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <Header/>
            <Switch>
                <Route exact path={ROUTE_INDEX} component={Home} />
                <Route exact path={ROUTE_SIGNUP} component={SignUp} />
                <Route exact path={ROUTE_SIGNIN} component={SignIn} />
                <Route exact path={ROUTE_CREATE_WALLET} component={CreateWallet} />
                <Route exact path={ROUTE_SUCCESS_REGISTRATION} component={SuccessRegistration} />
                <Route exact path={ROUTE_ABOUT} component={ComingSoon} />
                <Route exact path={ROUTE_PRIVATE_POLICY} component={ComingSoon} />
                <Route exact path={ROUTE_COOKIES_POLICY} component={ComingSoon} />
                <Route exact path={ROUTE_COMING_SOON} component={ComingSoon} />
                <Route exact path={ROUTE_DASHBOARD} component={Dashboard} />
            </Switch>
        </Router>
        <Footer/>
    </Provider>,
    document.getElementById("root")
);
