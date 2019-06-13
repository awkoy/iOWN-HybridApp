import React from 'react';
import styled from 'styled-components';

const FooterWrapper = styled.footer`
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
`;

const Copyright = styled.div`
    text-align: center;
    padding-top: 15px;
    padding-bottom: 15px;
    color: #000;
    font-size: 14px;
`;

const Footer = () => (
    <FooterWrapper className="footer">
        <Copyright>
            Copyright @ 2019 iOWN Group
        </Copyright>
    </FooterWrapper>
);

export default Footer;