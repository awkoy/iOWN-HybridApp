import React from "react";
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import DotsIcon from '@material-ui/icons/MoreVert';
import Snackbar from '@material-ui/core/Snackbar';
import {connect} from "react-redux";
import { Link } from 'react-router-dom';
import TransactionsTable from '../../components/Table';
import CircularProgress from '@material-ui/core/CircularProgress';
import Drawer from '@material-ui/core/Drawer';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import SettingsIcon from '@material-ui/icons/Settings';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import Address from "./Address";
import Balance from "./Balance";

import {getUserInfo} from "../../ducks/dashboard";

class Dashboard extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            openAlert: false,
            currentTab: 0,
            menuOpened: false
        }

        this.props.getUserInfo()

    }

    toggleMenu = val => this.setState({menuOpened: val})

    handleCloseAlert = () => this.setState({openAlert: false});
    handleTabChange = (e, currentTab) => this.setState({currentTab});

    render () {
        const {userInfo: {
            email, phone, fullName, wallet
        }, userInfoLoaded} = this.props.dashboard;

        const {openAlert, currentTab} = this.state;
        return (
            <Container className="home dashboard" component="main" maxWidth="xs">
                <Fab onClick={() => this.toggleMenu(true)} className="dashboard__menu-btn">
                    <DotsIcon />
                </Fab>

                {userInfoLoaded ? <CircularProgress /> : 
                <Typography variant="subtitle2" align="center" gutterBottom>
                    {email}
                </Typography>}
                
                
                <Balance />

                {userInfoLoaded ? <CircularProgress /> : <Address address={wallet} />}
                
                <Box pt={4} className="dashboard__actions">
                    <Button color="primary" variant="contained">
                        Refresh
                    </Button>

                    <Button color="primary" variant="contained">
                        Recieve
                    </Button>
                </Box>
                
                <TransactionsTable />

                <Drawer anchor="right" open={this.state.menuOpened} onClose={() => this.toggleMenu(false)}>
                    <Link to="/edit-account">
                        <ListItem button>
                            <ListItemIcon><SettingsIcon /></ListItemIcon>
                            <ListItemText primary={"Edit Account"} />
                        </ListItem>
                    </Link>
                    <Link to="/edit-password">
                        <ListItem button>
                            <ListItemIcon><LockOpenIcon /></ListItemIcon>
                            <ListItemText primary={"Edit Password"} />
                        </ListItem>
                    </Link>
                    <Link to="/">
                        <ListItem button>
                            <ListItemIcon><ExitToAppIcon /></ListItemIcon>
                            <ListItemText primary={"Logout"} />
                        </ListItem>
                    </Link>
                </Drawer>

                <Snackbar
                    anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                    key={`dashboard alert`}
                    open={openAlert}
                    onClose={this.handleCloseAlert}
                    variant="error"
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={"Address copied!"}
                />
            </Container>
        );
    }
};

const mapState2props = state => ({
    dashboard: state.dashboard
});

const mapDispatch2props = {
    getUserInfo
};

export default connect(mapState2props, mapDispatch2props)(Dashboard);
