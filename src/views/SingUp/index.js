import React from "react";
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import MobileStepper from '@material-ui/core/MobileStepper';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import InputMask from 'react-input-mask';
import {connect} from "react-redux";

import {
    changeCurrentStep,
    changeStartInfo,
    changePassword,
    changeConfirm,
    registerAccount
} from "../../ducks/signup";

class SignUp extends React.Component {

    nextStep = () => this.props.changeCurrentStep(this.props.signup.activeStep + 1)
    prevStep = () => this.props.changeCurrentStep(this.props.signup.activeStep - 1) 

    handleChange = name => event => {
        this.props.changeStartInfo({
            name,
            value: event.target.value
        });
    };

    handleChangePassword = event => {
        this.props.changePassword(event.target.value);
    };

    handleChangeConfirm = event => {
        this.props.changeConfirm(event.target.value);
    };

    createAccount = () => {
        const {
            fullName,
            phone,
            email,
            password
        } = this.props.signup;

        this.props.registerAccount({
            fullName: fullName.value,
            phone: phone.value,
            email: email.value,
            password: password.value
        })
    };

    render() {
        const { activeStep, fullName, email, phone, password, confirm, submitEnabled, submitLoading, serverError } = this.props.signup;

        return (
            <Container component="main" maxWidth="xs">
                {activeStep === 0 && 
                    <Box mb={5}>
                        <Typography variant="h5" align="center" gutterBottom>
                            Create new wallet
                        </Typography>
                        <TextField
                            required
                            fullWidth
                            label="Full Name"
                            value={fullName.value}
                            onChange={this.handleChange('fullName')}
                            error={fullName.error}
                            helperText={fullName.helperText}
                            margin="normal"
                        />
                        <TextField
                            required
                            fullWidth
                            type="email"
                            label="Email Address"
                            value={email.value}
                            onChange={this.handleChange('email')}
                            error={email.error}
                            helperText={email.helperText}
                            margin="normal"
                        />
                        <InputMask
                            mask="+999999999999"
                            type="phone"
                            maskChar=" "
                            onChange={this.handleChange('phone')}
                            value={phone.value}
                            error={phone.error}
                            helperText={phone.helperText}
                            >
                            {() => <TextField
                                required
                                fullWidth
                                label="Phone Number"
                                margin="normal"
                            />}
                        </InputMask>
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
                        <TextField
                            required
                            fullWidth
                            type="password"
                            label="Password Confirm"
                            value={confirm.value}
                            onChange={this.handleChangeConfirm}
                            margin="normal"
                            error={confirm.error}
                            helperText={confirm.helperText}
                        />
                        <Button className="register__btn" fullWidth variant="contained" disabled={!submitEnabled} color="primary" onClick={this.createAccount}>
                            {submitLoading ?
                                <CircularProgress disableShrink /> :
                                <> 
                                    Create
                                    <KeyboardArrowRight />
                                </>
                            }
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
                        <Button size="small" onClick={this.nextStep} disabled={activeStep === 1}>
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
});

const mapDispatch2props = {
    changeCurrentStep,
    changeStartInfo,
    changePassword,
    changeConfirm,
    registerAccount
};

export default connect(mapState2props, mapDispatch2props)(SignUp);
