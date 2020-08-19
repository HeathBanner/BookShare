import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { History, LocationState } from 'history';
import { withRouter } from 'react-router-dom';

import { states } from '../Resources/index';

import { withStyles, createStyles } from '@material-ui/styles';
import { TextField, Button, Paper } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';

const styles = () => createStyles({
    container: {
        display: 'flex',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
        padding: '10%',
        backgroundColor: '#8860D0',
        height: '100vh'
    },
    header: {
        width: '100%',
        color: '#5980E9',
        marginBottom: 30,
        textAlign: 'center'
    },
    paper: {
        display: 'flex',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        padding: '10%',
        width: '70%'
    },
    modal: {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        display: 'flex',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
        padding: '10%',
        width: '95%'
    },
    input: {
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
});

const initInfo = {
    city: "",
    state: "",
    study: ""
};

interface IProps extends RouteComponentProps {
    history : History<LocationState>;
    classes : any;
    dispatch : any;
    isModal : boolean;
};

interface IInfo {
    city : string;
    state : string;
    study : string;
};

interface IState {
    info : IInfo;
};

class RegionQuery extends Component<IProps, IState> {

    constructor(props : IProps) {
        super(props);
        this.state = {
            info : initInfo
        };
    };
    
    handleInput = (type : string) => (event : React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) : void => {
        try {
            const { value } = event.target;
            this.setState((state) => ({
                info: {
                    ...state.info,
                    [type]: value
                }
            }));
        } catch (error) {
            this.props.dispatch({ type: "ERROR_NOTIFY", payload: "Something went wrong :(" });
        }
    };

    handleAutocomplete(value : any, type : string) : void {
        try {
            this.setState((state) => ({
                info: {
                    ...state.info,
                    [type]: value.title
                }
            }));
        } catch (error) {
            this.props.dispatch({ type: "ERROR_NOTIFY", payload: "Something went wrong :(" });
        }
    };

    handleSearch() {
        try {
            const { city, state, study } = this.state.info;
            this.props.history.push(`/books/${city}/${state}/${study}`);
        } catch (error) {
            this.props.dispatch({ type: "ERROR_NOTIFY", payload: "Something went wrong :(" });
        }
    };

    preSubmit() {
        try {
            switch (true) {
                case this.state.info.city.length <= 0:
                    return this.props.dispatch({ type: "WARNING_NOTIFY", payload: "City field is blank" });
                case this.state.info.state.length <= 2:
                    return this.props.dispatch({ type: "WARNING_NOTIFY", payload: "State name is too short" });
                default:
                    return this.handleSearch();
            }
        } catch (error) {
            this.props.dispatch({ type: "ERROR_NOTIFY", payload: "Something went wrong :(" });
        }
    };

    render() {
        return (
            <Paper className={this.props.classes.paper}>
                <TextField
                    className={this.props.classes.input}
                    value={this.state.info.city}
                    onChange={this.handleInput("city")}
                    label="City"
                    color="secondary"
                />
    
                <Autocomplete
                    options={states}
                    getOptionLabel={option => option.title}
                    className={this.props.classes.input}
                    value={{ title: this.state.info.state }}
                    onChange={(e, newValue) => this.handleAutocomplete(newValue, "state")}
                    renderInput={params => <TextField {...params} label="State" />}
                />
    
                <TextField
                    label="Study"
                    value={this.state.info.study}
                    onChange={this.handleInput("study")}
                    className={this.props.classes.input}
                />
    
                <Button
                    className={this.props.classes.search}
                    onClick={this.preSubmit}
                >
                    Search
                </Button>
    
            </Paper>
        );
    };
};

export default connect()(withStyles(styles)(withRouter(RegionQuery)));
