import React from 'react';

import QueryContainer from './QueryContainer';
import Image from './imgs/patrick-tomasso-bright.png';

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
        backgroundImage: `url(${Image})`,
        backgroundSize: 'cover',
        minHeight: '100vh'
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
