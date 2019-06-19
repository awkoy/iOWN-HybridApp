import React from "react";
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

import {ROUTE_SIGNUP, ROUTE_SIGNIN} from "../../constants/routes";

const useStyles = makeStyles(theme => ({
    button: {
      marginBottom: theme.spacing(2)
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
  }));

const Home = () => {
    const classes = useStyles();
    return (
        <Container className="home" component="main" maxWidth="xs">
            <Box pt={20}>
                <Link to={ROUTE_SIGNIN}>
                    <Button fullWidth variant="contained" color="primary" className={classes.button}>
                        Login
                    </Button>
                </Link>
                <Link to={ROUTE_SIGNUP}>
                    <Button fullWidth variant="contained" color="primary" className={classes.button}>
                        Create new wallet
                    </Button>
                </Link>
            </Box>

            <Box className="home__bottom">
                <Link to="/about">
                    <Button fullWidth color="primary">
                        About iOWN
                    </Button>
                </Link>
                <Link to="/private-policy">
                    <Button color="primary" className={classes.button}>
                        Private Policy
                    </Button>
                </Link>
                <Link to="/cookies-policy">
                    <Button color="primary" className={classes.button}>
                        Cookie Policy
                    </Button>
                </Link>
            </Box>
        </Container>
        
    );
};

export default Home;
