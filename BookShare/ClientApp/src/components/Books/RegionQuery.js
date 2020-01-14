import React, { useState } from 'react';
import { withRouter } from 'react-router';

import { makeStyles } from '@material-ui/styles';
import {
    TextField,
    Typography,
    Button,
    Paper,
    Select,
    MenuItem
} from '@material-ui/core';

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
        padding: '10%',
        width: '95%'
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
        backgroundColor: '#5680E9',
        color: 'white',
        padding: 10,
        transition: 'background-color 0.4s ease',
        '&:hover': {
            backgroundColor: '#5AB9EA',
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

export default ({ history }) => {
    const classes = useStyles();

    const [info, setInfo] = useState({ ...initInfo });

    const handleInput = (type) => event => setInfo({ ...info, [type]: event.target.value });

    const handleSearch = () => {
        const { city, state, study } = info;
        history.push(`/books/${city}/${state}/${study}`);
    };

    return (
        <>
            <TextField
                className={classes.input}
                value={info.city}
                onChange={handleInput("city")}
                label="City"
            />

            <TextField
                className={classes.input}
                value={info.state}
                onChange={handleInput("state")}
                label="State"
            />

            <Select
                className={classes.input}
                value={info.study}
                onChange={handleInput("study")}
                label="Field of Study"
            >
                {fields.map((item) => {
                    return (
                        <MenuItem value={item} key={item}>
                            {item}
                        </MenuItem>
                    );
                })}
            </Select>

            <Button
                className={classes.search}
                onClick={handleSearch}
            >
                Search
            </Button>
        </>
    );
};
