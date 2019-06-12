import React from "react";
import Button from "../../components/Button/index";
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const HomeLinks = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 150px;
`;

const HomeWrapper = styled.div`
    height: 100%;
    position: relative;
`;

const HomeFooter = styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
`;

const AboutLink = styled.div`
    color: #0082ca;
    text-align: center;
    margin-bottom: 15px;
    width: 100%;
`;

const Home = () => {
    return (
        <HomeWrapper>
            <HomeLinks>
                <Link to="/login">
                    <Button label="Login" />
                </Link>
                <Link to="/new-wallet">
                    <Button label="Create new wallet" />
                </Link>
            </HomeLinks>

            <HomeFooter>
                <AboutLink>
                    <Link to="/about">
                        About iOWN
                    </Link>
                </AboutLink>    
                <Link to="/privacy-policy">
                    Privacy policy
                </Link>
                <Link to="/cookie-policy">
                    Cookie policy
                </Link>
            </HomeFooter>
        </HomeWrapper>
    );
};

export default Home;
