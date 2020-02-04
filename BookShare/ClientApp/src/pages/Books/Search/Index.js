import React from 'react';

import Landing from '../../../components/Books/Search/Landing';

import { Grid } from '@material-ui/core';

export default ({ match }) => {

    return (
        <Grid item xs={12}>


            <Landing
                params={match.params}
            />
        </Grid>
    );
};
