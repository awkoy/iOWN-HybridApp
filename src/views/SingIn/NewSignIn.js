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
    loginWithEmail,
    mnemonicError,
    resetSignIn,
    changeWholeMnemonic
} from "../../ducks/signin";

class NewSignIn extends React.Component {
    
    constructor(props) {
        super(props)

        this.state = {
            mnemonicLoader: false
        }
    }

    submitLoginEmail = async () => {
        const {
            email,
            password
        } = this.props.formValues;

        await this.props.loginWithEmail({email, password});
    }

    checkMnemonic = async () => {
        const { password } = this.props.formValues;
        const { walletAddress } = this.props.signin;
        
        const mnemonicString = this.props.signin.loginMnemonic.value.join(' ');
        const { address: newWalletAddress, privateKey: pvkey } = await EtherUtil.accessWalletByMnemonic(mnemonicString);

        if(!newWalletAddress) { return this.props.mnemonicError("This wallet not found")}

        const isConfirm = newWalletAddress === walletAddress;

        console.log(newWalletAddress, walletAddress, isConfirm)

        if (!isConfirm) {
            return this.props.mnemonicError("This wallet not match with your account wallet");
        } else {
            localStorage.setItem("wallet-private-key", pvkey);
            localStorage.setItem("wallet-password", password);
            this.props.resetSignIn();
            history.push("/dashboard");
        }
    }

    onChangeMnemonic = (value, index) => (value.trim().split(" ").length === 12)
        ? this.props.changeWholeMnemonic(value) : this.props.changeLoginMnemonic(value, index);
    
    render() {
        const { loginMnemonic, failed, error, activeStep, submitEnabled, submitLoading } = this.props.signin;
        const { formValid } = this.props;
        const {mnemonicLoader} = this.state;

        return (
            <>
                {activeStep === 1 && <Box>
                    <SingInNewForm />
                    <Button className="register__btn" onClick={this.submitLoginEmail} fullWidth variant="contained" disabled={!formValid} color="primary">
                        {!submitLoading ? 'Login' : <CircularProgress size={23}/>}
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
                        onChange={this.onChangeMnemonic}
                    />
                    <Button className="register__btn" onClick={this.checkMnemonic}  fullWidth variant="contained" color="primary">
                        {!mnemonicLoader ? 'Submit' : <CircularProgress size={23}/>}
                    </Button>
                    {/* disabled={submitEnabled} */}
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
    loginWithEmail,
    mnemonicError,
    resetSignIn,
    changeWholeMnemonic
};

export default connect(mapState2props, mapDispatch2props)(NewSignIn);
