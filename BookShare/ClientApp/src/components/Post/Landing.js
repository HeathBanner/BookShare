import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Image from './Image';
import ImagePlaceholder from './AddImage.png';
import LFBook from './LFBook';
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
    FormHelperText,
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

    useEffect(() => {
        console.log(book);
    }, [book]);

    const handleInput = (type, event) => {
        setBook({ ...book, [type]: { error: false, value: event.target.value } });
    };

    const handleSubmit = async () => {
        const flag = preSubmit(book, notify);

        if (flag.notify.warning) {
            console.log(flag);
            setBook(flag.book);
            return setNotify(flag.notify);
        }

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

    const addBook = (title) => {
        let newList = book.LFBooks;
        newList.push(title);

        setBook({ ...book, LFBooks: newList });
    };
    const removeBook = (index) => {
        let newList = book.LFBooks;
        newList.splice(index, 1);

        setBook({ ...book, LFBooks: newList });
    };
    const notifyBook = (notification) => setNotify({ ...notify, ...notification });

    if (!store.loggedIn) return <ValidationScreen />;
    return (
        <Grid className={classes.container} item xs={12}>
            <Paper className={classes.paper}>

                <img
                    src={book.Image.value ? book.Image.value : ImagePlaceholder}
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
                    value={book.Title.value}
                    onChange={(e) => handleInput("Title", e)}
                    placeholder="Book Name"
                    inputProps={{
                        style: { fontSize: "1.5rem", textAlign: 'center' }
                    }}
                    color="secondary"
                    helperText="required"
                    error={book.Title.error}
                />

                <TextField
                    className={classes.inputs}
                    value={book.Description.value}
                    onChange={(e) => handleInput("Description", e)}
                    placeholder="Description"
                    multiline={true}
                    color="secondary"
                    helperText="required"
                    error={book.Description.error}
                />

                <FormControl style={{ flexGrow: 1 }}>
                    <InputLabel
                        id="condition-label"
                        color="secondary"
                    >
                        State
                    </InputLabel>
                    <Select
                        value={book.State.value}
                        onChange={(e) => handleInput("State", e)}
                        labelId="condition-label"
                        input={<Input
                            color="secondary"
                            helperText="required"
                            error={book.State.error}
                        />}
                    >
                        {states.map((item) => {
                            return (
                                <MenuItem value={item} key={item}>
                                    {item}
                                </MenuItem>
                            );
                        })}
                    </Select>
                    <FormHelperText>required</FormHelperText>
                </FormControl>

                <TextField
                    className={classes.inputs}
                    value={book.City.value}
                    onChange={(e) => handleInput("City", e)}
                    label="City"
                    color="secondary"
                    helperText="required"
                    error={book.City.error}
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
                            value={book.Study.value}
                            onChange={(e) => handleInput("Study", e)}
                            labelId="condition-label"
                            input={<Input
                                color="secondary"
                                helperText="required"
                                error={book.Study.error}
                            />}
                        >
                            {studies.map((item) => {
                                return <MenuItem value={item} key={item}>
                                    {item}
                                </MenuItem>;
                            })}
                        </Select>
                        <FormHelperText>required</FormHelperText>
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
                            value={book.Condition.value}
                            onChange={(e) => handleInput("Condition", e)}
                            labelId="condition-label"
                            input={<Input
                                color="secondary"
                                error={book.Condition.error}
                            />}
                        >
                            {conditions.map((item) => {
                                return <MenuItem value={item} key={item}>
                                    {item}
                                </MenuItem>;
                            })}
                        </Select>
                        <FormHelperText>required</FormHelperText>
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
                        value={book.EMedia.value}
                        onChange={(e) => handleInput("EMedia", e)}
                        placeholder="External Media"
                        color="secondary"
                        error={book.EMedia.error}
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
                        value={book.ISBN.value}
                        onChange={(e) => handleInput("ISBN", e)}
                        placeholder="1111-2222-33333"
                        color="secondary"
                        error={book.ISBN.error}
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
                        value={book.CourseId.value}
                        onChange={(e) => handleInput("CourseId", e)}
                        placeholder="1111-2222-33333"
                        color="secondary"
                        error={book.CourseId.error}
                    />
                </div>

                <LFBook
                    addBook={addBook}
                    removeBook={removeBook}
                    notifyBook={notifyBook}
                    list={book.LFBooks}
                />

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
