import React, { useState } from 'react';

import { makeStyles } from '@material-ui/styles';
import {
    TextField,
    Select,
    MenuItem,
    Button
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
    inputs: {
        width: '100%',
        marginBottom: 20
    },
    search: {
        width: '100%',
        backgroundColor: '#5680E9',
        color: 'white',
        padding: 10,
        transition: 'background-color 0.4s ease',
        '&:hover': {
            backgroundColor: '#5AB9EA',
            color: 'white'
        }
    }
}));

const fields = ["Mathmatics", "History", "Medical", "Computer Science", "Psycology"];
const initBook = { Title: "", Study: "" };

export default ({ history }) => {

    const classes = useStyles();

    const [book, setBook] = useState({ ...initBook });

    const handleInput = (event, type) => {
        setBook({ ...book, [type]: event.target.value });
    };

    const handleSearch = () => {
        const { Title, Study } = book;
        history.push(`/books/${Title}/${Study}`);
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
                onClick={handleSearch}
            >
                Search
            </Button>
        </>
    );
};
