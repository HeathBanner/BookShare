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
        backgroundColor: '#21ce99',
        transition: 'background-color 0.4s ease',
        '&:hover': {
            backgroundColor: '#1cedad',
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
}));

export default ({ location, handleChange, handleAutocomplete, handleSave }) => {

    const classes = useStyles();
    const { city, state } = location;

    return (
        <Paper className={classes.paper}>
            <TextField
                className={classes.inputs}
                InputProps={{ classes: { underline: classes.underline }}}
                InputLabelProps={{ classes: { focused: classes.label }}}    
                value={city}
                onChange={(e) => handleChange(e, "location", "city")}
                label="City"
            />

            <Autocomplete
                options={states}
                getOptionLabel={option => option.title}
                className={classes.inputs}
                classes={{ inputRoot: classes.underline }}
                value={{ title: state }}
                onChange={(e, newValue) => handleAutocomplete(newValue.title, "state")}
                renderInput={params => <TextField {...params} label="State" InputLabelProps={{ classes: { focused: classes.label }}} />}
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
