import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';

import { makeStyles } from '@material-ui/styles';
import {
    Avatar,
    Button,
    Popper,
    Fade,
    Paper,
    Typography
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
    popper: {
        display: 'flex',
        justifyContent: 'flex-end',
        width: '100%'
    },
    button: {
        position: 'absolute',
        right: 16,
        top: '50%',
        transform: 'translate(0%, -50%)',
        padding: 12
    },
    avatar: {
        backgroundColor: 'red'
    },
    paper: {
        width: '20%',
        padding: 10
    },
    buttons: {
        width: '100%',
        padding: 10,
        whiteSpace: 'nowrap'
    }
}));

const buttons = [
    {
        text: "Profile",
        url: "/profile",
        func: false
    },
    {
        text: "My Books",
        url: "/bookshelf",
        func: false
    },
    {
        text: "Settings",
        url: "/settings",
        func: false
    },
    {
        text: "Signout",
        func: true
    }
];

const User = ({ user, history }) => {

    const classes = useStyles();

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        const selection = event.currentTarget;
        const getBoundingClientRect = () => selection.getBoundingClientRect();

        if (anchorEl) return setAnchorEl(null);

        setAnchorEl({
            clientWidth: getBoundingClientRect().width,
            clientHeight: getBoundingClientRect().height,
            getBoundingClientRect
        });
    };

    const open = Boolean(anchorEl);
    const id = open ? 'transition-popper' : undefined;

    const handleHistory = (url) => {
        history.push(url);
        setAnchorEl(null);
    };

    return (
        <>
            <Button
                className={classes.button}
                onClick={handleClick}
            >
                <Avatar className={classes.avatar}>
                    {user.username.charAt(0)}
                </Avatar>
            </Button>

            <Popper
                className={classes.popper}
                id={id}
                open={open}
                anchorEl={anchorEl}
                transition
            >
                {({ TransitionProps }) => (
                    <Fade {...TransitionProps} timeout={50}>
                        <Paper className={classes.paper}>
                            {buttons.map((item) => {
                                return (
                                    <Button
                                        className={classes.buttons}
                                        onClick={() => item.func ? "" : handleHistory(item.url)}
                                    >
                                        <Typography variant="body2">
                                            {item.text}
                                        </Typography>
                                    </Button>
                                );
                            })}

                        </Paper>
                    </Fade>
                )}
            </Popper>
         </>
    );
};

export default withRouter(User);
