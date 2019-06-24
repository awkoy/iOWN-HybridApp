import React from "react";
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import {Link} from "react-router-dom";
import Typography from '@material-ui/core/Typography';
import QRCode from "qrcode.react";
import CopyIcon from '@material-ui/icons/FileCopy';
import {connect} from "react-redux";
import Snackbar from '@material-ui/core/Snackbar';

class SuccessRegistration extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            openAlert: false
        }
    }

    copy = text => {
        const textField = document.createElement('textarea')
        textField.innerText = text;
        document.body.appendChild(textField)
        textField.select()
        document.execCommand('copy')
        textField.remove()
        this.setState({openAlert: true})
    }

    handleCloseAlert = () => this.setState({openAlert: false});

    render () {
        const {walletAddress} = this.props.signup;
        const {openAlert} = this.state;
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
                    <CopyIcon onClick={() => this.copy(walletAddress)} />
                </span>
                <Link to="/dashboard">
                    <Button color="primary" className="register__btn" fullWidth variant="contained">
                        Next
                    </Button>
                </Link>

                <Snackbar
                    anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                    key={`copyboard alert`}
                    open={openAlert}
                    onClose={this.handleCloseAlert}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={"Address copied!"}
                />
            </Container>
        );
    }
};

const mapState2props = state => ({
    signup: state.signup
});

export default connect(mapState2props)(SuccessRegistration);
