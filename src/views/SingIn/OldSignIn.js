import React from "react";
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import {connect} from "react-redux";
import Box from '@material-ui/core/Box';
import SignInOldForm from "../../components/Forms/SignInOld";
import history from '../../history';

import {
    getFormValues,
    isValid
  } from 'redux-form';

import EtherUtil from "../../utils/ethers";

import {
    walletNotFound,
    loginWithWallet,
} from "../../ducks/signin";

class OldSignIn extends React.Component {

    submitLoginWallet = async () => {
        const { password } = this.props.formValues;
        const key = localStorage.getItem("wallet-private-key");

        const wallet = await EtherUtil.accessWalletByPrivateKey(key);

        if (!wallet) {
            return this.props.walletNotFound();
        }

        await this.props.loginWithWallet(wallet, password);
    };

    goBack = () => history.goBack();
    
    render() {
        const { failed, error, } = this.props.signin;
        const { formValid } = this.props;

        return (
            <Container component="main" maxWidth="xs">

                <SignInOldForm />
                <Button className="register__btn" onClick={this.submitLoginWallet} fullWidth variant="contained" disabled={!formValid} color="primary">
                    Login
                </Button>
                <div className="register__error">
                    {failed && `${error}`}
                </div>

                <Box pt={2}>
                    <Button onClick={this.goBack} fullWidth variant="contained" color="primary">
                        Back
                    </Button>
                </Box>
            </Container>
        );
    }
};

const mapState2props = state => ({
    signin: state.signin,
    formValues: getFormValues('signin-old')(state),
    formValid: isValid('signin-old')(state),
});

const mapDispatch2props = {
    walletNotFound,
    loginWithWallet
};

export default connect(mapState2props, mapDispatch2props)(OldSignIn);
