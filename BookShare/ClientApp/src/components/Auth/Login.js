import React, { useState } from 'react';

import { fetchLogin } from './Services/AuthServices';

import { makeStyles } from '@material-ui/styles';
import {
    TextField,
    Button
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
    inputs: {
        width: '100%',
        marginBottom: 20
    }
}));

const initLogin = {
    Email: "",
    Password: ""
};

export default () => {

    const classes = useStyles();

    const [login, setLogin] = useState({ ...initLogin });

    const handleInput = (event, type) => {
        setLogin({ ...login, [type]: event.target.value });
    };

    const handleSubmit =  async () => {
        const result = await fetchLogin(login);
        console.log(result);
    };

    return (
        <>
            <TextField
                className={classes.inputs}
                value={login.Email}
                onChange={(e) => handleInput(e, "Email")}
                label="Email"
            />

            <TextField
                className={classes.inputs}
                value={login.Password}
                onChange={(e) => handleInput(e, "Password")}
                label="Password"
            />

            <Button
                onClick={handleSubmit}
            >
                Submit
            </Button>
        </>
    );
};
