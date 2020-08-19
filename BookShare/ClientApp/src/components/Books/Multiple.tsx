import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { IProps, initBook, initNotify } from './Interfaces/IBookQuery';
import { states } from '../Resources/index';

import { withStyles, createStyles } from '@material-ui/styles';
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

const styles = () => createStyles({
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
});


interface ILFBooks {
    value : string;
    checked : boolean;
};

interface IBook {
    lfBooks : ILFBooks[];
    trash : string[];
    Title : string;
    State : string;
    City : string;
    Sale : boolean;
    Trade : boolean;
    Imported : boolean;
};

interface INotify {
    error : boolean;
    success : boolean;
    warning : boolean;
    message : string;
};

interface IState {
    book : IBook;
    notify : INotify;
};

class Multiple extends Component<IProps, IState> {

    constructor(props : IProps) {
        super(props);
        this.state = {
            book: initBook,
            notify: initNotify
        };
    };

    componentDidUpdate() {
        try {
            if (!this.state.book.Imported && this.props.store.user) {
                let lfBooks : ILFBooks[];
                const { user } = this.props.store;
                if (user.lfBooks && user.lfBooks.length > 0) {
                    user.lfBooks.forEach((item : string) => {
                        lfBooks.push({
                            value: item,
                            checked: false
                        });
                    });
                }

                this.setState((state) => ({
                    ...state,
                    book: {
                        ...state.book,
                        lfBooks: user.lfBooks ? user.lfBooks.length > 0 ? lfBooks : [] : [],
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

    toggleFilter = (type : string) => {
        try {
            let newValue : boolean;
            if (type === "Sale") newValue = this.state.book.Sale;
            else newValue = this.state.book.Trade;

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

    handleInput = (event : React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, type : string) => {
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

    handleAutocomplete(value : any, type : string) {
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

    handleToggle(index : number) {
        try {
            let newList : ILFBooks[] = this.state.book.lfBooks;
            newList[index].checked = !newList[index].checked;
            this.setState((state) => ({
                ...state,
                book: {
                    ...state.book,
                    lfBooks: newList
                }
            }));
        } catch (error) {
            this.props.dispatch({ type: "ERROR_NOTIFY", payload: "Something went wrong :(" });
        }
    };

    handleSearch() {
        try {
            const { lfBooks, State, City, Sale, Trade } = this.state.book;
            let list : string = "";
            lfBooks.forEach((item) => {
                if (!list && item.checked) return list = item.value;
                else if (item.checked) return list = `${list}&${item.value}`;
                else return;
            });
    
            this.props.history.push(`/bookList/1/${State}/${City}/${list}/${Sale}/${Trade}`);
        } catch (error) {
            this.props.dispatch({ type: "ERROR_NOTIFY", payload: "Something went wrong :(" });
        }
    };

    preSubmit() {
        try {
            const { book } = this.state;
            switch (true) {
                case !book.State:
                    return this.setState((state) => ({
                        ...state,
                        notify: {
                            ...state.notify,
                            warning: true,
                            message: "You must select a State"
                        }
                    }));
                case book.City.length <= 0:
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

    render() {
        const flag : boolean = this.props.store.user && this.props.store.user.lfBooks;

        if (flag) {
            return (
                <>
                    <Typography className={this.props.classes.warningMessage} variant="body2">
                        It appears you do not have any books of interest saved.
                        Would you like to do that now?
                    </Typography>
                    <Button
                        onClick={this.props.toggleValidation}
                        className={this.props.classes.helperButtons}
                    >
                        Books of Interest
                    </Button>
                    <Button
                        onClick={() => this.props.changeTab(2)}
                        className={this.props.classes.helperButtons}
                    >
                        Search Manually
                    </Button>
                </>
            );
        }
        if (this.props.store.user.lfBooks.length > 0) {
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

                    <Typography style={{ width: '100%', textAlign: 'center', marginTop: 20 }}>
                        Book List to Search
                    </Typography>

                    <FormGroup className={this.props.classes.checkboxContainer} row>
                        {this.state.book.lfBooks.map((item, index) => {
                            if (!item.checked) {
                                return (
                                    <FormControlLabel 
                                        control={
                                            <Checkbox
                                                checked={item.checked}
                                                onChange={() => this.handleToggle(index)}
                                                name={item.value}
                                                color="primary"
                                            />
                                        }
                                        label={item.value}
                                    />
                                );
                            } 
                            else return "";
                        })}
                    </FormGroup>

                    <Autocomplete
                        options={states}
                        getOptionLabel={option => option.title}
                        className={this.props.classes.inputs}
                        classes={{ inputRoot: this.props.classes.underline }}
                        value={{ title: this.state.book.State }}
                        onChange={(e, newValue) => this.handleAutocomplete(newValue, "State")}
                        renderInput={params => <TextField { ...params } label="State" InputLabelProps={{ classes: { focused: this.props.classes.label }}} />}
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
        } else {
            return (
                <>
                    <Typography className={this.props.classes.warningMessage} variant="body2">
                        It appears you do not have any books of interest saved.
                        Would you like to do that now?
                    </Typography>
                    <Button
                        onClick={this.props.toggleValidation}
                        className={this.props.classes.helperButtons}
                    >
                        Books of Interest
                    </Button>
                    <Button
                        onClick={() => this.props.changeTab(2)}
                        className={this.props.classes.helperButtons}
                    >
                        Search Manually
                    </Button>
                </>
            );
        }
    };
};

const mapStateToProps = (state : any) => ({ store: state });

export default connect(mapStateToProps)(withStyles(styles)(withRouter(Multiple)));