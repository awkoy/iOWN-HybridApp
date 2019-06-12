import React from 'react';
import styled from 'styled-components';
import logo from '../../assets/img/logo-b.png';

const HeaderWrapper = styled.header`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    padding-top: 30px;
    display: flex;
    justify-content: center;
`;

const Logo = styled.img`
    width: 200px;
    display: block;
`;

const Header = () => (
    <HeaderWrapper className="header">
        <Logo src={logo} />
    </HeaderWrapper>
);

export default Header;
