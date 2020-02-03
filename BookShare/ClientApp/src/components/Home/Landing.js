import React from 'react';
import { useSelector } from 'react-redux';

import { makeStyles } from '@material-ui/styles';
import { Grid, Typography, Divider } from '@material-ui/core';

import Img from './imgs/janko-ferlic.jpg';

const useStyles = makeStyles(() => ({
    container: {
        display: 'flex',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
        padding: '10%',
        backgroundImage: `url(${Img})`,
        backgroundSize: 'cover',
        //backgroundColor: '#EAE7DC',
        height: '100vh'
    },
    title: {
        textAlign: 'center',
        width: '100%',
        color: '#E98074',
    },
    introBody: {
        marginTop: 40,
        color: '#8E8D8A',
        textAlign: 'center'
    },
    divider: {
        marginBlockStart: '0.5em',
        marginBottom: 20,
        width: '60%',
        backgroundColor: 'rgb(0, 0, 0, 0.4)'
    }
}));

export default () => {

    const classes = useStyles();

    const store = useSelector(state => state);
    console.log(store);

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
