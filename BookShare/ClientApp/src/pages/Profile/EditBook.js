import React from 'react';

import Landing from '../../components/Post/Landing';

import { Grid } from '@material-ui/core';

export default ({ match }) => {


    console.log(match.params.id);
    return (
        <Grid container>
            <Landing editId={match.params.id} />
        </Grid>
    );
};
