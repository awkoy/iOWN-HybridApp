import React from "react";
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import QRCode from "qrcode.react";
import CopyIcon from '@material-ui/icons/FileCopy';
import {connect} from "react-redux";

class Dashboard extends React.Component {

    render () {
        const {walletAddress} = this.props.signup;
        return (
            <Container className="home" component="main" maxWidth="xs">
                <Typography variant="h5" align="center" gutterBottom>
                    Dashboard
                </Typography>
                <Box align="center" pt={5}>
                    <QRCode value={walletAddress} />
                </Box>
                <span className="copy__code">
                    <div className="copy__code__text">
                        {walletAddress}
                    </div>
                </span>
            </Container>
        );
    }
};

const mapState2props = state => ({
    signup: state.signup
});

export default connect(mapState2props)(Dashboard);
