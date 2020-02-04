import React from 'react';

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

export default ({ handleInput, handleSubmit, login }) => {

    const classes = useStyles();

    return (
        <>
            <TextField
                className={classes.inputs}
                value={login.Email}
                onChange={handleInput("login", "Email")}
                label="Email"
            />

            <TextField
                className={classes.inputs}
                value={login.Password}
                onChange={handleInput("login", "Password")}
                label="Password"
            />

            <Button
                onClick={() => handleSubmit("login")}
            >
                Submit
            </Button>
        </>
    );
};
