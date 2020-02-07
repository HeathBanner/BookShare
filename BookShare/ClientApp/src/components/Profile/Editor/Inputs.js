import React from 'react';

import { makeStyles } from '@material-ui/styles';
import { TextField } from '@material-ui/core';

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
    }
}));

export default ({ modalProps, handleChange }) => {

    const classes = useStyles();

    const { type, email, password, newPassword0, newPassword1, activeStep } = modalProps;

    const renderStep = () => {
        if (type === "Password") {
            return (
                <div className={classes.inputContainers}>
                    <TextField
                        className={classes.input}
                        label={type}
                        value={newPassword0}
                        onChange={(e) => handleChange(e, "newPassword0")}
                    />
                    <TextField
                        className={classes.input}
                        label={`Re-Enter ${type}`}
                        value={newPassword1}
                        onChange={(e) => handleChange(e, "newPassword1")}
                    />
                </div>
            );
        }

        return (
            <div className={classes.inputContainers}>
                <TextField
                    className={classes.input}
                    label={type}
                    value={email}
                    onChange={(e) => handleChange(e, "email")}
                />
            </div>
        );
    };

    if (activeStep === 0) {
        return (
            <div className={classes.inputContainers}>
                <TextField
                    className={classes.input}
                    label="Password"
                    value={password}
                    onChange={(e) => handleChange(e, "password")}
                />
            </div>
        );
    }

    return renderStep();
};
