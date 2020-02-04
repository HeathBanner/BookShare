import React from 'react';

import Landing from '../../../components/Books/BookView/Landing';

import { Grid } from '@material-ui/core';

export default ({ match }) => {

    return (
        <Grid container>
            <Landing params={match.params} />
        </Grid>
    );
};
