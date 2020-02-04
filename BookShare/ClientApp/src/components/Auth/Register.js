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

export default ({ handleInput, handleSubmit, register }) => {

    const classes = useStyles();

    return (
        <>
            <TextField
                className={classes.inputs}
                value={register.Username}
                onChange={handleInput("register", "Username")}
                label="Username"
            />

            <TextField
                className={classes.inputs}
                value={register.Email}
                onChange={handleInput("register", "Email")}
                label="Email"
            />

            <TextField
                className={classes.inputs}
                value={register.Password}
                onChange={handleInput("register", "Password")}
                label="Password"
            />

            <Button
                onClick={() => handleSubmit("register")}
            >
                Submit
            </Button>
        </>
    );
};
