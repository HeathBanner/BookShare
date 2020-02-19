import React from 'react';

import { makeStyles } from '@material-ui/styles';
import { Grid, Typography, Divider } from '@material-ui/core';

import Image from './imgs/janko-ferlic.png';

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
        height: '100vh'
    },
    title: {
        textAlign: 'center',
        width: '100%',
        color: '#E98074',
    },
    introBody: {
        marginTop: 40,
        color: 'white',
        textAlign: 'center'
    },
    divider: {
        marginBlockStart: '0.5em',
        marginBottom: 20,
        width: '60%',
        backgroundColor: 'rgb(255, 255, 255, 1)'
    }
}));

export default () => {

    const classes = useStyles();

    return (
        <Grid item xs={12} className={classes.container}>
            <Typography
                className={classes.title}
                variant="h2"
            >
                Booksies
            </Typography>

            <Divider className={classes.divider} />

            <Typography
                className={classes.introBody}
            >
                The one, the only, text book trading platform
            </Typography>
        </Grid>
    );
};
