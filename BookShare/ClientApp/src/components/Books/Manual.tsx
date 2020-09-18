import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { IManualProps, IState, initBook, initNotify } from './Interfaces/IBookQuery';
import { states } from '../Resources/index';

import { withStyles, createStyles } from '@material-ui/styles';
import {
    TextField,
    Button,
    FormControl,
    FormGroup,
    FormControlLabel,
    Switch
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';

const styles = () => createStyles({
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
        borderRadius: '20px',
        color: 'white',
        padding: 10,
        transition: 'background-color 0.4s ease',
        '&:hover': {
            backgroundColor: '#23de71',
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
});

class Manual extends Component<IManualProps, IState> {

    constructor(props: IManualProps) {
        super(props);
        this.state = {
            book: initBook,
            notify: initNotify
        };
    };

    componentDidUpdate() {
        try {
            if (!this.state.book.Imported && this.props.store.user) {
                const { user } = this.props.store;
                this.setState((state) => ({
                    ...state,
                    book: {
                        ...state.book,
                        lfBooks: user.lfBooks ? user.lfBooks.length > 0 ? user.lfBooks : [] : [],
                        City: user.city ? user.city : "",
                        State: user.state ? user.state : "",
                        Imported: true    
                    }
                }));
            }
        } catch (error) {
            this.props.dispatch({ type: "ERROR_NOTIFY", payload: "Something went wrong :(" });
        }
    };

    toggleFilter = (type: string): void => {
        try {
            let newValue: boolean;
            if (type === "Sale") newValue = !this.state.book.Sale;
            else newValue = !this.state.book.Trade;

            this.setState((state) => ({
                ...state,
                book: {
                    ...state.book,
                    [type]: newValue
                }
            }));
        } catch (error) {
            this.props.dispatch({ type: "ERROR_NOTIFY", payload: "Something went wrong :(" });
        }
    };

    handleInput = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, type: string): void => {
        try {
            const { value } = event.target;
            this.setState((state) => ({
                ...state,
                book: {
                    ...state.book,
                    [type]: value
                }
            }));
        } catch (error) {
            this.props.dispatch({ type: "ERROR_NOTIFY", payload: "Something went wrong :(" });
        }
    };

    handleAutocomplete = (value: any, type: string): void => {
        try {
            this.setState((state) => ({
                ...state,
                book: {
                    ...state.book,
                    [type]: value.title
                }
            }));
        } catch (error) {
            this.props.dispatch({ type: "ERROR_NOTIFY", payload: "Something went wrong :(" });
        }
    };

    handleClose = (): void => this.setState((state) => ({ ...state, notify: initNotify }));

    handleSearch = (): void =>  {
        try {
            const { Title, State, City, Sale, Trade } = this.state.book;
            this.props.history.push(`/books/1/${Title}/${State}/${City}/${Sale}/${Trade}`);
        } catch (error) {
            this.props.dispatch({ type: "ERROR_NOTIFY", payload: "Something went wrong :(" });
        }
    };

    preSubmit = (): void => {
        try {
            switch (true) {
                case this.state.book.Title.length <= 0:
                    return this.setState((state) => ({
                        ...state,
                        notify: {
                            ...state.notify,
                            warning: true,
                            message: "Book field is blank"
                        }
                    }));
                case !this.state.book.State:
                    return this.setState((state) => ({
                        ...state,
                        notify: {
                            ...state.notify,
                            warning: true,
                            message: "You must select a State"
                        }
                    }));
                case this.state.book.City.length <= 0:
                    return this.setState((state) => ({
                        ...state,
                        notify: {
                            ...state.notify,
                            warning: true,
                            message: "City field cannot be blank"
                        }
                    }));
                default:
                    this.handleSearch();
            }
        } catch (error) {
            this.props.dispatch({ type: "ERROR_NOTIFY", payload: "Something went wrong :(" });
        }
    };

    render(): JSX.Element {
        return (
            <>
                <FormControl>
                    <FormGroup className={this.props.classes.toggleRow} row>
                        <FormControlLabel
                            value={this.state.book.Sale}
                            control={
                                <Switch
                                    style={{ color: "#21ce99" }}    
                                    color="primary"
                                    onChange={() => this.toggleFilter("Sale")}
                                    checked={this.state.book.Sale}
                                />
                            }
                            label="For Sale"
                            labelPlacement="top"
                        />
                        <FormControlLabel
                            value={this.state.book.Trade}
                            control={
                                <Switch
                                    style={{ color: "#21ce99" }}    
                                    color="primary"
                                    onChange={() => this.toggleFilter("Trade")}
                                    checked={this.state.book.Trade}
                                />
                        }
                            label="For Trade"
                            labelPlacement="top"                    
                        />
                    </FormGroup>
                </FormControl>
    
                <TextField
                    className={this.props.classes.inputs}
                    InputProps={{ classes: { underline: this.props.classes.underline }}}
                    InputLabelProps={{ classes: { focused: this.props.classes.label }}}        
                    value={this.state.book.Title}
                    onChange={(e) => this.handleInput(e, "Title")}
                    label="Book Title"
                />
                <Autocomplete
                    options={states}
                    getOptionLabel={option => option.title}
                    className={this.props.classes.inputs}
                    classes={{ inputRoot: this.props.classes.underline }}
                    value={{ title: this.state.book.State }}
                    onChange={(e, newValue) => this.handleAutocomplete(newValue, "State")}
                    renderInput={params => (
                        <TextField
                            {...params}
                            label="State"
                            InputLabelProps={{
                                classes: {
                                    focused: this.props.classes.label
                                }
                            }}
                        />
                    )}
                />
    
                <TextField
                    className={this.props.classes.inputs}
                    InputProps={{ classes: { underline: this.props.classes.underline }}}
                    InputLabelProps={{ classes: { focused: this.props.classes.label }}}        
                    value={this.state.book.City}
                    onChange={(e) => this.handleInput(e, "City")}
                    label="City"
                />
    
                <Button
                    className={this.props.classes.search}
                    onClick={this.preSubmit}
                >
                    Search
                </Button>
            </>
        );
    };
};

export default connect()(withStyles(styles)(withRouter(Manual)));