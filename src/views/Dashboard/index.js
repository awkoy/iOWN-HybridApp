import React from "react";
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import QRCode from "qrcode.react";
import DotsIcon from '@material-ui/icons/MoreVert';
import Snackbar from '@material-ui/core/Snackbar';
import {connect} from "react-redux";
import { Link } from 'react-router-dom';
import TransactionsTable from '../../components/Table';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

class Dashboard extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            openAlert: false,
            currentTab: 0
        }
    }

    copy = text => {
        const textField = document.createElement('textarea');
        textField.innerText = text;
        document.body.appendChild(textField);
        textField.select();
        document.execCommand('copy');
        textField.remove();
        this.setState({
            openAlert: true
        });
    }
    handleCloseAlert = () => this.setState({openAlert: false});

    handleTabChange = (e, currentTab) => this.setState({currentTab});

    render () {
        const {walletAddress} = this.props.signup;
        const {openAlert, currentTab} = this.state;
        return (
            <Container className="home dashboard" component="main" maxWidth="xs">
                <Fab className="dashboard__menu-btn">
                    <DotsIcon />
                </Fab>
                <Typography variant="subtitle2" align="center" gutterBottom>
                    youremail@mail.com
                </Typography>
                {currentTab === 0 &&
                    <Box className="dashboard__actions" align="left" pt={3}>
                        <Typography variant="h5" align="left" gutterBottom>
                            100 iOWN
                        </Typography>
                        <Link to="/coming-soon">
                            <Button color="primary" variant="contained">
                                Send
                            </Button>
                        </Link>
                    </Box>
                }
                {currentTab === 1 &&
                    <Box className="dashboard__actions" align="left" pt={3}>
                        <Typography variant="h5" align="left" gutterBottom>
                            100 ETH
                        </Typography>
                        <Link to="/coming-soon">
                            <Button color="primary" variant="contained">
                                Send
                            </Button>
                        </Link>
                    </Box>
                }
                <Tabs
                    value={currentTab}
                    onChange={this.handleTabChange}
                    indicatorColor="primary"
                    textColor="primary"
                    centered >
                        <Tab label="iOWN" />
                        <Tab label="Ethereum" />
                </Tabs>
                <Box className="dashboard__adress" align="left" pt={3}>
                    <QRCode size={50} value={"0x36d4568A4F8E64F3501CAE1C7b034bBb5ba27D70"} />
                    <Box className="dashboard__adress__container" pl={2}>
                        <Box mb={1}>Your public iOWN address</Box>
                        <div onClick={() => this.copy("0x36d4568A4F8E64F3501CAE1C7b034bBb5ba27D70")} className="copy__code__text">
                            <b>{"0x36d4568A4F8E64F3501CAE1C7b034bBb5ba27D70"}</b> 
                        </div>
                    </Box>
                </Box>
                <Box pt={4}>
                    <Link to="/coming-soon">
                        <Button color="primary" variant="contained">
                            Refresh
                        </Button>
                    </Link>
                </Box>
                

                <TransactionsTable />

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
    signup: state.signup
});

export default connect(mapState2props)(Dashboard);
