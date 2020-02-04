import React from 'react';

import Appbar from '../../components/Navigation/Appbar';
import Landing from '../../components/Books/Landing';

import { Grid } from '@material-ui/core';

export default () => {

    return (
        <Grid container>
            <Appbar />

            <Landing />
        </Grid>
    );
};
