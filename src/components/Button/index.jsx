import React from 'react';
import styled from 'styled-components';
import PropTypes from "prop-types";

const StyledButton = styled.button`
    height: 45px;
    display: inline-flex;
    border-radius: 35px;
    text-decoration: none;
    outline: none;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    font-size: 14px;
    width: 157px;
    background: #0082ca;
    color: #fff;
    border: none;
    cursor: pointer;
    overflow: hidden;
    margin-bottom: 20px;
`;

const Button = ({label, disabled, onClick = null }) => (
    <StyledButton onClick={onClick} disabled={disabled}>
        {label}
    </StyledButton>
);

Button.propTypes = {
    disabled: PropTypes.bool,
    label: PropTypes.string,

    onClick: PropTypes.func,
};

export default Button;
