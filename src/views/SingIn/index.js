import React from "react";
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {connect} from "react-redux";
import Box from '@material-ui/core/Box';
import Mnemonic from "../../components/mnemonic/Mnemonic";

import EtherUtil from "../../utils/ethers";

import {
    changeLoginPassword,
    changeLoginMnemonic,
    walletNotFound,
    login
} from "../../ducks/signin";

class SignIn extends React.Component {

    handleChangePassword = event => {
        this.props.changeLoginPassword(event.target.value);
    };

    passwordLogin = async () => {
        const {
            walletPassword,
            walletJson
        } = this.props.signin;

        const json = JSON.stringify(walletJson);
        const key = localStorage.getItem("wallet-private-key");

        const wallet = await EtherUtil.accessWalletByPrivateKey(key);

        console.log(wallet)

        if (!wallet) {
            return this.props.walletNotFound();
        }

        await this.props.login(wallet, walletPassword);
    };

    onMnemonicLoginClick = async () => {
        const mnemonicString = this.props.signin.loginMnemonic.value.join(' ');
        const wallet = await EtherUtil.accessWalletByMnemonic(mnemonicString);
        if (!wallet) {
            return this.props.walletNotFound();
        }

        await this.props.login(wallet);
    }

    render() {
        const { password, submitEnabled, submitLoading, walletPassword, loginMnemonic, failed, error } = this.props.signin;

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
                    <Button className="register__btn" onClick={this.passwordLogin} fullWidth variant="contained" disabled={!submitEnabled} color="primary">
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
                        mnemonic={loginMnemonic.value}
                        onChange={this.props.changeLoginMnemonic}
                    />
                    <Button className="register__btn" onClick={this.onMnemonicLoginClick} fullWidth variant="contained" disabled={!submitEnabled} color="primary">
                        {submitLoading ?
                            <CircularProgress disableShrink /> :
                            <> 
                                Login
                            </>
                        }
                    </Button>
                </Box>}
                <div className="register__error">
                    {failed && `${error}`}
                </div>
            </Container>
        );
    }
};

const mapState2props = state => ({
    signin: state.signin
});

const mapDispatch2props = {
    changeLoginPassword,
    changeLoginMnemonic,
    walletNotFound,
    login
};

export default connect(mapState2props, mapDispatch2props)(SignIn);
