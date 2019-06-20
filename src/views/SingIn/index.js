import React from "react";
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {connect} from "react-redux";
import Box from '@material-ui/core/Box';
import Mnemonic from "../../components/mnemonic/Mnemonic";

import {
    changeLoginPassword
} from "../../ducks/signin";

class SignIn extends React.Component {

    handleChangePassword = event => {
        this.props.changeLoginPassword(event.target.value);
    };

    login = () => {
        const {
            password,
            walletAddress
        } = this.props.signin;

        this.props.registerAccount({
            walletAddress,
            password: password.value
        })
    };

    render() {
        const { password, submitEnabled, submitLoading, walletPassword, mnemonic } = this.props.signin;

        return (
            <Container component="main" maxWidth="xs">
                <Typography variant="h5" align="center" gutterBottom>
                    Login
                </Typography>

                {walletPassword && <Box>
                    <TextField
                        required
                        fullWidth
                        type="password"
                        label="Password"
                        value={password.value}
                        onChange={this.handleChangePassword}
                        margin="normal"
                        error={password.error}
                        helperText={password.helperText}
                    />
                    <Button className="register__btn" fullWidth variant="contained" disabled={!submitEnabled} color="primary">
                        {submitLoading ?
                            <CircularProgress disableShrink /> :
                            <> 
                                Login
                            </>
                        }
                    </Button>
                </Box>}

                {!walletPassword && <Box>
                    <Mnemonic
                        editable
                        fullEditable
                        mnemonic={mnemonic.value}
                        onChange={this.props.changeMnemonic}
                    />
                    <Button className="register__btn" fullWidth variant="contained" disabled={!submitEnabled} color="primary">
                        {submitLoading ?
                            <CircularProgress disableShrink /> :
                            <> 
                                Login
                            </>
                        }
                    </Button>
                </Box>}
            </Container>
        );
    }
};

const mapState2props = state => ({
    signin: state.signin
});

const mapDispatch2props = {
    changeLoginPassword
};

export default connect(mapState2props, mapDispatch2props)(SignIn);
