import React, { useState } from 'react';

import { withRouter } from 'react-router'

import { makeStyles } from '@material-ui/styles';
import {
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Icon
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
    button: {
        color: 'white',
    }
}));

const navList = [
    {
        text: "Home",
        icon: "home",
        link: "/"
    },
    {
        text: "Books",
        icon: "menu_book",
        link: "/books"
    }
];

const NavDrawer = ({ history }) => {

    const classes = useStyles();

    const [open, setOpen] = useState(false);

    const toggleDrawer = (open) => event => {
        if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) return;

        setOpen(open);
    };

    const handleRedirect = (link) => history.push(link);

    return (
        <>
            <IconButton
                className={classes.button}
                onClick={toggleDrawer(true)}
            >
                <Icon>menu</Icon>
            </IconButton>
            <Drawer
                open={open}
                onClose={toggleDrawer(false)}
            >
                <List>
                    {navList.map((item) => {
                        return (
                            <ListItem
                                onClick={() => handleRedirect(item.link)}
                                button
                                key={item.text}
                            >
                                <ListItemIcon>
                                    <Icon>{item.icon}</Icon>
                                </ListItemIcon>

                                <ListItemText primary={item.text} />
                            </ListItem>
                        );
                    })}
                </List>
            </Drawer>
        </>
    );
};

export default withRouter(NavDrawer);
