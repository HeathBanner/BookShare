import React from 'react';

import BackgroundImage from '../../components/Profile/imgs/sincerely-media.png';
import PersonalInfo from '../../components/Profile/PersonalInfo';

import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles(() => ({
    container: {
        display: 'flex',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '5%',
        backgroundImage: `url(${BackgroundImage})`,
        backgroundSize: 'cover'
    },
}));

export default () => {

    const classes = useStyles();

    return (
        <Grid container>
            <Grid className={classes.container} item xs={12}>

                <PersonalInfo />

            </Grid>
        </Grid>
    );
};
