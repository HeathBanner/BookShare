import React from 'react';

import { states } from '../../Resources/index';

import { makeStyles } from '@material-ui/styles';
import {
    Paper,
    TextField,
    Button
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';

const useStyles = makeStyles(() => ({
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
        padding: '5%',
        width: '80%'
    },
    inputs: {
        width: '100%',
        marginBottom: 20
    },
    button: {
        width: '100%',
        padding: 10,
        color: 'white',
        backgroundColor: '#E98074',
        transition: 'background-color 0.4s ease',
        '&:hover': {
            backgroundColor: '#E85A4F',
            color: 'white'
        }
    }
}));

export default ({ location, handleChange, handleAutocomplete, handleSave }) => {

    const classes = useStyles();
    const { city, state } = location;

    return (
        <Paper className={classes.paper}>
            <TextField
                className={classes.inputs}
                value={city}
                onChange={(e) => handleChange(e, "location", "city")}
                label="City"
            />

            <Autocomplete
                options={states}
                getOptionLabel={option => option.title}
                className={classes.inputs}
                value={{ title: state }}
                onChange={(e, newValue) => handleAutocomplete(newValue, "state")}
                renderInput={params => <TextField {...params} label="State" />}
            />

            <Button
                className={classes.button}
                onClick={() => handleSave("location")}
            >
                Save
            </Button>
        </Paper>
    );
};
