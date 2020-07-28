import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import Login from '../../components/Auth/Login';
import Register from '../../components/Auth/Register';
import { initInfo } from '../../components/Auth/Services/AuthServices';

import { makeStyles, useTheme } from '@material-ui/styles';
import {
    Grid,
    Paper,
    Tabs,
    Tab,
    Modal,
    Button
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
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
        padding: '0% 5% 2% 5%',
        [theme.breakpoints.up('lg')]: {
            width: '25%',
        },
        [theme.breakpoints.down('md')]: {
        },
        [theme.breakpoints.down('xs')]: {
            padding: '0% 10% 5% 10%',
            width: '70%'
        }
    },
    forgotPassword: {
        marginTop: 10,
        padding: 10
    }
}));

export default ({ auth, handleClose, history }) => {

    const classes = useStyles();
    const dispatch = useDispatch();

    const [mode, setMode] = useState(0);
    const [info, setInfo] = useState({ ...initInfo });

    const handleChange = (event, value) => {
        try {
            setMode(value);
        } catch (error) {
            dispatch({ type: "ERROR_NOTIFY", payload: "Something went wrong :(" });
        }
    };

    const handleInput = (mode, type) => event => {
        try {
            if (type === "Visible") return setInfo({ ...info, Visible: !info.Visible }); 
            setInfo({ ...info, [type]: event.target.value });
        } catch (error) {
            dispatch({ type: "ERROR_NOTIFY", payload: "Something went wrong :(" });
        }
    };

    const handleSubmit = async (mode) => {
        try {
            let result;
    
            if (mode === "login") {
                const { fetchLogin } = await import('../../components/Auth/Services/AuthServices');
                result = await fetchLogin(info);
            }
            if (mode === "register") {
                const { fetchRegister } = await import('../../components/Auth/Services/AuthServices');
                result = await fetchRegister(info);
            }
    
            if (result.error) {
                return dispatch({ type: "ERROR_NOTIFY", payload: result.message });
            }
            if (result.success && mode === "register") {
                return dispatch({ type: "SUCCESS_NOTIFY", payload: result.message });
            }
            if (result.success) {
                dispatch({
                    type: "LOGIN",
                    payload: result.payload
                });
                handleClose();
            }
        } catch (error) {
            dispatch({ type: "ERROR_NOTIFY", payload: "Something went wrong :(" });
        }
    };

    const handlePush = () => {
        try {
            history.push("/passwordRecovery");
            handleClose();
        } catch (error) {
            dispatch({ type: "ERROR_NOTIFY", payload: "Something went wrong :(" });
        }
    };

    const renderAuth = () => {
        try {
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
        } catch (error) {
            dispatch({ type: "ERROR_NOTIFY", payload: "Something went wrong :(" });
        }
    };

    return (
        <Grid container>
            <Grid item xs={12}>
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

                        <Button
                            className={classes.forgotPassword}
                            onClick={() => handlePush()}
                        >
                            Forgot password?
                        </Button>

                        {renderAuth()}

                    </Paper>

                </Modal>
            </Grid>
        </Grid>
    );
};
