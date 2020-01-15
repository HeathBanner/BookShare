import React, { useState } from 'react';

import QueryContainer from './QueryContainer';

import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles(() => ({
    container: {
        display: 'flex',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
        padding: '10%',
        backgroundColor: '#EAE7DC',
        height: '100vh'
    }
}));

export default () => {

    const classes = useStyles();

    return (
        <Grid item xs={12} className={classes.container}>

            <QueryContainer />

        </Grid>
    );
};
