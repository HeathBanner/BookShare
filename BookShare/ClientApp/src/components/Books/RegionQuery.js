import React, { useState } from 'react';

import Notify from '../Notifications/Notify';
import { states } from '../Resources/index';

import { makeStyles } from '@material-ui/styles';
import {
    TextField,
    Button,
    Paper,
    Select,
    MenuItem,
    Input
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';

const useStyles = makeStyles(() => ({
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
}));

const fields = ["Mathmatics", "History", "Medical", "Computer Science", "Psycology"];
const initInfo = {
    city: "",
    state: "",
    study: ""
};
const initNotify = {
    error: false,
    success: false,
    warning: false,
    message: ""
};

export default ({ history }) => {
    const classes = useStyles();

    const [info, setInfo] = useState({ ...initInfo });
    const [notify, setNotify] = useState({ ...initNotify });

    const handleInput = (type) => event => {
        setInfo({ ...info, [type]: event.target.value });
    };

    const handleAutocomplete = (value, type) => {
        setInfo({ ...info, [type]: value.title });
    };

    const handleClose = () => setNotify({ ...initNotify });

    const handleSearch = () => {
        const { city, state, study } = info;
        history.push(`/books/${city}/${state}/${study}`);
    };

    const preSubmit = () => {
        console.log("pre")
        switch (true) {
            case info.city.length <= 0:
                return setNotify({ ...notify, warning: true, message: "City field is blank" });
            case info.state.length <= 2:
                return setNotify({ ...notify, warning: true, message: "State name is too short" });
            default:
                return handleSearch();
        }
    };

    return (
        <Paper className={classes.paper}>
            <TextField
                className={classes.input}
                value={info.city}
                onChange={handleInput("city")}
                label="City"
                color="secondary"
            />

            <Autocomplete
                options={states}
                getOptionLabel={option => option.title}
                className={classes.input}
                value={{ title: info.state }}
                onChange={(e, newValue) => handleAutocomplete(newValue, "state")}
                renderInput={params => <TextField {...params} label="State" />}
            />

            <TextField
                label="Study"
                value={info.study}
                onChange={handleInput("study")}
                className={classes.input}
            />

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
        </Paper>
    );
};
