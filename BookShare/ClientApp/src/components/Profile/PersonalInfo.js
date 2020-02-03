﻿import React from 'react';
import { useSelector } from 'react-redux';

import { makeStyles } from '@material-ui/core';
import {
    Paper,
    Typography,
    Divider,
    IconButton,
    Icon
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
    paper: {
        display: 'flex',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
        width: '90%',
        padding: '10%',
        marginTop: 20
    },
    infoContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginBottom: 20,
        width: '100%'
    },
    username: {
        width: '100%',
        textAlign: 'center'
    },
    divider: {
        marginBottom: 20,
        marginBlockStart: '0.5em',
        width: '60%',
        backgroundColor: 'rgb(0, 0, 0, 0.2)'
    },
    email: {
    }
}));

export default () => {

    const classes = useStyles();
    const store = useSelector(store => store);

    const { email, username, posted } = store.user;

    if (!store.user) return "";
    return (
        <Paper className={classes.paper}>
            <Typography
                className={classes.username}
                variant="h5"
            >
                Hello, {username}
            </Typography>

            <Divider className={classes.divider} />

            <div className={classes.infoContainer}>
                <IconButton>
                    <Icon>edit</Icon>
                </IconButton>
                <Typography
                    className={classes.email}
                >
                    Email: {email}
                </Typography>
            </div>

            <div className={classes.infoContainer}>
                <IconButton>
                    <Icon>
                        edit
                    </Icon>
                </IconButton>
                <Typography>
                    Password:
                </Typography>
                <Icon>vpn_key</Icon>
            </div>

            <div className={classes.infoContainer}>
                <IconButton>
                    <Icon>
                        open_in_browser
                    </Icon>
                </IconButton>
                <Typography>
                    Books posted: {posted.length}
                </Typography>
            </div>
        </Paper>
    );
};
