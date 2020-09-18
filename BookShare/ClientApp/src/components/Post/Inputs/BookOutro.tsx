import React, { PureComponent } from 'react';

import { IBook } from '../Services/interfaces';
import { createStyles, withStyles } from '@material-ui/styles';
import { TextField } from '@material-ui/core';
import LFBook from '../LFBook';

const styles = () => createStyles({
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
            borderBottom: '2px solid #21ce99'
        },
        '&:hover:not($disabled):not($focused):not($error):before': {
            borderBottom: '2px solid #f50057'
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
});

interface IProps {
    book: IBook,
    handleInput: (type: string, event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
    bookInput: (type: string, param: string) =>  void;
    classes: any;
};

class BookOutro extends PureComponent<IProps> {
    render(): JSX.Element {
        return (
            <>
                <LFBook
                    lfBooks={this.props.book.lfBooks}
                    handleBooks={this.props.bookInput}
                />
    
                <div className={this.props.classes.inputContainers}>
                    <TextField
                        style={{ flexGrow: 1 }}
                        InputProps={{ classes: { underline: this.props.classes.underline }}}
                        InputLabelProps={{ classes: { focused: this.props.classes.label }}}    
                        value={this.props.book.isbn.value}
                        onChange={(e) => this.props.handleInput("isbn", e)}
                        label="ISBN"
                        placeholder="1111-2222-33333"
                        error={this.props.book.isbn.error}
                    />
                </div>
    
                <div className={this.props.classes.inputContainers}>
                    <TextField
                        style={{ flexGrow: 1 }}
                        InputProps={{ classes: { underline: this.props.classes.underline }}}
                        InputLabelProps={{ classes: { focused: this.props.classes.label }}}    
                        value={this.props.book.courseId.value}
                        onChange={(e) => this.props.handleInput("courseId", e)}
                        label="Course ID"
                        placeholder="1111-2222-33333"
                        error={this.props.book.courseId.error}
                    />
                </div>
            </>
        );
    };
};

export default withStyles(styles)(BookOutro);