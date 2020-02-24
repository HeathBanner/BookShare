import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Image from './Image';
import ImagePlaceholder from './AddImage.png';
import Background from './imgs/jaredd-craig.png';
import LFBook from './LFBook';
import ValidationScreen from '../ScreenCatchers/ValidationScreen';
import Notify from '../Notifications/Notify';
import {
    fetchPost,
    fetchEdit,
    fetchById,
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
        padding: '10%',
        minHeight: '100vh',
        backgroundImage: `url(${Background})`,
        backgroundSize: 'cover'
    },
    paper: {
        display: 'flex',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
        padding: '5%',
        marginTop: 50
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

export default ({ editId }) => {

    const classes = useStyles();
    const dispatch = useDispatch();
    const store = useSelector(state => state);

    const [book, setBook] = useState({ ...initBook });
    const [open, setOpen] = useState(false);
    const [notify, setNotify] = useState({ ...initNotify });

    useEffect(() => {
        if (!editId) return;

        handleBook(editId);
    }, []);

    const handleBook = async () => {
        const result = await fetchById(editId);

        if (result.warning) return console.log("WARNING");

        setBook(result.book);
    };

    const handleInput = (type, event) => {
        if (type === "image") return saveImage(type, event.target.files[0]);
        console.log(type, event.target.value);
        setBook({ ...book, [type]: { error: false, value: event.target.value } });
    };

    const saveImage = (type, blob) => {
        let reader = new FileReader();
        reader.onload = (e) => {
            console.log(e, e.target.result);
            const result = e.target.result;
            const parsed = result.split("base64,");
            console.log(parsed);
            return setBook({
                ...book,
                [type]: {
                    error: false,
                    value: parsed[1],
                    display: result
                }
            });
        };
        return reader.readAsDataURL(blob);
    };

    const handleSubmit = async () => {
        let result;
        const username = store.user.username;
        const flag = preSubmit(book, notify);

        if (flag.notify.warning) {
            setBook(flag.book);
            return setNotify(flag.notify);
        }
        if (editId) result = await fetchEdit(book, username, editId);
        else result = await fetchPost(book, username);

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
        let newList = book.lfBooks;
        newList.push(title);

        setBook({ ...book, lfBooks: newList });
    };
    const removeBook = (index) => {
        let newList = book.lfBooks;
        newList.splice(index, 1);

        setBook({ ...book, lfBooks: newList });
    };

    const notifyBook = (notification) => setNotify({ ...notify, ...notification });

    if (!store.loggedIn) return <ValidationScreen />;
    return (
        <Grid className={classes.container} item xs={12}>
            <Paper className={classes.paper}>
                <input
                    value={book.value}
                    onChange={(e) => handleInput("image", e)}
                    accept="image/*"
                    id="image-upload"
                    multiple
                    type="file"
                />
                <label htmlFor="image-upload">
                    <Button>
                        Upload
                    </Button>
                </label>

                <img
                    src={book.image.value ? book.image.display : ImagePlaceholder}
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
                    value={book.title.value}
                    onChange={(e) => handleInput("title", e)}
                    placeholder="Book Name"
                    inputProps={{
                        style: { fontSize: "1.5rem", textAlign: 'center' }
                    }}
                    color="secondary"
                    helperText="required"
                    error={book.title.error}
                />

                <TextField
                    className={classes.inputs}
                    value={book.description.value}
                    onChange={(e) => handleInput("description", e)}
                    placeholder="Description"
                    multiline={true}
                    color="secondary"
                    helperText="required"
                    error={book.description.error}
                />

                <FormControl style={{ flexGrow: 1 }}>
                    <InputLabel
                        id="condition-label"
                        color="secondary"
                    >
                        State
                    </InputLabel>
                    <Select
                        value={book.state.value}
                        onChange={(e) => handleInput("state", e)}
                        labelId="condition-label"
                        input={<Input
                            color="secondary"
                            helperText="required"
                            error={book.state.error}
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
                    value={book.city.value}
                    onChange={(e) => handleInput("city", e)}
                    label="City"
                    color="secondary"
                    helperText="required"
                    error={book.city.error}
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
                            value={book.study.value}
                            onChange={(e) => handleInput("study", e)}
                            labelId="condition-label"
                            input={<Input
                                color="secondary"
                                helperText="required"
                                error={book.study.error}
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
                            value={book.condition.value}
                            onChange={(e) => handleInput("condition", e)}
                            labelId="condition-label"
                            input={<Input
                                color="secondary"
                                error={book.condition.error}
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
                        value={book.eMedia.value}
                        onChange={(e) => handleInput("eMedia", e)}
                        placeholder="External Media"
                        color="secondary"
                        error={book.eMedia.error}
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
                        value={book.isbn.value}
                        onChange={(e) => handleInput("isbn", e)}
                        placeholder="1111-2222-33333"
                        color="secondary"
                        error={book.isbn.error}
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
                        value={book.courseId.value}
                        onChange={(e) => handleInput("courseId", e)}
                        placeholder="1111-2222-33333"
                        color="secondary"
                        error={book.courseId.error}
                    />
                </div>

                <LFBook
                    addBook={addBook}
                    removeBook={removeBook}
                    notifyBook={notifyBook}
                    lfBooks={book.lfBooks}
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
