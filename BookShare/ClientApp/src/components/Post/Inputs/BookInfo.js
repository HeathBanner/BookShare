import React from 'react';

import * as services from '../Services/PostServices';

import { makeStyles } from '@material-ui/styles';
import {
    TextField,
    InputLabel,
    FormControl,
    FormHelperText,
    Select,
    Input,
    MenuItem
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';

const useStyles = makeStyles(() => ({
    inputs: {
        width: '100%',
        marginBottom: 20,
        '&:underline': {
            '&:before': {
                borderBottom: '1px solid #21ce99'
            },
            '&:after': {
                borderBottom: `2px solid #21ce99`
            },
            '&:hover:not($disabled):not($focused):not($error):before': {
                borderBottom: `2px solid #f50057`
            }
        }
    },
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

export default ({ book, handleInput, handleAutocomplete }) => {
    
    const classes = useStyles();

    return (
        <>
            <Autocomplete
                options={services.states}
                getOptionLabel={option => option.title}
                className={classes.inputs}
                classes={{ inputRoot: classes.underline }}
                value={{ title: book.state.value }}
                onChange={(e, newValue) => handleAutocomplete(newValue, "state")}
                renderInput={params => <TextField { ...params} label="State" InputLabelProps={{ classes: { focused: classes.label }}} />}
            />

            <TextField
                className={classes.inputs}
                InputProps={{ classes: { underline: classes.underline }}}
                InputLabelProps={{ classes: { focused: classes.label }}}
                value={book.city.value}
                onChange={(e) => handleInput("city", e)}
                label="City"
                helperText="required"
                error={book.city.error}
            />
            
            <div className={classes.inputContainers}>
                <FormControl style={{ flexGrow: 1 }}>
                    <InputLabel
                        id="condition-label"
                        classes={{ focused: classes.label }}
                    >
                        Study
                    </InputLabel>
                    <Select
                        value={book.study.value}
                        onChange={(e) => handleInput("study", e)}
                        labelId="condition-label"
                        input={<Input
                            classes={{ underline: classes.underline }}
                            helperText="required"
                            error={book.study.error}
                        />}
                    >
                        {services.studies.map((item) => {
                            return <MenuItem value={item} key={item}>
                                {item}
                            </MenuItem>;
                        })}
                    </Select>
                    <FormHelperText>required</FormHelperText>
                </FormControl>
            </div>


            <div className={classes.inputContainers}>
                <FormControl style={{ flexGrow: 1 }}>
                    <InputLabel
                        id="condition-label"
                        classes={{ focused: classes.label }}
                    >
                        Condition
                    </InputLabel>
                    <Select
                        value={book.condition.value}
                        onChange={(e) => handleInput("condition", e)}
                        labelId="condition-label"
                        input={<Input
                            classes={{ underline: classes.underline }}
                            error={book.condition.error}
                        />}
                    >
                        {services.conditions.map((item) => {
                            return <MenuItem value={item} key={item}>
                                {item}
                            </MenuItem>;
                        })}
                    </Select>
                    <FormHelperText>required</FormHelperText>
                </FormControl>
            </div>

            <div className={classes.inputContainers}>
                <TextField
                    style={{ flexGrow: 1 }}
                    InputProps={{ classes: { underline: classes.underline }}}
                    value={book.eMedia.value}
                    onChange={(e) => handleInput("eMedia", e)}
                    placeholder="External Media"
                    error={book.eMedia.error}
                />
            </div>

            <div className={classes.inputContainers}>
                <TextField
                    style={{ flexGrow: 1 }}
                    InputProps={{ classes: { underline: classes.underline }}}
                    value={book.price.value}
                    onChange={(e) => handleInput("price", e)}
                    placeholder="Price"
                    error={book.price.error}
                />
            </div>
        </>
    );
};