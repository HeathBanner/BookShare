import React, { useState } from 'react';

import Login from './Login';
import Register from './Register';

import { makeStyles } from '@material-ui/styles';
import {
    Paper,
    Tabs,
    Tab,
    Modal
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
    paper: {
        position: 'fixed',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        display: 'flex',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
        padding: '0% 10% 5% 10%',
        width: '90%'
    },
}));

export default ({ auth, handleClose }) => {

    const classes = useStyles();

    const [mode, setMode] = useState(0);

    const handleChange = (event, value) => setMode(value);

    const renderAuth = () => {
        if (mode === 0) return <Login />;

        return <Register />;
    };

    return (
        <Modal
            aria-labelledby="Authentication Menu"
            aria-describedby="Menu for Login and Register"
            open={auth}
            onClose={handleClose}
        >
            <Paper className={classes.paper}>
                <Tabs
                    value={mode}
                    onChange={handleChange}
                >
                    <Tab label="Login" />
                    <Tab label="Register" />
                </Tabs>

                { renderAuth() }
            </Paper>
        </Modal>
    );
};
