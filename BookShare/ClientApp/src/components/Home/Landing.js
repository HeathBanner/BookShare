import React from 'react';

import { makeStyles } from '@material-ui/styles';
import { Grid, Typography } from '@material-ui/core';

const useStyles = makeStyles(() => ({
    container: {
        display: 'flex',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
        padding: '10%',
        backgroundColor: '#8860D0',
        height: '100vh'
    },
    title: {
        textAlign: 'center',
        width: '100%',
        color: '#84CEEB',
        border: '3px solid #C1C8E4'
    },
    introBody: {
        marginTop: 40,
        color: 'white'
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

            <Typography
                className={classes.introBody}
            >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eu lacinia tellus. Donec nulla sapien, maximus et lectus in, molestie molestie nulla. Phasellus quis vulputate nisi. Integer mi mauris, dapibus ac turpis sed, ornare facilisis libero. Aliquam erat volutpat. Fusce venenatis massa sit amet erat vulputate dictum. Donec rhoncus urna justo. Donec feugiat est sit amet elementum tempor. Phasellus luctus arcu nisl, vitae pulvinar ligula lobortis vel.
            </Typography>
        </Grid>
    );
};
