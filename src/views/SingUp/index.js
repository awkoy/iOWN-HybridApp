import React from "react";
import Container from '@material-ui/core/Container';
import MobileStepper from '@material-ui/core/MobileStepper';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import {connect} from "react-redux";
import ReCAPTCHA from "react-google-recaptcha";
import SignUpStartForm from "../../components/Forms/SignUpStart";
import SignUpEndForm from "../../components/Forms/SignUpEnd";
import history from '../../history';

import {
    getFormValues,
    isValid
  } from 'redux-form';

import {
    changeCurrentStep,
    changeStartInfo,
    changePassword,
    changeConfirm,
    registerAccount
} from "../../ducks/signup";

class SignUp extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            captcha: false
        }
    }

    nextStep = () => this.props.changeCurrentStep(this.props.signup.activeStep + 1)
    prevStep = () => this.props.changeCurrentStep(this.props.signup.activeStep - 1) 
    onCaptchaChange = captcha => this.setState({captcha});

    toCreateAccount = () => history.push("/create-wallet");

    render() {
        const { 
            activeStep, 
            submitLoading, 
            serverError 
        } = this.props.signup;

        const {startFormValid, endFormValid} = this.props;

        const {captcha} = this.state;

        return (
            <Container component="main" maxWidth="xs">
                {activeStep === 0 && 
                    <Box mb={5}>
                        <Typography variant="h5" align="center" gutterBottom>
                            Create new wallet
                        </Typography>
                        <SignUpStartForm />
                        <Box pt={4}>
                            {/* <ReCAPTCHA
                                sitekey={"6Lep4KkUAAAAAELJE5-uSfnYP6Xr_0Ik2YRs3OSU"}
                                onChange={this.onCaptchaChange}
                            /> */}
                        </Box>
                    </Box>
                }
    
                {activeStep === 1 && 
                    <Box mb={5}>
                        <Typography variant="h5" align="center" gutterBottom>
                            Confirm your password
                        </Typography>
                        <Typography variant="subtitle2" align="center" gutterBottom>
                            Note, that if you lose your password you won’t be able to recover it because it is used to decrypt Private Key.
                        </Typography>
                        <SignUpEndForm currentPassword={this.props.startFormValues} />
                        <Button className="register__btn" fullWidth variant="contained" disabled={!startFormValid || !endFormValid} color="primary" onClick={this.toCreateAccount}>
                            Create
                        </Button>
                        <div className="register__error">
                            {`${serverError}`}
                        </div>
                    </Box>
                }
            
                <MobileStepper
                    variant="progress"
                    steps={2}
                    position="bottom"
                    activeStep={activeStep}
                    nextButton={
                        <Button size="small" onClick={this.nextStep} disabled={activeStep === 1 || !startFormValid}>
                            Next
                            <KeyboardArrowRight />
                        </Button>
                    }
                    backButton={
                        <Button size="small" onClick={activeStep === 0 ? () => this.props.history.goBack() : this.prevStep}>
                            <KeyboardArrowLeft />
                            Back
                        </Button>
                    }
                />
            </Container>
        );
    }
};

const mapState2props = state => ({
    signup: state.signup,
    startFormValues: getFormValues('signup-start')(state),
    startFormValid: isValid('signup-start')(state),
    endFormValues: getFormValues('signup-end')(state),
    endFormValid: isValid('signup-end')(state),
});

const mapDispatch2props = {
    changeCurrentStep,
    changeStartInfo,
    changePassword,
    changeConfirm,
    registerAccount
};

export default connect(mapState2props, mapDispatch2props)(SignUp);
