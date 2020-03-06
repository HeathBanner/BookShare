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
    drawer: {
        backgroundImage: 'linear-gradient(#de1f27, #ca1d5d)'
    },
    listItems: {
        color: "white",
        flexWrap: 'wrap',
        width: '100%',
        display: 'block !important',
        textAlign: 'center',
        marginBottom: 10
    },
    buttons: {
        color: 'white',
        width: '100%',
        display: 'block !important',
        textAlign: 'center',
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
    },
    {
        text: "Post",
        icon: "library_add",
        link: "/post"
    }
];

const NavDrawer = ({ history }) => {

    const classes = useStyles();

    const [open, setOpen] = useState(false);

    const toggleDrawer = (open) => event => {
        if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) return;

        setOpen(open);
    };

    const handleRedirect = (link) => {
        setOpen(false);
        history.push(link);
    };

    return (
        <>
            <IconButton
                style={{ color: 'white' }}
                onClick={toggleDrawer(true)}
            >
                <Icon>menu</Icon>
            </IconButton>
            <Drawer
                PaperProps={{ className: classes.drawer }}
                open={open}
                onClose={toggleDrawer(false)}
            >
                <List>
                    {navList.map((item) => {
                        return (
                            <ListItem
                                className={classes.listItems}
                                onClick={() => handleRedirect(item.link)}
                                button
                                key={item.text}
                            >
                                <ListItemIcon
                                    className={classes.buttons}
                                >
                                    <Icon>{item.icon}</Icon>
                                </ListItemIcon>

                                <ListItemText style={{width: '100%', textAlign: 'center'}} primary={item.text} />
                            </ListItem>
                        );
                    })}
                </List>
            </Drawer>
        </>
    );
};

export default withRouter(NavDrawer);
