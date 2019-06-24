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
import history from '../../history';

import {
    getFormValues,
    isValid
  } from 'redux-form';

import EtherUtil from "../../utils/ethers";

import {
    changeLoginMnemonic,
    walletNotFound,
    loginWithEmail
} from "../../ducks/signin";

class NewSignIn extends React.Component {

    submitLoginEmail = async () => {
        const {
            email,
            password
        } = this.props.formValues;

        await this.props.loginWithEmail({email, password});
    }

    checkMnemonic = async () => {
        const mnemonicString = this.props.signin.loginMnemonic.value.join(' ');
        const { address: newWalletAddress } = await EtherUtil.accessWalletByMnemonic(mnemonicString);
        const key = localStorage.getItem("wallet-private-key");
        const { address: oldWalletAddress } = await EtherUtil.accessWalletByPrivateKey(key);

        const isConfirm = newWalletAddress === oldWalletAddress;

        if (!isConfirm) {
            return this.props.walletNotFound();
        }

        history.push("/dashboard");
    }

    goBack = () => this.props.history.goBack();
    
    render() {
        const { loginMnemonic, failed, error, activeStep, submitEnabled } = this.props.signin;
        const { formValid } = this.props;

        return (
            <>
                {activeStep === 1 && <Box>
                    <SingInNewForm />
                    <Button className="register__btn" onClick={this.submitLoginEmail} fullWidth variant="contained" disabled={!formValid} color="primary">
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

                {activeStep === 2 && <Box>
                    <Mnemonic
                        editable
                        fullEditable
                        mnemonic={loginMnemonic.value}
                        onChange={this.props.changeLoginMnemonic}
                    />
                    <Button className="register__btn" onClick={this.checkMnemonic} disabled={submitEnabled} fullWidth variant="contained" color="primary">
                        Submit
                    </Button>
                </Box>}
                
                <div className="register__error">
                    {failed && `${error}`}
                </div>
            </>
        );
    }
};

const mapState2props = state => ({
    signin: state.signin,
    formValues: getFormValues('signin-new')(state),
    formValid: isValid('signin-new')(state),
});

const mapDispatch2props = {
    changeLoginMnemonic,
    walletNotFound,
    loginWithEmail
};

export default connect(mapState2props, mapDispatch2props)(NewSignIn);
