import React from 'react';

import { makeStyles } from '@material-ui/styles';
import {
    Paper,
    Typography,
    Button,
    Icon
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
    paper: {
        display: 'flex',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '70%',
        padding: '10%'
    },
    message: {
        width: '100%',
        textAlign: 'center',
        marginBottom: 30
    },
    action: {
        width: '100%',
        padding: 10,
        backgroundColor: '#ca1d5d',
        color: 'white',
        transition: 'background-color 0.4s ease',
        '&:hover': {
            backgroundColor: '#de1f27',
            color: 'white'
        }
    },
    warning: {
        color: '#ff9800',
        marginBottom: 20,
        fontSize: '4rem'
    },
    default: {
        marginBottom: 20,
        fontSize: '4rem'
    }
}));

export default ({ message, action, icon }) => {

    const classes = useStyles();

    const iconSwitch = () => {
        switch (icon) {
            case "warning":
                return classes.warning;
            default:
                return classes.default;
        }
    };

    const renderAction = () => {
        if (!action) return "";
        return (
            <Button
                className={classes.action}
                onClick={() => action.func()}
            >
                {action.message}
            </Button>
        );
    };

    return (
        <Paper className={classes.paper}>
            <Icon
                className={iconSwitch()}
                fontSize="large"
            >
                {icon}
            </Icon>

            <Typography
                className={classes.message}
                variant="h5"
            >
                {message}
            </Typography>

            {renderAction()}
        </Paper>
    );
};
