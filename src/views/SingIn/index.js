import React from "react";
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import NewSignIn from './NewSignIn';
import OldSignIn from './OldSignIn';


class SignIn extends React.Component {
    
    render() {
        const isNewUser = !localStorage.getItem("wallet-password");
        return (
            <Container component="main" maxWidth="xs">
                <Typography variant="h5" align="center" gutterBottom>
                    Login
                </Typography>

                {isNewUser ? <NewSignIn /> : <OldSignIn />}
            </Container>
        );
    }
};

export default SignIn;
