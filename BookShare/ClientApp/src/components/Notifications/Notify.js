import React from 'react';

import { makeStyles } from '@material-ui/styles';
import { amber, green } from '@material-ui/core/colors';
import {
    IconButton,
    Icon,
    Snackbar,
    SnackbarContent,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    success: {
        backgroundColor: green[600]
    },
    error: {
        backgroundColor: "#eb4034"
    },
    warning: {
        backgroundColor: amber[700]
    },
    message: {
        display: 'flex',
        alignItems: 'center'
    },
}));

export default ({ notification, handleClose }) => {

    const classes = useStyles();
    const { error, success, warning, message } = notification;

    const isOpen = () => {
        if (error || success || warning) return true;
        return false;
    };

    const cardColor = () => {
        switch (true) {
            case error:
                return classes.error;
            case success:
                return classes.success;
            default:
                return classes.warning;
        }
    };

    return (
        <Snackbar
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
            }}
            open={isOpen()}
            autoHideDuration={6000}
            onClose={handleClose}
        >
            <SnackbarContent
                className={cardColor()}
                message={
                    <span className={classes.message}>
                        <Icon>check_circle</Icon>
                        {message}
                    </span>
                }
                action={
                    <IconButton
                        key="close"
                        color="inherit"
                        onClick={handleClose}
                    >
                        <Icon>close</Icon>
                    </IconButton>
                }
            />
        </Snackbar>
    );
};
