import React, { useState } from 'react';

import { fetchRegister } from './Services/AuthServices';

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

const initRegister = {
    Username: "",
    Email: "",
    Password: ""
};

export default () => {

    const classes = useStyles();

    const [register, setRegister] = useState({ ...initRegister });

    const handleInput = (event, type) => {
        setRegister({ ...register, [type]: event.target.value });
    };

    const handleSubmit = async () => {
        const result = await fetchRegister(register);
        console.log(result);
    };

    return (
        <>
            <TextField
                className={classes.inputs}
                value={register.Username}
                onChange={(e) => handleInput(e, "Username")}
                label="Username"
            />

            <TextField
                className={classes.inputs}
                value={register.Email}
                onChange={(e) => handleInput(e, "Email")}
                label="Email"
            />

            <TextField
                className={classes.inputs}
                value={register.Password}
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
