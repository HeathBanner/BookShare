import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Image from './Image';
import ValidationScreen from '../ScreenCatchers/ValidationScreen';
import Notify from '../Notifications/Notify';
import {
    fetchPost,
    preSubmit,
    initBook,
    initNotify,
    conditions,
    studies,
    states
} from './Services/PostServices';

import { makeStyles } from '@material-ui/styles';
import {
    Grid,
    Paper,
    Typography,
    TextField,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Input,
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
    inputContainers: {
        width: '100%',
        marginBottom: 20,
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'flex-end',
        alignItems: 'flex-end'
    },
    button: {
        padding: 10,
        backgroundColor: 'red',
        color: 'white',
        width: '100%'
    }
}));

export default () => {

    const classes = useStyles();
    const dispatch = useDispatch();
    const store = useSelector(state => state);

    const [book, setBook] = useState({ ...initBook });
    const [open, setOpen] = useState(false);
    const [notify, setNotify] = useState({ ...initNotify });

    const handleInput = (type, event) => {
        setBook({ ...book, [type]: event.target.value });
    };

    const handleSubmit = async () => {
        const flag = preSubmit(book, notify);

        if (flag.warning) return setNotify(flag);

        const result = await fetchPost(book, store.user.username);
        setNotify({ ...notify, ...result.notify });
        dispatch({ type: "UPDATE", payload: result.user });
    };

    const handleClose = () => setOpen(false);
    const handleImage = () => setOpen(true);

    const closeNotify = () => {
        if (notify.warning || notify.error) return setNotify({ ...initNotify });

        setNotify({ ...initNotify });
        setBook({ ...initBook });
    };

    if (!store.loggedIn) return <ValidationScreen />;
    return (
        <Grid className={classes.container} item xs={12}>
            <Paper className={classes.paper}>

                <img
                    src={book.Image ? book.Image : "data:image/jpeg;base64,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"}
                    alt="Book Field"
                    onClick={handleImage}
                    style={{ marginBottom: 20 }}
                />

                <Image
                    open={open}
                    handleClose={handleClose}
                    handleInput={handleInput}
                />

                <TextField
                    className={classes.inputs}
                    value={book.Title}
                    onChange={(e) => handleInput("Title", e)}
                    placeholder="Book Name"
                    inputProps={{
                        style: { fontSize: "1.5rem", textAlign: 'center' }
                    }}
                    color="secondary"
                />

                <TextField
                    className={classes.inputs}
                    value={book.Description}
                    onChange={(e) => handleInput("Description", e)}
                    placeholder="Description"
                    multiline={true}
                    color="secondary"
                />

                <FormControl style={{ flexGrow: 1 }}>
                    <InputLabel
                        id="condition-label"
                        color="secondary"
                    >
                        State
                        </InputLabel>
                    <Select
                        value={book.State}
                        onChange={(e) => handleInput("State", e)}
                        labelId="condition-label"
                        input={<Input color="secondary" />}
                    >
                        {states.map((item) => {
                            return <MenuItem value={item} key={item}>
                                {item}
                            </MenuItem>;
                        })}
                    </Select>
                </FormControl>

                <TextField
                    className={classes.inputs}
                    value={book.City}
                    onChange={(e) => handleInput("City", e)}
                    label="City"
                    color="secondary"
                />

                <div className={classes.inputContainers}>
                    <Typography
                        style={{ paddingBottom: 6, marginRight: 10 }}
                    >
                        Study:
                    </Typography>

                    <FormControl style={{ flexGrow: 1 }}>
                        <InputLabel
                            id="condition-label"
                            color="secondary"
                        >
                            Study
                        </InputLabel>
                        <Select
                            value={book.Study}
                            onChange={(e) => handleInput("Study", e)}
                            labelId="condition-label"
                            input={<Input color="secondary" />}
                        >
                            {studies.map((item) => {
                                return <MenuItem value={item} key={item}>
                                    {item}
                                </MenuItem>;
                            })}
                        </Select>
                    </FormControl>
                </div>


                <div className={classes.inputContainers}>
                    <Typography
                        style={{ paddingBottom: 6, marginRight: 10 }}
                    >
                        Condition:
                    </Typography>

                    <FormControl style={{ flexGrow: 1 }}>
                        <InputLabel
                            id="condition-label"
                            color="secondary"
                        >
                            Condition
                        </InputLabel>
                        <Select
                            value={book.Condition}
                            onChange={(e) => handleInput("Condition", e)}
                            labelId="condition-label"
                            input={<Input color="secondary" />}
                        >
                            {conditions.map((item) => {
                                return <MenuItem value={item} key={item}>
                                    {item}
                                </MenuItem>;
                            })}
                        </Select>
                    </FormControl>
                </div>

                <div className={classes.inputContainers}>
                    <Typography
                        style={{ paddingBottom: 6, marginRight: 10, flexGrow: 1 }}
                    >
                        External Media:
                    </Typography>

                    <TextField
                        style={{ flexGrow: 1 }}
                        value={book.eMedia}
                        onChange={(e) => handleInput("EMedia", e)}
                        placeholder="External Media"
                        color="secondary"
                    />
                </div>

                <div className={classes.inputContainers}>
                    <Typography
                        style={{ paddingBottom: 6, marginRight: 10, flexGrow: 1 }}
                    >
                        ISBN:
                    </Typography>

                    <TextField
                        style={{ flexGrow: 1 }}
                        value={book.ISBN}
                        onChange={(e) => handleInput("ISBN", e)}
                        placeholder="1111-2222-33333"
                        color="secondary"
                    />
                </div>

                <div className={classes.inputContainers}>
                    <Typography
                        style={{ paddingBottom: 6, marginRight: 10, flexGrow: 1 }}
                    >
                        Course ID:
                    </Typography>

                    <TextField
                        style={{ flexGrow: 1 }}
                        value={book.CourseId}
                        onChange={(e) => handleInput("CourseId", e)}
                        placeholder="1111-2222-33333"
                        color="secondary"
                    />
                </div>

                <Button
                    className={classes.button}
                    onClick={handleSubmit}
                >
                    Submit
                </Button>
            </Paper>

            <Notify
                handleClose={closeNotify}
                notification={notify}
            />
        </Grid>
    );
};
