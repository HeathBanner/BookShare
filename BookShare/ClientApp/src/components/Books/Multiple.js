import React, { useState, useEffect } from 'react';

import { makeStyles } from '@material-ui/styles';
import {
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    IconButton,
    Icon,
    Typography,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Input,
    TextField,
    Button
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
    list: {
        backgroundColor: '#EAE7DC',
        width: '100%',
        marginBottom: 20
    },
    inputs: {
        width: '100%',
        marginBottom: 20
    },
    search: {
        width: '100%',
        backgroundColor: '#E85A4F',
        color: 'white',
        padding: 10,
        transition: 'background-color 0.4s ease',
        '&:hover': {
            backgroundColor: '#E98074',
            color: 'white'
        }
    }
}));

const states = ["NC", "SC", "FL", "CA", "AK", "HI"];
const initBook = {
    lfBooks: "",
    Title: "",
    State: "",
    City: "",
    Imported: false
};
const initNotify = {
    error: false,
    success: false,
    warning: false,
    message: ""
};

export default ({ history, store }) => {

    const classes = useStyles();

    const [book, setBook] = useState({ ...initBook });
    const [notify, setNotify] = useState({ ...initNotify });

    useEffect(() => {
        if (!book.imported && store.user) {
            setBook({
                ...book,
                lfBooks: store.user.lfBooks.length > 0 ? store.user.lfBooks : [],
                City: store.user.city ? store.user.city : "",
                State: store.user.state ? store.user.state : "",
                Imported: true
            });
        }
    }, [store]);

    const handleInput = (event, type) => {
        setBook({ ...book, [type]: event.target.value });
    };

    const removeBook = (index) => {
        let newList = book.lfBooks;
        newList.splice(index, 1);

        setBook({ ...book, lfBooks: newList });
    };

    const handleClose = () => setNotify({ ...initNotify });

    const handleSearch = () => {
        const { lfBooks, State, City } = book;
        let list;
        lfBooks.forEach((item, index) => {
            if (!list) return list = item;
            if (index === list.length - 1) return list = list + item;

            list = `${list}&${item}`;
        });

        console.log(list);
        history.push(`/bookList/${State}/${City}/${list}`);
    };

    const preSubmit = () => {
        switch (true) {
            case !book.State:
                return setNotify({ ...notify, warning: true, message: "You must select a State" });
            case book.City.length <= 0:
                return setNotify({ ...notify, warning: true, message: "City field cannot be blank" });
            default:
                handleSearch();
        }
    };

    return (
        <>
            <Typography style={{ width: '100%', textAlign: 'center', marginTop: 20 }}>
                Book List
            </Typography>

            <List className={classes.list}>
                {store.user.lfBooks.map((item, index) => {
                    return (
                        <ListItem key={item}>
                            <ListItemSecondaryAction>
                                <IconButton
                                    onClick={() => removeBook(item, index)}
                                    disabled={book.lfBooks.length === 1}
                                >
                                    <Icon>clear</Icon>
                                </IconButton>
                            </ListItemSecondaryAction>

                            <ListItemText primary={item} />
                        </ListItem>
                    );
                })}
            </List>

            <FormControl className={classes.inputs}>
                <InputLabel>State</InputLabel>
                <Select
                    value={book.State}
                    onChange={(e) => handleInput(e, "State")}
                    label="Field of Study"
                    input={<Input color="secondary" />}
                >
                    {states.map((item) => {
                        return (
                            <MenuItem value={item} key={item}>
                                {item}
                            </MenuItem>
                        );
                    })}
                </Select>
            </FormControl>

            <TextField
                className={classes.inputs}
                value={book.City}
                onChange={(e) => handleInput(e, "City")}
                label="City"
                color="secondary"
            />

            <Button
                className={classes.search}
                onClick={preSubmit}
            >
                Search
            </Button>
        </>
    );
};
