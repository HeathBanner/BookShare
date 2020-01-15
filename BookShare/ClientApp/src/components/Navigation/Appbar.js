import React, { useState } from 'react';

import Drawer from './Drawer';
import Container from '../Auth/Container';

import { makeStyles } from '@material-ui/styles';
import {
    AppBar,
    Toolbar,
    useScrollTrigger,
    Slide,
    Typography,
    Button,
    IconButton
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
    toolbar: {
        backgroundColor: '#8E8D9A'
    },
    navHeader: {
        color: 'white',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
    },
    placeHolder: {
        minHeight: 56
    }
}));

export default ({ window }) => {

    const classes = useStyles();

    const [auth, setAuth] = useState(false);

    const trigger = useScrollTrigger({ target: window ? window() : undefined });

    const handleOpen = () => setAuth(true);
    const handleClose = () => setAuth(false);

    return (
        <>
        <div className={classes.placeHolder}></div>
        <Slide appear={false} direction="down" in={!trigger}>
            <AppBar>
                <Toolbar className={classes.toolbar}>
                    <Drawer />

                    <Typography
                        className={classes.navHeader}
                        variant="h5"
                    >
                        Booksies
                    </Typography>

                    <Button
                        onClick={handleOpen}
                    >
                        Login
                    </Button>
                    </Toolbar>
                    <Container
                        auth={auth}
                        handleClose={handleClose}
                    />
            </AppBar>
            </Slide>
        </>
    );
};
