import React from 'react';

import { makeStyles } from '@material-ui/styles';
import {
    Grid,
    Typography
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        padding: '10%'
    },
    message: {
        width: '100%',
        textAlign: 'center',
    }
}));

export default () => {

    const classes = useStyles();

    return (
        <Grid className={classes.container} item xs={12}>
            <Typography className={classes.message} variant="h5">
                You must be logged in to use this
            </Typography>
        </Grid>
    );
};
