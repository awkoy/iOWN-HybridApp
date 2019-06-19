import React from "react";
import ReactDOM from "react-dom";
import {createBrowserHistory} from "history";
import {Provider} from 'react-redux';
import {Route, Router, Switch} from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./views/Home";
import SignUp from "./views/SingUp";

import "./assets/styles/index.sass";

import {initializeStore} from "./ducks";

const store = initializeStore();
const hist = createBrowserHistory();

ReactDOM.render(
    <Provider store={store}>
        <Header/>
        <Router history={hist}>
            <Switch>
                <Route exact path={"/"} component={Home} />
                <Route exact path={"/create-wallet"} component={SignUp} />
            </Switch>
        </Router>
        <Footer/>
    </Provider>,
    document.getElementById("root")
);
