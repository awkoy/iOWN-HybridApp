import QRCode from "qrcode.react";
import Box from '@material-ui/core/Box';
import React from "react";

const copy = text => {
    const textField = document.createElement('textarea');
    textField.innerText = text;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand('copy');
    textField.remove();
};

const Address = ({address = "0x36d4568A4F8E64F3501CAE1C7b034bBb5ba27D70"}) => (
    <Box className="dashboard__adress" align="left" pt={3}>
        <QRCode size={50} value={address} />
        <Box className="dashboard__adress__container" pl={2}>
            <Box mb={1}>Your public iOWN address</Box>
            <div onClick={() => copy(address)} className="copy__code__text">
                <b>{address}</b> 
            </div>
        </Box>
    </Box>
);

export default Address;