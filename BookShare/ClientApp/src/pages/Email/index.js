import React , { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import * as services from './services';
import { makeStyles } from '@material-ui/core/styles';
import {
    Grid,
    CircularProgress,
    Paper,
    TextField,
    Button,
    Typography,
    InputAdornment,
    Icon,
    IconButton
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
    container: {
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap'
    },
    paper: {
        display: 'flex',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
        width: '80%',
        borderRadius: 10,
        padding: 20
    },
    typo: {
        marginBottom: 20,
        width: '100%',
        textAlign: 'center'
    },
    helperText: {
        margin: '10px 0px',
        width: '100%',
        textAlign: 'center'
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
        padding: 10,
        borderRadius: 20,
        width: '100%',
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

const passInit = {
    checked: false,
    pass: false,
    password1: {
        value: "",
        visible: false
    },
    password2: {
        value: "",
        visible: false
    },
    email: ""
};

export default ({ match, history }) => {

    const classes = useStyles();
    const dispatch = useDispatch();

    const [pass, setPass] = useState({ ...passInit });

    const password1 = services.passwordTest(pass.password1.value);
    const password2 = services.passwordTest(pass.password2.value);

    useEffect(() => { passwordRequest(); }, []);

    const passwordRequest = async () => {
        try {
            const result = await fetch(`api/token/validatePasswordToken/token=${match.params.token}`);
            const json = await result.json();
            if (!json.statusCode || json.statusCode !== 200) return setPass({ ...pass, checked: true, pass: false });
            setPass({ ...pass, checked: true, pass: true, email: json.user.email });
        } catch (error) {
            dispatch({ type: "ERROR_NOTIFY", payload: "Something went wrong :(" });
        }
    };

    const handleInput = (e, key) => {
        try {
            const newValue = pass[key];
            setPass({ ...pass, [key]: { ...newValue, value: e.target.value } });
        } catch (error) {
            dispatch({ type: "ERROR_NOTIFY", payload: "Something went wrong :(" });
        }
    };

    const handleSave = async () => {
        try {
            if (!pass.password1.value || !pass.password2.value || pass.password1.value !== pass.password2.value) {
                return;
            }
            const result = await services.handleSave(pass);
            setPass(result);
        } catch (error) {
            dispatch({ type: "ERROR_NOTIFY", payload: "Something went wrong :(" });
        }
    };
    
    if (!pass.pass && !pass.checked) {
        return (
            <Grid container>
                <CircularProgress />
            </Grid>
        );
    }
    if (pass.checked && !pass.pass) {
        return (
            <Grid container>
                <Typography>
                    Forbidden
                </Typography>
            </Grid>
        );
    }
    return (
        <Grid container className={classes.container}>
            <Paper className={classes.paper}>
                <Typography variant="h5" className={classes.typo}>
                    Choose your new password
                </Typography>

                <Typography
                    className={classes.helperText}
                    variant="subtitle2"
                >
                    {services.renderHelp({
                        color: password1.color,
                        value: pass.password1.value
                    }, {
                        color: password2.color,
                        value: pass.password2.value
                    })}
                </Typography>

                <TextField
                    className={classes.inputs}
                    label="New Password"
                    value={pass.password1.value}
                    type={pass.password1.visible ? "text" : "password"}
                    onChange={(e) => handleInput(e, "password1")}
                    InputLabelProps={{ classes: { focused: classes.label }}}    
                    InputProps={{
                        classes: { underline: classes.underline },
                        startAdornment: <InputAdornment position="start">
                            <Icon className={classes[password1.color]}>
                                {password1.icon}
                            </Icon>
                        </InputAdornment>,
                        endAdornment: <InputAdornment position="end">
                            <IconButton onClick={() => setPass({ ...pass, password1: { ...pass.password1, visible: !pass.password1.visible } })}>
                                <Icon>{pass.password1.visible ? "visibility" : "visibility_off"}</Icon>
                            </IconButton>
                        </InputAdornment>
                    }}
                />
                <TextField
                    className={classes.inputs}
                    label="Confirm Password"
                    value={pass.password2.value}
                    onChange={(e) => handleInput(e, "password2")}
                    type={pass.password2.visible ? "text" : "password"}
                    InputLabelProps={{ classes: { focused: classes.label }}}    
                    InputProps={{
                        classes: { underline: classes.underline },
                        startAdornment: <InputAdornment position="start">
                            <Icon className={classes[password2.color]}>
                                {password2.icon}
                            </Icon>
                        </InputAdornment>,
                        endAdornment: <InputAdornment position="end">
                            <IconButton onClick={() => setPass({ ...pass, password2: { ...pass.password2, visible: !pass.password2.visible } })}>
                                <Icon>{pass.password2.visible ? "visibility" : "visibility_off"}</Icon>
                            </IconButton>
                        </InputAdornment>
                    }}
                />

                <Button
                    onClick={handleSave}
                    className={classes.button}
                    disabled={!pass.password1.value || !pass.password2.value || pass.password1.value !== pass.password2.value}
                >
                    Submit
                </Button>
            </Paper>

        </Grid>
    );
};