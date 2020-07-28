import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { states } from '../Resources/index';

import { makeStyles } from '@material-ui/styles';
import {
    Typography,
    TextField,
    Button,
    FormControl,
    FormGroup,
    FormControlLabel,
    Checkbox,
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
        backgroundColor: '#21ce99',
        color: 'white',
        padding: 10,
        borderRadius: '20px',
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
    },
    checkboxContainer: {
        marginBottom: 20
    },
    underline: {
        '&:before': {
            borderBottom: '1px solid #21ce99'
        },
        '&:after': {
            borderBottom: `2px solid #21ce99`
        },
        '&:hover:not($disabled):not($focused):not($error):before': {
            borderBottom: `2px solid #f50057`
        },
        '&.MuiFormLabel-root': {
            color: '#21ce99'
        },
        '&.MuiFormLabel-root .Mui-focused': {
            color: '#21ce99'
        }
    },
    label: {
        color: '#21ce99 !important',
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
    const dispatch = useDispatch();

    const [book, setBook] = useState({ ...initBook });
    const [notify, setNotify] = useState({ ...initNotify });

    useEffect(() => {
        try {
            if (!book.imported && store.user) {
                let lfBooks = [];
                if (store.user.lfBooks && store.user.lfBooks.length > 0) {
                    store.user.lfBooks.forEach((item) => {
                        lfBooks.push({
                            value: item,
                            checked: false
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
        } catch (error) {
            dispatch({ type: "ERROR_NOTIFY", payload: "Something went wrong :(" });
        }
    }, [store]);

    const toggleFilter = (type) => {
        try {
            const newValue = !book[type];
            setBook({ ...book, [type]: newValue });
        } catch (error) {
            dispatch({ type: "ERROR_NOTIFY", payload: "Something went wrong :(" });
        }
    };

    const handleInput = (event, type) => {
        try {
            setBook({ ...book, [type]: event.target.value });
        } catch (error) {
            dispatch({ type: "ERROR_NOTIFY", payload: "Something went wrong :(" });
        }
    };

    const handleAutocomplete = (value, type) => {
        try {
            setBook({ ...book, [type]: value.title });
        } catch (error) {
            dispatch({ type: "ERROR_NOTIFY", payload: "Something went wrong :(" });
        }
    };

    const handleToggle = (index) => {
        try {
            let newList = book.lfBooks;
            newList[index].checked = !newList[index].checked;
            setBook({ ...book, lfBooks: newList });
        } catch (error) {
            dispatch({ type: "ERROR_NOTIFY", payload: "Something went wrong :(" });
        }
    };

    const handleSearch = () => {
        try {
            const { lfBooks, State, City, Sale, Trade } = book;
            let list;
            lfBooks.forEach((item) => {
                if (!list && item.checked) return list = item.value;
                if (item.checked) return list = `${list}&${item.value}`;
            });
    
            props.history.push(`/bookList/1/${State}/${City}/${list}/${Sale}/${Trade}`);
        } catch (error) {
            dispatch({ type: "ERROR_NOTIFY", payload: "Something went wrong :(" });
        }
    };

    const preSubmit = () => {
        try {
            switch (true) {
                case !book.State:
                    return setNotify({ ...notify, warning: true, message: "You must select a State" });
                case book.City.length <= 0:
                    return setNotify({ ...notify, warning: true, message: "City field cannot be blank" });
                default:
                    handleSearch();
            }
        } catch (error) {
            dispatch({ type: "ERROR_NOTIFY", payload: "Something went wrong :(" });
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
                                        style={{ color: "#21ce99" }}    
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
                                        style={{ color: "#21ce99" }}
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

                    <FormGroup className={classes.checkboxContainer} row>
                        {book.lfBooks.map((item, index) => {
                            if (!item.deleted) {
                                return (
                                        <FormControlLabel 
                                            control={
                                                <Checkbox
                                                    checked={item.checked}
                                                    onChange={() => handleToggle(index)}
                                                    name={item.value}
                                                    color="primary"
                                                />
                                            }
                                            label={item.value}
                                        />
                                        );
                                    } else return "";
                                })}
                    </FormGroup>

                    <Autocomplete
                        options={states}
                        getOptionLabel={option => option.title}
                        className={classes.inputs}
                        classes={{ inputRoot: classes.underline }}
                        value={{ title: book.State }}
                        onChange={(e, newValue) => handleAutocomplete(newValue, "State")}
                        renderInput={params => <TextField { ...params } label="State" InputLabelProps={{ classes: { focused: classes.label }}} />}
                    />

                    <TextField
                        className={classes.inputs}
                        InputProps={{ classes: { underline: classes.underline }}}
                        InputLabelProps={{ classes: { focused: classes.label }}}        
                        value={book.City}
                        onChange={(e) => handleInput(e, "City")}
                        label="City"
                    />

                    <Button
                        className={classes.search}
                        onClick={preSubmit}
                    >
                        Search
                    </Button>

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
        </>
    );
};
