import React, { useState } from 'react';

import { makeStyles } from '@material-ui/styles';
import {
    Paper,
    Typography,
    TextField,
    Button,
    List,
    ListItem,
    ListItemSecondaryAction,
    ListItemText,
    ListItemIcon,
    IconButton,
    Icon,
    Collapse,
    Divider
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
    listContainer: {
        display: 'flex',
        alignContent: 'center',
        alignItems: 'center',
        justifyItems: 'center',
        flexWrap: 'wrap',
        padding: 10,
        marginBottom: 20,
        width: '100%'
    },
    header: {
        width: '100%',
        textAlign: 'center',
        marginBottom: 10
    },
    list: {
        width: '100%'
    },
    LFInput: {
        width: '100%',
        marginBottom: 10
    },
    addButton: {
        width: '100%',
        marginBottom: 10,
        padding: 5,
        color: 'white',
        backgroundColor: '#E98074',
        transition: 'background-color 0.4s ease',
        '&:hover': {
            backgroundColor: '#E85A4F',
            color: 'white'
        },
    },
    listHeader: {
    },
    divider: {
        marginBlockStart: '0.5em',
        width: '100%',
        backgroundColor: 'rgb(0, 0, 0, 0.2)'
    }
}));

export default ({ list, addBook, removeBook, notifyBook }) => {

    const classes = useStyles();

    const [book, setBook] = useState("");
    const [open, setOpen] = useState(true);

    const handleInput = (event) => setBook(event.target.value);

    const handleAdd = () => {
        if (book.length < 4) {
            return notifyBook({
                warning: true,
                message: "Book title cannot be less than 4 characters"
            });
        }

        addBook(book);
        setBook("");
    };

    const handleList = () => setOpen(!open);

    return (
        <Paper className={classes.listContainer}>
            <Typography
                className={classes.header}
            >
                Tradeable Books
            </Typography>

            <TextField
                className={classes.LFInput}
                value={book}
                onChange={(e) => handleInput(e)}
                label="Title"
            />

            <Button
                className={classes.addButton}
                onClick={handleAdd}
            >
                Add
            </Button>

            <List className={classes.list}>
                <ListItem
                    className={classes.listHeader}
                    button
                    onClick={handleList}
                >
                    <ListItemText primary="Book List" />
                    <ListItemIcon>
                        <Icon>{open ? "expand_less" : "expand_more"}</Icon>
                    </ListItemIcon>
                </ListItem>
                <Divider className={classes.divider} />
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        {list.map((item, index) => {
                            return (
                                <ListItem>
                                    <ListItemSecondaryAction>
                                        <IconButton
                                            onClick={() => removeBook(index)}
                                        >
                                            <Icon>clear</Icon>
                                        </IconButton>
                                    </ListItemSecondaryAction>

                                    <ListItemText primary={item} />
                                </ListItem>
                            );
                        })}
                    </Collapse>
                </List>
        </Paper>
    );
};