import React, { useState } from 'react';
import { withRouter } from 'react-router';

import RegionQuery from './RegionQuery';
import BookQuery from './BookQuery';

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
        padding: '0% 10% 10% 10%',
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
}));

const QueryContainer = ({ isModal, history }) => {

    const classes = useStyles();

    const [query, setQuery] = useState(0);

    const handleChange = (event, value) => setQuery(value);

    const renderSearch = () => {
        switch (query) {
            case 0:
                return <RegionQuery history={history} />;
            case 1:
                return <BookQuery history={history} />;
            default:
                return "";
        }
    };

    return (
        <Paper className={isModal ? classes.modal : classes.paper}>
            <Tabs
                value={query}
                onChange={handleChange}
            >
                <Tab label="Region" />
                <Tab label="Book" />
                <Tab label="Advanced" />
            </Tabs>

            { renderSearch() }
            
        </Paper>
    );
};

export default withRouter(QueryContainer);