import React from 'react';

import { makeStyles } from '@material-ui/styles';
import {
    TextField,
    Button,
    FormControl,
    InputLabel,
    Input,
    InputAdornment,
    Icon,
    IconButton
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
    inputs: {
        width: '100%',
        marginBottom: 20
    },
    button: {
        width: '100%',
        padding: 10,
        backgroundColor: '#ca1d5d',
        color: 'white',
        transition: 'background-color 0.4s ease',
        '&:hover': {
            backgroundColor: '#de1f27',
            color: 'white'
        }
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

            <FormControl style={{ width: '100%' }}>
                <InputLabel>Password</InputLabel>
                    <Input
                        className={classes.inputs}
                        type={login.Visible ? "text" : "password"}
                        value={login.Password}
                        onChange={handleInput("login", "Password")}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={handleInput("login", "Visible")}
                                >
                                    <Icon>{login.Visible ? "visibility" : "visibility_off"}</Icon>
                                </IconButton>
                            </InputAdornment>
                        }
                    />
            </FormControl>        

            <Button
                className={classes.button}
                onClick={() => handleSubmit("login")}
            >
                Submit
            </Button>
        </>
    );
};
