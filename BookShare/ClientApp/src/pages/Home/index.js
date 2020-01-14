import React from 'react';

import Landing from '../../components/Home/Landing';
import Appbar from '../../components/Navigation/Appbar';

import { Grid } from '@material-ui/core';

export default () => {

    return (
        <Grid container>
            <Appbar />

            <Landing />

        </Grid>
    );
};
