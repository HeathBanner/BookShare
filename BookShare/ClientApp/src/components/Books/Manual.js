import React, { useEffect, useState } from 'react';

import Notify from '../Notifications/Notify';
import { states } from '../Resources/index';

import { makeStyles } from '@material-ui/styles';
import {
    TextField,
    Button
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';

const useStyles = makeStyles(() => ({
    inputs: {
        width: '100%',
        marginBottom: 20
    },
    search: {
        width: '100%',
        backgroundColor: '#28ac60',
        color: 'white',
        padding: 10,
        transition: 'background-color 0.4s ease',
        '&:hover': {
            backgroundColor: '#23de71',
            color: 'white'
        }
    }
}));

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
        console.log(book);
        if (!book.Imported && store.user) {
            setBook({
                ...book,
                lfBooks: store.user.lfBooks ? store.user.lfBooks.length > 0 ? store.user.lfBooks : [] : [],
                City: store.user.city ? store.user.city : "",
                State: store.user.state ? store.user.state : "",
                Imported: true
            });
        }
    }, [store, book]);

    const handleInput = (event, type) => {
        console.log(event.target);
        setBook({ ...book, [type]: event.target.value });
    };

    const handleAutocomplete = (value, type) => {
        setBook({ ...book, [type]: value.title });
    };

    const handleClose = () => setNotify({ ...initNotify });

    const handleSearch = () => {
        const { Title, State, City } = book;
        history.push(`/books/1/${Title}/${State}/${City}`);
    };

    const preSubmit = () => {
        switch (true) {
            case book.Title.length <= 0:
                return setNotify({ ...notify, warning: true, message: "Book field is blank" });
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
            <TextField
                className={classes.inputs}
                value={book.Title}
                onChange={(e) => handleInput(e, "Title")}
                label="Book Title"
                color="secondary"            
            />
            <Autocomplete
                options={states}
                getOptionLabel={option => option.title}
                className={classes.inputs}
                value={{ title: book.State }}
                onChange={(e, newValue) => handleAutocomplete(newValue, "State")}
                renderInput={params => <TextField {...params} label="State" />}
            />

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

            <Notify
                handleClose={handleClose}
                notification={notify}
            />
        </>
    );
};
