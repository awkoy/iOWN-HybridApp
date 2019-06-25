import Box from '@material-ui/core/Box';
import React from "react";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const Balance = () => {
    const [tab, setTab] = React.useState(0);

    const handleTabChange = (e, val) => setTab(val);
    return (
        <>
            {tab === 0 &&
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
            {tab === 1 &&
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
                value={tab}
                onChange={handleTabChange}
                indicatorColor="primary"
                textColor="primary"
                centered >
                    <Tab label="iOWN" />
                    <Tab label="Ethereum" />
            </Tabs>
        </>
    )
};

export default Balance;