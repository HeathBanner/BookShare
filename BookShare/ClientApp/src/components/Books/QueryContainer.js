import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router';

import BookQuery from './BookQuery';
import Multiple from './Multiple';

import { makeStyles } from '@material-ui/styles';
import {
    Paper,
    Tabs,
    Tab
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
    paper: {
        display: 'flex',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
        //position: 'fixed',
        //top: '50%',
        //left: '50%',
        //transform: 'translate(-50%, -50%)',
        padding: '0% 10% 10% 10%',
        width: '80%',
        marginTop: 60
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

    const [query, setQuery] = useState(0);

    const handleChange = (event, value) => setQuery(value);

    const renderSearch = () => {
        if (query === 0) return <BookQuery history={history} store={store} />;
        if (query === 1) return <Multiple history={history} store={store} />;

        return "";
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

            { renderSearch() }
            
        </Paper>
    );
};

export default withRouter(QueryContainer);