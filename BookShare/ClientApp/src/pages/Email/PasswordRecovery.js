import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { handleEmail } from './services';
import {
    Grid,
    Typography,
    TextField,
    Button,
    InputAdornment,
    Icon,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    container: {
        display: 'flex',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
        padding: 20,
        minHeight: '100vh'
    },
    typo: {
        width: '100%',
        textAlign: 'center',
        marginBottom: 10
    },
    inputs: {
        width: '100%',
        marginBottom: 20,
        '&:underline': {
            '&:before': {
                borderBottom: '1px solid #21ce99'
            },
            '&:after': {
                borderBottom: `2px solid #21ce99`
            },
            '&:hover:not($disabled):not($focused):not($error):before': {
                borderBottom: `2px solid #f50057`
            }
        }
    },
    underline: {
        '&:before': {
            borderBottom: '1px solid #21ce99'
        },
        '&:after': {
            borderBottom: `2px solid #21ce99`
        },
        '&:hover:not($disabled):not($focused):not($error):before': {
            borderBottom: `2px solid #21ce99`
        },
        '&.MuiFormLabel-root': {
            color: '#21ce99'
        },
        '&.MuiFormLabel-root .Mui-focused': {
            color: '#21ce99'
        }
    },
    label: {
        color: '#21ce99 !important',
    },
    button: {
        width: '100%',
        padding: 10,
        backgroundColor: '#21ce99',
        color: 'white'
    },
    error: {
        color: '#f44336'
    },
    warning: {
        color: '#ff9800'
    },
    success: {
        color: '#4caf50'
    }
}));

const initEmail = {
    value: "",
    valid: false,
    notification: {
        error: false,
        success: false,
        warning: false,
        message: ""
    }
};

export default ({ history }) => {

    const classes = useStyles();
    const dispatch = useDispatch();

    const [email, setEmail] = useState({ ...initEmail });

    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const valid = re.test(String(email.value).toLowerCase());

    const handleChange = (event) => {
        try {
            setEmail({ ...email, value: event.target.value });
        } catch (error) {
            dispatch({ type: "ERROR_NOTIFY", payload: "Something went wrong :(" });
        }
    };

    const handleSubmit = async () => {
        try {
            if (!valid) return;
            const result = await handleEmail(email);
            setEmail(result);
        } catch (error) {
            dispatch({ type: "ERROR_NOTIFY", payload: "Something went wrong :(" });
        }
    };

    if (email.notification.success) {
        return (
            <Grid container className={classes.container}>
                <Typography className={classes.typo}>
                    A recovery link has been sent to your email. Follow it's directions to finish.
                </Typography>

                <Button
                    className={classes.button}
                    onClick={() => history.push("/")}
                >
                    Home Page
                </Button>
            </Grid>
        );
    }
    return (
        <Grid container className={classes.container}>
            <Typography className={classes.typo}>
                Please enter the email address associated with the lost account.
            </Typography>

            <TextField
                className={classes.inputs}
                label="Email Address"
                value={email.value}
                type="email"
                onChange={handleChange}
                InputLabelProps={{ classes: { focused: classes.label }}}    
                InputProps={{
                    classes: { underline: classes.underline },
                    startAdornment: <InputAdornment position="start">
                        <Icon className={valid ? classes.success : classes.error}>
                            {valid ? "check_outline" : "error_outline"}
                        </Icon>
                    </InputAdornment>,
                }}
            />

            <Button
                className={classes.button}
                onClick={handleSubmit}
                disabled={!valid}
            >
                Submit
            </Button>

        </Grid>
    );
};