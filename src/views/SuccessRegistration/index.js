import React from "react";
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import QRCode from "qrcode.react";
import CopyIcon from '@material-ui/icons/FileCopy';

const copy = text => {
    console.log(text)
    const textField = document.createElement('textarea')
    textField.innerText = text;
    document.body.appendChild(textField)
    textField.select()
    document.execCommand('copy')
    textField.remove()
}

const SuccessRegistration = () => {
    return (
        <Container className="home" component="main" maxWidth="xs">
            <Typography variant="h5" align="center" gutterBottom>
                Your iOWN wallet is created
            </Typography>
            <Box align="center" pt={5}>
                <QRCode value="hello kitty" />
            </Box>
            <span className="copy__code">
                <div className="copy__code__text">
                    ;lkfdskl;fkl;kl;k;lk2;l34;l23l;cmdsl;ml;4m3l;24l;23
                </div>
                <CopyIcon onClick={() => copy('alkki')} />
            </span>

            <Button color="primary" className="register__btn" fullWidth variant="contained">
                Next
            </Button>

        </Container>
    );
};

export default SuccessRegistration;
