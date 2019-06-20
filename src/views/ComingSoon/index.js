import React from "react"
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

const ComingSoon = (props) => {
    return (
        <Container component="main" className="coming-soon" maxWidth="xs">
            <Typography align="center" variant="h5">Coming soon...</Typography>
            <Button color="primary" onClick={() => props.history.goBack()} className="register__btn" fullWidth variant="contained">Back</Button>
        </Container>
    )
}

export default ComingSoon;