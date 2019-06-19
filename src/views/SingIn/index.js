import React from "react";
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {connect} from "react-redux";

//import {
//} from "../../ducks/signin";

class SignIn extends React.Component {

    handleChangePassword = event => {
        //this.props.changePassword(event.target.value);
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
        const { password } = this.props.signin;

        return (
            <Container component="main" maxWidth="xs">
                <Typography variant="h5" align="center" gutterBottom>
                    Login
                </Typography>
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
            </Container>
        );
    }
};

const mapState2props = state => ({
    signin: {
        password: "",
        walletAddress: ""
    }
});

const mapDispatch2props = {
    
};

export default connect(mapState2props, mapDispatch2props)(SignIn);
