import React from 'react';

import Landing from '../../components/Books/Landing';

import Image from '../../components/Books/imgs/patrick-tomasso.png';

import { Grid } from '@material-ui/core';

export default () => {

    return (
        <Grid
            style={{
                backgroundImage: `url(${Image})`,
                backgroundSize: 'cover'
            }}
            container
        >
            <Landing />
        </Grid>
    );
};
