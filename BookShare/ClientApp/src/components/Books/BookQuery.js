import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux'; 

import { states } from '../Resources/index';

import { makeStyles } from '@material-ui/styles';
import {
    TextField,
    Select,
    MenuItem,
    Button,
    Input,
    FormControl,
    FormGroup,
    FormControlLabel,
    InputLabel,
    Typography,
    Switch
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';

const useStyles = makeStyles(() => ({
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
    lfBooks: "",
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
            if (!book.Imported && store.user) {
                setBook({
                    ...book,
                    lfBooks: store.user.lfBooks ? store.user.lfBooks.length > 0 ? store.user.lfBooks : [] : [],
                    City: store.user.city ? store.user.city : "",
                    State: store.user.state ? store.user.state : "",
                    Imported: true
                });
            }
        } catch (error) {
            dispatch({ type: "ERROR_NOTIFY", payload: "Something went wrong :(" });
        }
    }, [store, book]);

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

    const handleSearch = () => {
        try {
            const { Title, State, City } = book;
            const filter = `${book.Sale ? "Y" : "N"}/${book.Trade ? "Y" : "N"}`;
            props.history.push(`/books/1/${Title}/${State}/${City}/${filter}`);
        } catch (error) {
            dispatch({ type: "ERROR_NOTIFY", payload: "Something went wrong :(" });
        }
    };

    const preSubmit = () => {
        switch (true) {
            case book.Title.length <= 0:
                return dispatch({ type: "WARNING_NOTIFY", payload: "Book field is blank" });
            case !book.State:
                return dispatch({ type: "WARNING_NOTIFY", payload: "You must select a State" });
            case book.City.length <= 0:
                return dispatch({ type: "WARNING_NOTIFY", payload: "City field cannot be blank" });
            default:
                handleSearch();
        }
    };

    const toggleFilter = (type) => {
        try {
            const newValue = !book[type];
            setBook({ ...book, [type]: newValue });
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

                    <FormControl className={classes.inputs}>
                        <InputLabel classes={{ focused: classes.label }}>Book to Search</InputLabel>
                        <Select
                            value={book.Title}
                            onChange={(e) => handleInput(e, "Title")}
                            label="Title"
                            input={<Input classes={{ underline: classes.underline }} />}
                        >
                            {store.user.lfBooks.map((item) => {
                                return (
                                    <MenuItem value={item} key={item}>
                                        {item}
                                    </MenuItem>
                                );
                            })}
                        </Select>
                    </FormControl>

                    <Autocomplete
                        options={states}
                        getOptionLabel={option => option.title}
                        className={classes.inputs}
                        classes={{ inputRoot: classes.underline }}
                        value={{ title: book.State }}
                        onChange={(e, newValue) => handleAutocomplete(newValue, "State")}
                        renderInput={params => <TextField {...params} label="State" InputLabelProps={{ classes: { focused: classes.label }}} />}
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
