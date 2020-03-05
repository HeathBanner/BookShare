import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import {
    fetchLogin,
    fetchRegister,
    initInfo,
    initNotify
} from './Services/AuthServices';

import Login from './Login';
import Register from './Register';
import Notify from '../Notifications/Notify';

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
        width: '70%'
    },
}));

export default ({ auth, handleClose }) => {

    const classes = useStyles();
    const dispatch = useDispatch();

    const [mode, setMode] = useState(0);
    const [info, setInfo] = useState({ ...initInfo });
    const [notify, setNotify] = useState({ ...initNotify });

    const handleChange = (event, value) => setMode(value);

    const handleInput = (mode, type) => event => {
        if (type === "Visible") return setInfo({ ...info, Visible: !info.Visible }); 
        setInfo({ ...info, [type]: event.target.value });
    };

    const handleSubmit = async (mode) => {
        let result;

        if (mode === "login") result = await fetchLogin(info);
        if (mode === "register") result = await fetchRegister(info);

        if (result.error) return setNotify({ ...notify, ...result });
        if (result.success && mode === "register") {
            return setNotify({ ...notify, ...result });
        }
        if (result.success) {
            dispatch({
                type: "LOGIN",
                payload: result.payload
            });
            handleClose();
        }
    };

    const handleNotify = () => {
        if (notify.success) setInfo({ ...initInfo });
        setNotify({ ...initNotify });
    };

    const renderAuth = () => {
        if (mode === 0) {
            return <Login
                login={info}
                handleInput={handleInput}
                handleSubmit={handleSubmit}
            />;
        }

        return <Register
            register={info}
            handleInput={handleInput}
            handleSubmit={handleSubmit}
        />;
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

                {renderAuth()}

                <Notify
                    notification={notify}
                    handleClose={handleNotify}
                />
            </Paper>

        </Modal>
    );
};
