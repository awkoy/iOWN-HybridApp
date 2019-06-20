import React from "react";
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import QRCode from "qrcode.react";
import CopyIcon from '@material-ui/icons/FileCopy';
import {connect} from "react-redux";

const copy = text => {
    const textField = document.createElement('textarea')
    textField.innerText = text;
    document.body.appendChild(textField)
    textField.select()
    document.execCommand('copy')
    textField.remove()
}

class SuccessRegistration extends React.Component {

    render () {
        const {walletAddress} = this.props.signup;
        return (
            <Container className="home" component="main" maxWidth="xs">
                <Typography variant="h5" align="center" gutterBottom>
                    Your iOWN wallet is created
                </Typography>
                <Box align="center" pt={5}>
                    <QRCode value={walletAddress} />
                </Box>
                <span className="copy__code">
                    <div className="copy__code__text">
                        {walletAddress}
                    </div>
                    <CopyIcon onClick={() => copy(walletAddress)} />
                </span>
    
                <Button color="primary" className="register__btn" fullWidth variant="contained">
                    Next
                </Button>
    
            </Container>
        );
    }
};

const mapState2props = state => ({
    signup: state.signup
});

export default connect(mapState2props)(SuccessRegistration);
