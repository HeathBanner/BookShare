import React from 'react';

import { makeStyles } from '@material-ui/styles';
import { TextField } from '@material-ui/core';
import LFBook from '../LFBook';

const useStyles = makeStyles(() => ({
    inputContainers: {
        width: '100%',
        marginBottom: 20,
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'flex-end',
        alignItems: 'flex-end'
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

export default ({ book, handleInput, bookInput }) => {

    const classes = useStyles();

    return (
        <>
            <LFBook
                lfBooks={book.lfBooks}
                handleBooks={bookInput}
            />

            <div className={classes.inputContainers}>
                <TextField
                    style={{ flexGrow: 1 }}
                    InputProps={{ classes: { underline: classes.underline }}}
                    InputLabelProps={{ classes: { focused: classes.label }}}    
                    value={book.isbn.value}
                    onChange={(e) => handleInput("isbn", e)}
                    label="ISBN"
                    placeholder="1111-2222-33333"
                    error={book.isbn.error}
                />
            </div>

            <div className={classes.inputContainers}>
                <TextField
                    style={{ flexGrow: 1 }}
                    InputProps={{ classes: { underline: classes.underline }}}
                    InputLabelProps={{ classes: { focused: classes.label }}}    
                    value={book.courseId.value}
                    onChange={(e) => handleInput("courseId", e)}
                    label="Course ID"
                    placeholder="1111-2222-33333"
                    error={book.courseId.error}
                />
            </div>
        </>
    );
};