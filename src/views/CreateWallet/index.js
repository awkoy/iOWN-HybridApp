import React from "react";
import {connect} from "react-redux";
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Mnemonic from "../../components/mnemonic/Mnemonic";
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';
import EtherUtil from "../../utils/ethers";
import history from '../../history';

import {
    generateMnemonic,
    enableNextMnemonicStep,
    changeMnemonicConfirm,
    handleCreateWallet,
    registerAccount
} from "../../ducks/signup";

import {
    getFormValues,
    isValid
} from 'redux-form';

import CircularProgress from '@material-ui/core/CircularProgress';

class CreateWallet extends React.Component {

    constructor(props) {
        super(props)

        this.props.generateMnemonic();

        this.state = {
            openAlert: false,
            loading: false,
        }
    }

    goNextStep = () => {
        const {mnemonicConfirm} = this.props.signup;
        const enabledIndexes = [];
        let counter = 0;
        let newMnemonicConfirm;
        while (counter !== 3) {
            newMnemonicConfirm = mnemonicConfirm.map((i, j) => (Math.random() <= 0.5 && (counter !== 3)) ? (counter++, enabledIndexes.push(j), "") : i);
        }
        this.props.enableNextMnemonicStep(newMnemonicConfirm, enabledIndexes)
    }

    createWallet = async () => {
        const {mnemonic, mnemonicRaw, mnemonicConfirm} = this.props.signup;
        const {
            fullName,
            phone,
            email
        } = this.props.startFormValues;
        const {
            password
        } = this.props.endFormValues;

        const isValid = mnemonic.every((i, j) => i === mnemonicConfirm[j])

        if (isValid) {
            this.setState({loading: true});
            const wallet = await EtherUtil.createFromMnemonic(mnemonicRaw);

            localStorage.setItem("wallet-private-key", wallet.privateKey);
            localStorage.setItem("wallet-password", password);

            await this.props.registerAccount({
                fullName,
                phone,
                email,
                password,
                wallet: wallet.address
            })
            this.setState({loading: false});
            history.push("/success-registration");
        } else {
            this.setState({openAlert: true})
        }
    }

    handleCloseAlert = () => this.setState({openAlert: false})

    render() {
        const {mnemonic, mnemonicRaw, mnemonicNext, mnemonicConfirm, enabledIndexes, serverError} = this.props.signup;
        const { openAlert, loading } = this.state;

        return (
            <Container component="main" maxWidth="xs">
                {!mnemonicNext &&
                    <>
                        <Typography variant="subtitle1" align="center" gutterBottom>
                            Save this phrases for login
                        </Typography>
                        {
                            mnemonicRaw ?
                            <Mnemonic mnemonic={mnemonic}/> 
                            :
                            <div className="loader">
                                <CircularProgress/>
                            </div>
                        }  

                        <Button color="primary" className="register__btn" onClick={this.goNextStep} fullWidth variant="contained">
                            Next
                        </Button>
                    </>
                }

                {mnemonicNext &&
                    <>
                        <Typography variant="subtitle1" align="center" gutterBottom>
                            Please confirm your passphrase
                        </Typography>
                        {
                            <Mnemonic
                                editable
                                mnemonic={mnemonicConfirm}
                                enabledIndexes={enabledIndexes}
                                onChange={this.props.changeMnemonicConfirm}
                            />
                        }  

                        <Button color="primary" className="register__btn" onClick={this.createWallet} fullWidth variant="contained">
                            {loading ? <CircularProgress/> : "Confirm"}
                        </Button>
                    </>
                }

                <div className="register__error">
                    {`${serverError}`}
                </div>

                <Snackbar
                    anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                    key={`passphrase alert`}
                    open={openAlert}
                    onClose={this.handleCloseAlert}
                    variant="error"
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={"Warning! Incorrect passphrase"}
                />
            </Container>
        );
    }
};

const mapState2props = state => ({
    signup: state.signup,
    startFormValues: getFormValues('signup-start')(state),
    endFormValues: getFormValues('signup-end')(state),
});

const mapDispatch2props = {
    generateMnemonic,
    enableNextMnemonicStep,
    changeMnemonicConfirm,
    handleCreateWallet,
    registerAccount
};

export default connect(mapState2props, mapDispatch2props)(CreateWallet);
