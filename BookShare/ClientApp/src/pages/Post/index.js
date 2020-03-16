﻿import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ImagePlaceholder from '../../components/Post/AddImage.png';
import Background from '../../components/Post/imgs/jaredd-craig.png';
import LFBook from '../../components/Post/LFBook';
import ValidationScreen from '../../components/ScreenCatchers/ValidationScreen';
import Notify from '../../components/Notifications/Notify';
import * as services from '../../components/Post/Services/PostServices';

import { makeStyles, useTheme } from '@material-ui/styles';
import {
    Grid,
    Paper,
    TextField,
    Select,
    MenuItem,
    FormControl,
    FormHelperText,
    InputLabel,
    Input,
    Button
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '5% 25%',
        minHeight: '100vh',
        backgroundImage: `url(${Background})`,
        backgroundSize: 'cover',
        [theme.breakpoints.down('xs')]: {
            padding: '10% 5%',
        }
    },
    paper: {
        display: 'flex',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
        padding: '5%',
        marginTop: 50,
    },
    image: {
        width: '100%',
        height: 300,
        marginBottom: 20,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: '50% 50%'
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

    const theme = useTheme();
    const classes = useStyles(theme);
    const dispatch = useDispatch();
    const store = useSelector(state => state);

    const [book, setBook] = useState({ ...services.initBook });
    const [notify, setNotify] = useState({ ...services.initNotify });

    useEffect(() => {
        if (!editId) return;

        handleBook(editId);
    }, []);

    const handleBook = async () => {
        const result = await services.fetchById(editId);
        if (result.warning || result.error) return setNotify({ ...notify, ...result });

        setBook(result.book);
    };

    const handleInput = (type, event) => {
        if (type === "image") return saveImage(type, event.target.files[0]);
        setBook({ ...book, [type]: { error: false, value: event.target.value } });
    };

    const handleAutocomplete = (value, type) => {
        setBook({
            ...book,
            [type]: {
                error: false,
                value: value.title
            }
        });
    };

    const saveImage = (type, blob) => {
        let reader = new FileReader();
        reader.onload = (e) => {
            const parsed = e.target.result.split("base64,");
            return setBook({
                ...book,
                [type]: {
                    error: false,
                    value: parsed[1],
                }
            });
        };
        return reader.readAsDataURL(blob);
    };

    const handleSubmit = async () => {
        let result;
        const username = store.user.username;
        const flag = services.preSubmit(book, notify);

        if (flag.notify.warning) {
            setBook(flag.book);
            return setNotify(flag.notify);
        }
        if (editId) result = await services.fetchEdit(book, username, editId);
        else result = await services.fetchPost(book, username);

        setNotify({ ...notify, ...result.notify });
        dispatch({ type: "UPDATE", payload: result.user });
    };

    const closeNotify = () => {
        if (notify.warning || notify.error) return setNotify({ ...services.initNotify });

        setNotify({ ...services.initNotify });
        setBook({ ...services.initBook });
    };

    const bookInput = (type, param) => {
        const result = services.handleBook(type, param, book.lfBooks);
        setBook({ ...book, lfBooks: result });
    };

    const imgHelper = "data:image/jpeg;base64,"

    if (!store.loggedIn) return <ValidationScreen />;
    return (
        <Grid container>

            <Grid className={classes.container} item xs={12}>
                <Paper className={classes.paper}>
                    <div
                        className={classes.image}
                        style={{
                            backgroundImage: book.image.value ? `url(${imgHelper}${book.image.value})` : `url(${ImagePlaceholder})`,
                        }}
                    >
                        <input
                            style={{
                                width: '100%',
                                height: '100%',
                            }}
                            value={book.value}
                            onChange={(e) => handleInput("image", e)}
                            accept="image/*"
                            id="image-upload"
                            type="file"
                        />
                    </div>

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

                    <Autocomplete
                        options={services.states}
                        getOptionLabel={option => option.title}
                        className={classes.inputs}
                        value={{ title: book.state.value }}
                        onChange={(e, newValue) => handleAutocomplete(newValue, "state")}
                        renderInput={params => <TextField { ...params} label="State" />}
                    />

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
                            value={book.eMedia.value}
                            onChange={(e) => handleInput("eMedia", e)}
                            placeholder="External Media"
                            color="secondary"
                            error={book.eMedia.error}
                        />
                    </div>

                    <div className={classes.inputContainers}>
                        <TextField
                            style={{ flexGrow: 1 }}
                            value={book.price.value}
                            onChange={(e) => handleInput("price", e)}
                            placeholder="0.00"
                            color="secondary"
                            error={book.price.error}
                        />
                    </div>

                    <LFBook
                        lfBooks={book.lfBooks}
                        handleBooks={bookInput}
                    />

                    <div className={classes.inputContainers}>
                        <TextField
                            style={{ flexGrow: 1 }}
                            value={book.isbn.value}
                            onChange={(e) => handleInput("isbn", e)}
                            label="ISBN"
                            placeholder="1111-2222-33333"
                            color="secondary"
                            error={book.isbn.error}
                        />
                    </div>

                    <div className={classes.inputContainers}>
                        <TextField
                            style={{ flexGrow: 1 }}
                            value={book.courseId.value}
                            onChange={(e) => handleInput("courseId", e)}
                            label="Course ID"
                            placeholder="1111-2222-33333"
                            color="secondary"
                            error={book.courseId.error}
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
        </Grid>
    );
};
