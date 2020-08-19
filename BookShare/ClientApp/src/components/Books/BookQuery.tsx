import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import * as interfaces from './Interfaces/IBookQuery';
import { states } from '../Resources/index';

import { createStyles, withStyles } from '@material-ui/styles';
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
});

class BookQuery extends Component<interfaces.IProps, interfaces.IState> {

    constructor(props : interfaces.IProps) {
        super(props);
        this.state = {
            book: interfaces.initBook,
            notify: interfaces.initNotify
        };
    };

    componentDidUpdate() {
        try {
            const { store } = this.props;
            if (!this.state.book.Imported && this.props.store.user) {
                this.setState((state) => ({
                    ...state,
                    book: {
                        ...state.book,
                        lfBooks: store.user.lfBooks ? store.user.lfBooks.length > 0 ? store.user.lfBooks : [] : [],
                        City: store.user.city ? store.user.city : "",
                        State: store.user.state ? store.user.state : "",
                        Imported: true    
                    }
                }));
            }
        } catch (error) {
            this.props.dispatch({ type: "ERROR_NOTIFY", payload: "Something went wrong :(" });
        }
    };

    handleInput = (type : string, event : React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
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

    handleSelect = (type : string, event : React.ChangeEvent<{ value : unknown }>) => {
        try {
            const { value } = event.currentTarget;
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

    handleSearch() : void {
        try {
            const { Title, State, City, Sale, Trade } = this.state.book;
            const filter = `${Sale ? "Y" : "N"}/${Trade ? "Y" : "N"}`;
            this.props.history.push(`/books/1/${Title}/${State}/${City}/${filter}`);
        } catch (error) {
            this.props.dispatch({ type: "ERROR_NOTIFY", payload: "Something went wrong :(" });
        }
    };

    preSubmit() : void {
        const { Title, State, City } = this.state.book;
        switch (true) {
            case Title.length <= 0:
                return this.props.dispatch({ type: "WARNING_NOTIFY", payload: "Book field is blank" });
            case !State:
                return this.props.dispatch({ type: "WARNING_NOTIFY", payload: "You must select a State" });
            case City.length <= 0:
                return this.props.dispatch({ type: "WARNING_NOTIFY", payload: "City field cannot be blank" });
            default:
                this.handleSearch();
        }
    };

    toggleFilter(type : string) : void {
        try {
            let newValue : boolean;
            switch(type) {
                case "Sale":
                    newValue = !this.state.book.Sale;
                    break;
                case "Trade":
                    newValue = !this.state.book.Trade;
                    break;
                case "Imported":
                    newValue = !this.state.book.Imported;
                    break;
                default:
                    break;
            };
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

                    <FormControl className={this.props.classes.inputs}>
                        <InputLabel classes={{ focused: this.props.classes.label }}>Book to Search</InputLabel>
                        <Select
                            value={this.state.book.Title}
                            onChange={(e) => this.handleSelect("Title", e)}
                            label="Title"
                            input={<Input classes={{ underline: this.props.classes.underline }} />}
                        >
                            {this.props.store.user.lfBooks.map((item : string) => {
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
                        className={this.props.classes.inputs}
                        classes={{ inputRoot: this.props.classes.underline }}
                        value={{ title: this.state.book.State }}
                        onChange={(e, newValue) => this.handleAutocomplete(newValue, "State")}
                        renderInput={params => (
                            <TextField
                                {...params}
                                label="State"
                                InputLabelProps={{
                                    classes:{
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
                        onChange={(e) => this.handleInput("City", e)}
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

export default connect(mapStateToProps)(withStyles(styles)(withRouter(BookQuery)));