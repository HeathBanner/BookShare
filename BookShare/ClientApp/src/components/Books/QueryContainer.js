import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router';

import BookQuery from './BookQuery';
import Multiple from './Multiple';
import Manual from './Manual';
import LFBook from '../Post/LFBook';
import Notify from '../Notifications/Notify';
import * as services from './Services/ContainerServices';
import { fetchUpdateLF } from '../Profile/Services/InfoServices';

import { makeStyles } from '@material-ui/styles';
import {
    Paper,
    Tabs,
    Tab,
    Grow
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
    paper: {
        display: 'flex',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
        padding: '0% 10% 10% 10%',
        width: '80%',
        marginTop: 60,
        background: 'rgb(255, 255, 255, 0.5)'
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
}));

const QueryContainer = ({ isModal, history }) => {

    const classes = useStyles();
    const store = useSelector(state => state);
    const dispatch = useDispatch();

    const [query, setQuery] = useState(0);
    const [validation, setValidation] = useState({ ...services.initValidation });
    const [notify, setNotify] = useState({ ...services.initNotify });

    const toggleValidation = () => {
        setValidation({ ...validation, open: !validation.open });
    };

    const handleBooks = (type, param) => {
        let result;
        if (type === "ADD") result = services.addBook(param, validation.lfBooks);
        if (type === "REMOVE") result = services.removeBook(param, validation.lfBooks);
        setValidation({ ...validation, lfBooks: result });
    };

    const handleSave = async () => {
        const result = await fetchUpdateLF(validation.lfBooks, store.user.username);
        if (result.warning || result.error) return setNotify({ ...notify, ...result });

        setValidation({ ...services.initValidation });
        dispatch({ type: "UPDATE", payload: result });
    };

    const closeNotify = () => setNotify({ ...services.initNotify });

    const handleChange = (event, value) => setQuery(value);

    const renderSearch = () => {
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
    };

    return (
        <Paper className={isModal ? classes.modal : classes.paper}>
            <Tabs
                value={query}
                onChange={handleChange}
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

            <Notify
                handleClose={closeNotify}
                notification={notify}
            />
            
        </Paper>
    );
};

export default withRouter(QueryContainer);