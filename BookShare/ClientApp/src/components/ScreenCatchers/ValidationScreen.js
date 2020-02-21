import React from 'react';

import { makeStyles } from '@material-ui/styles';
import {
    Grid,
    Typography,
    Paper,
    Icon
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        padding: '10%'
    },
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
        padding: '10%',
        width: '70%'
    },
    icon: {
        fontSize: '4rem',
        color: '#ff9800'
    },
    message: {
        marginTop: 20,
        width: '100%',
        textAlign: 'center',
    }
}));

export default () => {

    const classes = useStyles();

    return (
        <Grid className={classes.container} item xs={12}>
            <Paper className={classes.paper}>

                <Icon className={classes.icon}>
                    warning
                </Icon>

                <Typography
                    className={classes.message}
                    variant="h5"
                >
                    You must be logged in to use this
                </Typography>
            </Paper>
        </Grid>
    );
};
