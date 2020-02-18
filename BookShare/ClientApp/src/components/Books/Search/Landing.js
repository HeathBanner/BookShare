import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router';

import RegionQuery from '../RegionQuery';
import BookCards from './BookCards';
import Filter from './Filter';
import {
    fetchByBook,
    fetchByList,
    initModal,
    genFilter,
    initFilter
} from '../Services/QueryServices';

import { makeStyles } from '@material-ui/styles';
import {
    Grid,
    Modal,
    Button,
    Icon,
    IconButton,
    Typography,
    CircularProgress
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
    container: {
        display: 'flex',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
        padding: '5%',
        backgroundColor: '#EAE7DC',
        minHeight: '100vh',
        paddingTop: 80
    },
    button: {
        width: '100%',
        marginBottom: 10,
        padding: 10,
        backgroundColor: '#E98074',
        color: 'white'
    },
    pageBox: {
        marginTop: 20,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    arrows: {
        padding: 10,
        backgroundColor: '#E98074',
        color: 'white'
    },
    circularProgress: {
        position: 'fixed',
        top: '50%',
        left: '50%',
    }
}));

const Landing = ({ params }) => {

    const classes = useStyles();
    const store = useSelector(state => state);

    const [page, setPage] = useState(0);
    const [modal, setModal] = useState({ ...initModal });
    const [books, setBooks] = useState({ list: null, loaded: false });
    const [checked, setChecked] = useState({ ...initFilter });

    useEffect(() => {
        if (!books.loaded && store.user) fetchSwitch();
    }, [store]);

    const handleOpen = (type) => event => {
        setModal({ ...modal, [type]: true });
    };
    const handleClose = (type) => event => {
        setModal({ ...modal, [type]: false });
    };

    const handleBack = () => setPage(prevState => prevState - 10);
    const handleNext = () => setPage(prevState => prevState + 10);

    const handleSwitch = (type) => event => {
        const value = !checked[type].on;
        setChecked({ ...checked, [type]: { ...checked[type], on: value } });
    };

    const handleChange = (type) => event => {
        setChecked({ ...checked, [type]: { ...checked[type], value: event.target.value } });
    };

    const handleInput = (type) => event => {
        setChecked({ ...checked, [type]: { ...checked[type], value: event.target.value } });
    };

    const fetchSwitch = async () => {
        let result;
        if (params.title) result = await fetchByBook(params, store.user.lfBooks);
        if (params.list) result = await fetchByList(params);

        setBooks({ ...result });
    };

    const handleApply = async (checked) => {
        const newBooks = await genFilter(checked, params);

        setBooks({ ...books, list: newBooks });
        setModal({ ...modal, filter: false });
    };

    if (!books.loaded) return <CircularProgress className={classes.circularProgress} />;
    return (
        <Grid className={classes.container} item xs={12}>

            <Button
                className={classes.button}
                onClick={handleOpen("query")}
            >
                Search
            </Button>

            <Button
                className={classes.button}
                onClick={handleOpen("filter")}
            >
                Filter
            </Button>

            <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={modal.query}
                onClose={handleClose("query")}
            >
                <RegionQuery isModal={true} />
            </Modal>

            <Modal
                open={modal.filter}
                onClose={handleClose("filter")}
            >
                <Filter
                    handleApply={handleApply}
                    handleSwitch={handleSwitch}
                    handleChange={handleChange}
                    handleInput={handleInput}
                    checked={checked}
                />
            </Modal>

            {books.list.map((item) => <BookCards
                    book={item}
                    id={item.id}
                    key={item.title}
                />
            )}

            <div className={classes.pageBox}>
                <IconButton
                    className={classes.arrows}
                    disabled={page === 0}
                    onClick={handleBack}
                >
                    <Icon>arrow_back_ios</Icon>
                </IconButton>

                <Typography
                    style={{ margin: "0px 10px" }}
                >
                    {page}
                </Typography>

                <IconButton
                    className={classes.arrows}
                    onClick={handleNext}
                >
                    <Icon>arrow_forward_ios</Icon>
                </IconButton>
            </div>

        </Grid>
    );
};

export default withRouter(Landing);
