import React from 'react';

import { makeStyles } from '@material-ui/styles';
import {
    TextField,
    FormControl,
    InputLabel,
    Input,
    InputAdornment,
    Icon,
    IconButton
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
    inputContainers: {
        width: '100%',
        padding: '5%'
    },
    input: {
        width: '100%',
        marginBottom: 20
    },
    button: {
        width: '100%',
        padding: 10,
    },
    underline: {
        '&:before': {
            borderBottom: '1px solid #21ce99'
        },
        '&:after': {
            borderBottom: `2px solid #21ce99`
        },
        '&:hover:not($disabled):not($focused):not($error):before': {
            borderBottom: `2px solid #f50057`
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
    }
}));

export default ({ modalProps, handleChange }) => {

    const classes = useStyles();

    const { type, email, password, newPassword0, newPassword1, activeStep, visible } = modalProps;

    console.log(type);

    const renderStep = () => {
        if (type === "password") {
            return (
                <div className={classes.inputContainers}>
                    {["newPassword0", "newPassword1"].map((item, index) => {
                        return (
                            <FormControl style={{ width: '100%' }}>
                                <InputLabel classes={{ focused: classes.label }}>
                                    {index === 0 ? "Password" : "Re-Enter Password"}
                                </InputLabel>
                                <Input
                                    className={classes.input}
                                    classes={{ underline: classes.underline }}
                                    type={visible ? "text" : "password"}
                                    value={index === 0 ? newPassword0 : newPassword1}
                                    onChange={e => handleChange(e, item)}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={e => handleChange(e, "visible")}
                                            >
                                                <Icon>{visible ? "visibility" : "visibility_off"}</Icon>
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                        </FormControl>        
                        );
                    })}
                </div>
            );
        }

        return (
            <div className={classes.inputContainers}>
                <TextField
                    className={classes.input}
                    InputProps={{ classes: { underline: classes.underline }}}
                    InputLabelProps={{ classes: { focused: classes.label }}}    
                    label="Email"
                    value={email}
                    onChange={(e) => handleChange(e, "email")}
                />
            </div>
        );
    };

    if (activeStep === 0) {
        return (
            <div className={classes.inputContainers}>
                <FormControl style={{ width: '100%' }}>
                    <InputLabel classes={{ focused: classes.label }}>Password</InputLabel>
                        <Input
                            className={classes.input}
                            classes={{ underline: classes.underline }}
                            label="Password"
                            type={visible ? "text" : "password"}
                            value={password}
                            onChange={(e) => handleChange(e, "password")}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={e => handleChange(e, "visible")}
                                    >
                                        <Icon style={{ color: visible ? '#3f51b5' : 'rgba(0, 0, 0, 0.54)' }}>
                                            {visible ? "visibility" : "visibility_off"}
                                        </Icon>
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                </FormControl>
            </div>
        );
    }

    return renderStep();
};
