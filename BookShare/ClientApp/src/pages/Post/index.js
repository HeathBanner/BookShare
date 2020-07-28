import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import InfoScreen from '../../components/ScreenCatchers/InfoScreen';
import Stepper from '../../components/Post/Stepper';
import ValidationScreen from '../../components/ScreenCatchers/ValidationScreen';
import { initBook } from '../../components/Post/Services/PostServices';

import { makeStyles, useTheme } from '@material-ui/styles';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '5% 25%',
        minHeight: '100vh',
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

    const [book, setBook] = useState({ ...initBook });

    useEffect(() => {
        if (!editId) return;

        handleBook(editId);
    }, []);

    const handleBook = async () => {
        try {
            const { fetchById } = await import('../../components/Post/Services/PostServices');
            const result = await fetchById(editId);

            if (result.warning) {
                dispatch({ type: "WARNING_NOTIFY", payload: result.message });
            }
            if (result.error) {
                return dispatch({ type: "ERROR_NOTIFY", payload: result.message });
            }
    
            setBook(result.book);
        } catch (error) {
            dispatch({ type: "ERROR_NOTIFY", payload: "Something went wrong :(" });
        }
    };

    const handleInput = (type, event) => {
        try {
            if (type === "image") return saveImage(type, event.target.files);
            if (type === "deleteImage") return deleteImage(event);
            setBook({ ...book, [type]: { error: false, value: event.target.value } });
        } catch (error) {
            dispatch({ type: "ERROR_NOTIFY", payload: "Something went wrong :(" });
        }
    };

    const handleAutocomplete = (value, type) => {
        try {
            setBook({
                ...book,
                [type]: {
                    error: false,
                    value: value.title
                }
            });
        } catch (error) {
            dispatch({ type: "ERROR_NOTIFY", payload: "Something went wrong :(" });
        }
    };

    const saveImage = async (type, blob) => {
        try {
            if (blob.length > 5) {
                dispatch({ type: "ERROR_NOTIFY", payload: "You can only upload 5 photos" });
            }
            let currentImages = book.image;
            let count = blob.length;
            for (let file of blob) {
                let reader = new FileReader();
                reader.onload = (e) => {
                    const parsed = e.target.result.split("base64,");
                    currentImages.push({ url: parsed[1] });
    
                    if (!--count) {
                        return setBook({
                            ...book,
                            [type]: currentImages
                        });
                    }
                };
                reader.readAsDataURL(file);
            }        
        } catch (error) {
            dispatch({ type: "ERROR_NOTIFY", payload: "Something went wrong :(" });
        }
    };

    const deleteImage = (index) => {
        try {
            let images = book.image;
            images.splice(index, 1);
            setBook({ ...book, image: images });
        } catch (error) {
            dispatch({ type: "ERROR_NOTIFY", payload: "Something went wrong :(" });
        }
    };

    const handleSubmit = async () => {
        try {
            let result;
            const { preSubmit } = await import('../../components/Post/Services/PostServices');
            const flag = preSubmit(book, store.notify);
    
            if (flag.notify.warning) {
                setBook(flag.book);
                dispatch({ type: "WARNING_NOTIFY", payload: flag.notify.message });
            }
            if (editId) {
                const { fetchEdit } = await import('../../components/Post/Services/PostServices');
                result = await fetchEdit(book, store.user, editId);
            }
            else {
                const { fetchPost } = await import('../../components/Post/Services/PostServices');
                result = await fetchPost(book, store.user);
            }
    
            dispatch({
                type: "NEW_BOOK",
                payload: {
                    user: result.user,
                    notification: {
                        success: true,
                        message: "Book has been posted!"
                    }
                }
            });
        } catch (error) {
            dispatch({ type: "ERROR_NOTIFY", payload: "Something went wrong :(" });
        }
    };

    const bookInput = async (type, param) => {
        try {
            const { handleBook } = await import('../../components/Post/Services/PostServices');
            const result = handleBook(type, param, book.lfBooks);
            setBook({ ...book, lfBooks: result });
        } catch (error) {
            dispatch({ type: "ERROR_NOTIFY", payload: "Something went wrong :(" });
        }
    };

    if (!store.loggedIn) return <ValidationScreen />;
    if (store.user.posted.length >= 5) {
        return <InfoScreen
            message="You've reached your limit of 5 books posted."
            icon="warning"
        />;
    }
    return (
        <Grid container>
            <Grid className={classes.container} item xs={12}>
                <Stepper
                    book={book}
                    handleInput={handleInput}
                    handleAutocomplete={handleAutocomplete}
                    bookInput={bookInput}
                    handleSubmit={handleSubmit}
                />
            </Grid>
        </Grid>
    );
};
