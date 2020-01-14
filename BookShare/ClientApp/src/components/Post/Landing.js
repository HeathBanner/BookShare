import React, { useState } from 'react';

import { makeStyles } from '@material-ui/styles';
import {
    Grid,
    Paper,
    Typography,
    Divider,
    TextField,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Button
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '10%'
    },
    paper: {
        display: 'flex',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
        padding: '5%',
    },
    title: {
        width: '100%',
        textAlign: 'center'
    },
    divider: {
        marginBlockCenter: '0.5em',
        width: '40%',
        backgroundColor: 'rgb(0, 0, 0, 0.2)',
        marginBottom: 30,
    },
    inputs: {
        width: '100%',
        marginBottom: 20
    },
    button: {
        padding: 10,
        backgroundColor: 'red',
        color: 'white',
        width: '100%'
    }
}));

const initBook = {
    Image: "",
    Title: "",
    Description: "",
    Condition: "",
    EMedia: "",
    State: "",
    City: "",
    Study: ""
};

const conditions = ["Mint", "Good", "Fair", "Rough"];
const studies = ["Mathmatics", "History", "Medical", "Computer Science", "Psycology"];

export default () => {

    const classes = useStyles();

    const [book, setBook] = useState({ ...initBook });

    const handleInput = (type, event) => {
        setBook({ ...book, [type]: event.target.value });
    };

    const handleSubmit = async () => {
        const options = {
            method: 'POST',
            body: JSON.stringify({
                ...book,
                Owner: "Heath",
            }),
            headers: { "Content-Type": "application/json" }
        };

        const res = await fetch("api/Book", options);
        const json = await res.json();

        console.log(json);
    };

    return (
        <Grid className={classes.container} item xs={12}>
            <Paper className={classes.paper}>
                <Typography
                    className={classes.title}
                    variant="h5"
                >
                    Post a Booksie
                </Typography>

                <Divider className={classes.divider} />

                <TextField
                    className={classes.inputs}
                    value={book.State}
                    onChange={(e) => handleInput("State", e)}
                    label="State"
                />

                <TextField
                    className={classes.inputs}
                    value={book.City}
                    onChange={(e) => handleInput("City", e)}
                    label="City"
                />

                <FormControl className={classes.inputs}>
                    <InputLabel id="condition-label">Study</InputLabel>
                    <Select
                        value={book.Study}
                        onChange={(e) => handleInput("Study", e)}
                        labelId="condition-label"
                    >
                        {studies.map((item) => {
                            return <MenuItem value={item} key={item}>
                                {item}
                            </MenuItem>;
                        })}
                    </Select>
                </FormControl>

                <TextField
                    className={classes.inputs}
                    value={book.Image}
                    onChange={(e) => handleInput("Image", e)}
                    label="Photo"
                />
                <TextField
                    className={classes.inputs}
                    value={book.Title}
                    onChange={(e) => handleInput("Title", e)}
                    label="Book Name"
                />
                <TextField
                    className={classes.inputs}
                    value={book.Description}
                    onChange={(e) => handleInput("Description", e)}
                    label="Description"
                />
                <FormControl className={classes.inputs}>
                    <InputLabel id="condition-label">Condition</InputLabel>
                    <Select
                        value={book.Condition}
                        onChange={(e) => handleInput("Condition", e)}
                        labelId="condition-label"
                    >
                        {conditions.map((item) => {
                            return <MenuItem value={item} key={item}>
                                {item}
                            </MenuItem>;
                        })}
                    </Select>
                </FormControl>

                <TextField
                    className={classes.inputs}
                    value={book.eMedia}
                    onChange={(e) => handleInput("EMedia", e)}
                    label="External Media"
                />

                <Button
                    className={classes.button}
                    onClick={handleSubmit}
                >
                    Submit
                </Button>
            </Paper>
        </Grid>
    );
};
