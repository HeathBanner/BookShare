import React, { useState } from 'react';

import Notify from '../Notifications/Notify';

import { makeStyles } from '@material-ui/styles';
import {
    TextField,
    Select,
    MenuItem,
    Button,
    Input
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
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

const fields = ["Mathmatics", "History", "Medical", "Computer Science", "Psycology"];
const initBook = { Title: "", Study: "" };
const initNotify = {
    error: false,
    success: false,
    warning: false,
    message: ""
};

export default ({ history }) => {

    const classes = useStyles();

    const [book, setBook] = useState({ ...initBook });
    const [notify, setNotify] = useState({ ...initNotify });

    const handleInput = (event, type) => {
        setBook({ ...book, [type]: event.target.value });
    };

    const handleClose = () => setNotify({ ...initNotify });

    const handleSearch = () => {
        const { Title, Study } = book;
        history.push(`/books/${Title}/${Study}`);
    };

    const preSubmit = () => {
        if (book.Title.length <= 0) {
            return setNotify({ ...notify, warning: true, message: "Book field is blank" });
        }

        handleSearch();
    };

    return (
        <>
            <TextField
                className={classes.inputs}
                value={book.Title}
                onChange={(e) => handleInput(e, "Title")}
                label="Book"
            />

            <Select
                className={classes.inputs}
                value={book.Study}
                onChange={(e) => handleInput(e, "Study")}
                label="Field of Study"
                input={<Input color="secondary" />}
            >
                {fields.map((item) => {
                    return (
                        <MenuItem value={item} key={item}>
                            {item}
                        </MenuItem>
                    );
                })}
            </Select>

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
