import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import BookQuery from '../../components/Books/BookQuery';
import Multiple from '../../components/Books/Multiple';
import Manual from '../../components/Books/Manual';
import LFBook from '../../components/Post/LFBook';
import { initValidation } from '../../components/Books/Services/ContainerServices';

import { makeStyles, useTheme } from '@material-ui/styles';
import {
    Paper,
    Tabs,
    Tab,
    Grow,
    Grid
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    container: theme.container,
    alignmentContainer: theme.alignmentContainer,
    paper: theme.paper,
    modal: theme.modal,
    desktop: {
        display: 'flex',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
        marginTop: 60,
        marginBottom: 30,
        background: 'rgb(255, 255, 255, 0.5)',
        padding: '0% 5% 3% 5%',
        width: '50%'
    }
}));

export default ({ isModal, isDesktop, history }) => {

    const theme = useTheme();
    const classes = useStyles(theme);
    const store = useSelector(state => state);
    const dispatch = useDispatch();

    const [query, setQuery] = useState(0);
    const [validation, setValidation] = useState({ ...initValidation });

    const toggleValidation = () => {
        try {
            setValidation({ ...validation, open: !validation.open });
        } catch (error) {
            dispatch({ type: "ERROR_NOTIFY", payload: "Something went wrong :(" });
        }
    };

    const handleBooks = async (type, param) => {
        try {
            let result;
            if (type === "ADD") {
                const { addBook } = await import('../../components/Books/Services/ContainerServices');
                result = addBook(param, validation.lfBooks);
            }
            if (type === "REMOVE") {
                const { removeBook } = await import('../../components/Books/Services/ContainerServices');
                result = removeBook(param, validation.lfBooks);
            }
            setValidation({ ...validation, lfBooks: result });
        } catch (error) {
            dispatch({ type: "ERROR_NOTIFY", payload: "Something went wrong :(" });
        }
    };

    const handleSave = async () => {
        try {
            const fetchUpdateLF = await import('../../components/Profile/Services/InfoServices');
            const result = await fetchUpdateLF(validation.lfBooks, store.user.username);
            
            if (result.warning) {
                dispatch({ type: "WARNING_NOTIFY", payload: result.message });
            }
            if (result.error) {
                dispatch({ type: "ERROR_NOTIFY", payload: result.message });
            }
    
            setValidation({ ...initValidation });
            dispatch({ type: "UPDATE", payload: result });
        } catch (error) {
            dispatch({ type: "ERROR_NOTIFY", payload: "Something went wrong :(" });
        }
    };

    const handleChange = (event, value) => {
        try {
            setQuery(value);
        }
        catch (error) {
            dispatch({ type: "ERROR_NOTIFY", payload: "Something went wrong :(" });
        }
    };

    const renderSearch = () => {
        try {
            const props = {
                history: history,
                store: store,
                validation: validation,
                toggleValidation: toggleValidation,
                handleBooks: handleBooks,
                handleSave: handleSave,
                changeTab: handleChange
            };
            if (query === 0) return <BookQuery { ...props } />;
            if (query === 1) return <Multiple { ...props } />;
            return <Manual history={history} store={store} />;
        } catch (error) {
            dispatch({ type: "ERROR_NOTIFY", payload: "Something went wrong :(" });
        }
    };

    const classnameSwitch = () => {
        if (isModal) return classes.modal;
        if (isDesktop) return classes.desktop;
        else return classes.paper;
    };

    return (
        <Grid container  className={classes.container}>
            <Grid xs={12} className={classes.alignmentContainer}>

                <Paper className={classnameSwitch()}>
                    <Tabs
                        value={query}
                        onChange={handleChange}
                        indicatorColor="primary"
                    >
                        <Tab label="Single" />
                        <Tab label="Multiple" />
                        <Tab label="Manual" />
                    </Tabs>

                    <Grow in={validation.open}>
                        <div>
                            <LFBook
                                lfBooks={validation.lfBooks}
                                handleBooks={handleBooks}
                                handleSave={handleSave}
                                isModal={true}
                                toggle={toggleValidation}
                            />
                        </div>
                    </Grow>

                    { renderSearch() }
                    
                </Paper>
            </Grid>
        </Grid>
    )
};
