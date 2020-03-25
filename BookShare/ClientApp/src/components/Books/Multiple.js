import React, { useState, useEffect } from 'react';

import { states } from '../Resources/index';

import { makeStyles } from '@material-ui/styles';
import {
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    IconButton,
    Icon,
    Typography,
    TextField,
    Button,
    FormControl,
    FormGroup,
    FormControlLabel,
    Switch
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';

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
    toggleRow: {
        marginTop: 20
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
    },
    warningMessage: {
        textAlign: 'center',
        marginTop: 10
    },
    helperButtons: {
        width: '100%',
        margin: 10,
        backgroundColor: '#ca1d5d',
        color: 'white',
        transition: 'background-color 0.4s ease',
        '&:hover': {
            backgroundColor: '#de1f27',
            color: 'white'
        }
    }
}));

const initBook = {
    lfBooks: [],
    trash: [],
    Title: "",
    State: "",
    City: "",
    Sale: true,
    Trade: true,
    Imported: false
};
const initNotify = {
    error: false,
    success: false,
    warning: false,
    message: ""
};

export default (props) => {

    const classes = useStyles();
    const store = props.store;

    const [book, setBook] = useState({ ...initBook });
    const [notify, setNotify] = useState({ ...initNotify });

    useEffect(() => {
        if (!book.imported && store.user) {

            let lfBooks = [];
            if (store.user.lfBooks && store.user.lfBooks.length > 0) {
                store.user.lfBooks.forEach((item, index) => {
                    lfBooks.push({
                        index: index,
                        value: item,
                        deleted: false
                    });
                });
                }
            setBook({
                ...book,
                lfBooks: store.user.lfBooks ? store.user.lfBooks.length > 0 ? lfBooks : [] : [],
                City: store.user.city ? store.user.city : "",
                State: store.user.state ? store.user.state : "",
                Imported: true
            });
        }
    }, [store]);

    const toggleFilter = (type) => {
        const newValue = !book[type];
        setBook({ ...book, [type]: newValue });
    };

    const handleInput = (event, type) => {
        setBook({ ...book, [type]: event.target.value });
    };

    const handleAutocomplete = (value, type) => {
        setBook({ ...book, [type]: value.title });
    };

    const removeBook = (item) => {
        let newList = book.lfBooks;
        let newTrash = book.trash;

        newTrash.push({
            index: item.index,
            value: item.value,
        });
        newList[item.index].deleted = true;

        setBook({ ...book, lfBooks: newList, trash: newTrash });
    };

    const undoBook = () => {
        const len = book.trash.length - 1;
        const newTrash = book.trash;
        const marker = newTrash[len].index;
        const newList = book.lfBooks;

        newList[marker].deleted = false;
        newTrash.splice(len, 1);

        setBook({ ...book, lfBooks: newList, trash: newTrash });
    };

    const handleSearch = () => {
        const { lfBooks, State, City } = book;
        let list;
        lfBooks.forEach((item, index) => {
            if (!list) return list = item.value;
            if (index === list.length - 1) return list = list + item.value;

            list = `${list}&${item.value}`;
        });

        console.log(list);
        props.history.push(`/bookList/1/${State}/${City}/${list}`);
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

    const renderInput = (flag) => {
        if (flag) {
            return (
                <>
                    <Typography className={classes.warningMessage} variant="body2">
                        It appears you do not have any books of interest saved.
                        Would you like to do that now?
                    </Typography>
                    <Button
                        onClick={props.toggleValidation}
                        className={classes.helperButtons}
                    >
                        Books of Interest
                    </Button>
                    <Button
                        onClick={() => props.changeTab(false, 2)}
                        className={classes.helperButtons}
                    >
                        Search Manually
                    </Button>
                </>
            );
        }
        if (store.user.lfBooks.length > 0) {
            return (
                <>
                    <FormControl>
                        <FormGroup className={classes.toggleRow} row>
                            <FormControlLabel
                                value={book.Sale}
                                control={
                                    <Switch
                                        color="primary"
                                        onChange={() => toggleFilter("Sale")}
                                        checked={book.Sale}
                                    />
                                }
                                label="For Sale"
                                labelPlacement="top"
                            />
                            <FormControlLabel
                                value={book.Trade}
                                control={
                                    <Switch
                                        color="primary"
                                        onChange={() => toggleFilter("Trade")}
                                        checked={book.Trade}
                                    />
                            }
                                label="For Trade"
                                labelPlacement="top"                    
                            />
                        </FormGroup>
                    </FormControl>

                    <Typography style={{ width: '100%', textAlign: 'center', marginTop: 20 }}>
                        Book List to Search
                    </Typography>

                    <IconButton
                        onClick={undoBook}
                        disabled={book.trash.length === 0}
                    >
                        <Icon>undo</Icon>
                    </IconButton>

                    <List className={classes.list}>
                        {book.lfBooks.map((item) => {
                            if (!item.deleted) {
                                return (
                                    <ListItem key={item.value}>
                                        <ListItemSecondaryAction>
                                            <IconButton
                                                onClick={() => removeBook(item)}
                                                disabled={book.lfBooks.length === 1}
                                            >
                                                <Icon>clear</Icon>
                                            </IconButton>
                                        </ListItemSecondaryAction>

                                        <ListItemText primary={item.value} />
                                    </ListItem>
                                );
                            } else return "";
                        })}
                    </List>
                </>
            );
        } else {
            return (
                <>
                    <Typography className={classes.warningMessage} variant="body2">
                        It appears you do not have any books of interest saved.
                        Would you like to do that now?
                    </Typography>
                    <Button
                        onClick={props.toggleValidation}
                        className={classes.helperButtons}
                    >
                        Books of Interest
                    </Button>
                    <Button
                        onClick={() => props.changeTab(false, 2)}
                        className={classes.helperButtons}
                    >
                        Search Manually
                    </Button>
                </>
            );
        }
    };

    return (
        <>
            {store.user && store.user.lfBooks ? renderInput() : renderInput(true)}

            <Autocomplete
                options={states}
                getOptionLabel={option => option.title}
                className={classes.inputs}
                value={{ title: book.State }}
                onChange={(e, newValue) => handleAutocomplete(newValue, "State")}
                renderInput={params => <TextField { ...params } label="State" />}
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
        </>
    );
};
