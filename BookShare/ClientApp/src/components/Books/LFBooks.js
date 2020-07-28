import React, { useState } from 'react';

import { makeStyles } from '@material-ui/styles';
import {
    Icon,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    Collapse,
    Divider
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
    listHeader: {
        width: '100%',
        marginTop: 10
    },
    listDivider: {
        marginBlockStart: '0.5em',
        width: '100%',
        backgroundColor: 'rgb(0, 0, 0, 0.2)'
    },
    list: {
        width: '100%',
    }
}));

export default ({ lfBooks }) => {

    const classes = useStyles();

    const [open, setOpen] = useState(true);

    const handleOpen = () => setOpen(!open);

    return (
        <List className={classes.list}>
            <ListItem button onClick={handleOpen}>
                <ListItemIcon>
                    <Icon>{open ? "remove" : "add"}</Icon>
                </ListItemIcon>
                <ListItemText primary="Tradeable Books" />
            </ListItem>

            <Divider className={classes.listDivider} />

            <Collapse in={open} timeout="auto" unmountOnExit>
                {lfBooks.map((item) => {
                    return (
                        <ListItem style={{ padding: '4px 16px' }}>
                            <ListItemText primary={item} />
                        </ListItem>
                    );
                })}
            </Collapse>
        </List>
    );
};
