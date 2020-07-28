import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Drawer from './Drawer';
import Container from '../../pages/Auth/index';
import User from './User';

import { makeStyles } from '@material-ui/styles';
import {
    AppBar,
    Toolbar,
    useScrollTrigger,
    Slide,
    Typography,
    Button,
    CircularProgress
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
    toolbar: {
        backgroundColor: '#21ce99'
    },
    navHeader: {
        color: 'white',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
    },
    button: {
        position: 'absolute',
        right: 16,
        top: '50%',
        transform: 'translate(0%, -50%)',
        padding: 12,
        color: 'white'
    },
    progress: {
        position: 'absolute',
        right: 16,
        padding: 12
    }
}));

const NavBar = ({ window, history }) => {

    const classes = useStyles();
    const store = useSelector(state => state);

    const [auth, setAuth] = useState(false);

    const trigger = useScrollTrigger({ target: window ? window() : undefined });

    const handleOpen = () => setAuth(true);
    const handleClose = () => setAuth(false);

    const renderAuth = () => {
        if (store.loggedIn) return <User user={store.user} />;
        if (store.checking) return <CircularProgress className={classes.progress} color="secondary" />;

        return (
            <Button
                className={classes.button}
                onClick={handleOpen}
            >
                Login
            </Button>
        );
    };

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
                            Sothis
                        </Typography>

                        {renderAuth()}
                    </Toolbar>

                    <Container
                        auth={auth}
                        handleClose={handleClose}
                        history={history}
                    />
                </AppBar>
            </Slide>
        </>
    );
};

export default withRouter(NavBar);