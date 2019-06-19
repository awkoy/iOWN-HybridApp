import React from 'react';
import logo from '../../assets/img/logo-b.png';
import { Link } from 'react-router-dom';

const Header = () => (
    <header className="header">
        <Link to="/">
            <img className="header__logo" src={logo} alt="Logo"/>
        </Link>
    </header>
);

export default Header;
