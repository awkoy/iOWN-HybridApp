import React from "react";
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {connect} from "react-redux";
import Box from '@material-ui/core/Box';
import Mnemonic from "../../components/mnemonic/Mnemonic";
import SingInNewForm from "../../components/Forms/SingInNew";
import { Link } from 'react-router-dom';
import {ROUTE_SIGNUP} from "../../constants/routes";

import {
    getFormValues,
    isValid
  } from 'redux-form';

import EtherUtil from "../../utils/ethers";

import {
    changeLoginPassword,
    changeLoginMnemonic,
    walletNotFound,
    loginWithWallet,
    loginWithEmail
} from "../../ducks/signin";

class SignIn extends React.Component {

    handleChangePassword = event => {
        this.props.changeLoginPassword(event.target.value);
    };

    submitLoginEmail = async () => {
        const {
            email,
            password
        } = this.props.formValuesNew;

        await this.props.loginWithEmail({email, password});
    }

    submitLoginWallet = async () => {
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

        await this.props.loginWithWallet(wallet, walletPassword);
    };

    onMnemonicLoginClick = async () => {
        const mnemonicString = this.props.signin.loginMnemonic.value.join(' ');
        const wallet = await EtherUtil.accessWalletByMnemonic(mnemonicString);
        if (!wallet) {
            return this.props.walletNotFound();
        }

        await this.props.login(wallet);
    }

    goBack = () => this.props.history.goBack();
    
    render() {
        const { password, submitEnabled, submitLoading, walletPassword, loginMnemonic, failed, error } = this.props.signin;
        const {formValidNew} = this.props;

        return (
            <Container component="main" maxWidth="xs">
                <Typography variant="h5" align="center" gutterBottom>
                    Login
                </Typography>

                {/* {walletPassword && <Box>
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
                    <Button className="register__btn" onClick={this.submitLoginWallet} fullWidth variant="contained" disabled={!submitEnabled} color="primary">
                        {submitLoading ?
                            <CircularProgress disableShrink /> :
                            <> 
                                Login
                            </>
                        }
                    </Button>
                    <Box pt={2}>
                        <Button onClick={this.goBack} fullWidth variant="contained" color="primary">
                            Back
                        </Button>
                    </Box>
                </Box>} */}

                {<Box>
                    <SingInNewForm />
                    {formValidNew}
                    <Button className="register__btn" onClick={this.submitLoginEmail} fullWidth variant="contained" disabled={!formValidNew} color="primary">
                        Login
                    </Button>
                    <Typography variant="subtitle1" align="center" gutterBottom>
                        Or
                    </Typography>
                    <Link to={ROUTE_SIGNUP}>
                        <Button fullWidth variant="contained" color="primary">
                            Create a new wallet
                        </Button>
                    </Link>
                </Box>}

                {/* {!walletPassword && <Box>
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
                                Submit
                            </>
                        }
                    </Button>
                </Box>} */}
                
                <div className="register__error">
                    {failed && `${error}`}
                </div>
            </Container>
        );
    }
};

const mapState2props = state => ({
    signin: state.signin,
    formValuesNew: getFormValues('signin-new')(state),
    formValidNew: isValid('signin-new')(state),
});

const mapDispatch2props = {
    changeLoginPassword,
    changeLoginMnemonic,
    walletNotFound,
    loginWithWallet,
    loginWithEmail
};

export default connect(mapState2props, mapDispatch2props)(SignIn);
