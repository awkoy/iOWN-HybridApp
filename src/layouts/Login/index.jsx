import React from "react";
import {Route, Switch} from "react-router-dom";
import styled from 'styled-components';

import Header from "../../components/Header/index";
import Footer from "../../components/Footer/index";
import Home from "../../views/Home";

const Main = styled.div`
    padding-top: 70px;
    padding-left: 20px;
    padding-right: 20px;
    padding-bottom: 50px;
    position: relative;
    height: 100vh;
    box-sizing: border-box;
`;

const switchRoutes = (
    <Switch>
        <Route path={"/"} component={Home}/>
    </Switch>
);

const Login = () => {
    return (
        <>
            <Header />
            <Main>
                {switchRoutes}
            </Main>
            <Footer />
        </>
    );
};

export default Login;
