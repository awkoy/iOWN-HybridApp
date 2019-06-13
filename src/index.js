import React from "react";
import ReactDOM from "react-dom";
import {createBrowserHistory} from "history";
import {Provider} from 'react-redux';
import {Route, Router, Switch} from "react-router-dom";

import "./assets/styles/index.sass";

import store from './store';
import indexRoutes from "./routes/index.jsx";

const hist = createBrowserHistory();

ReactDOM.render(
    <Provider store={store}>
        <Router history={hist}>
            <Switch>
                {indexRoutes.map((prop, key) => <Route path={prop.path} component={prop.component} key={key}/>)}
            </Switch>
        </Router>
    </Provider>,
    document.getElementById("root")
);
