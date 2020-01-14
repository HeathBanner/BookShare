import React, { useState, useEffect } from 'react';

import RegionQuery from '../RegionQuery';
import BookCards from './BookCards';
import { fetchByRegion, fetchByBook } from '../Services/QueryServices';

import { makeStyles } from '@material-ui/styles';
import {
    Grid,
    Modal,
    Button,
    Icon,
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
        backgroundColor: '#5AB9EA'
    },
    button: {
        width: '100%',
        padding: 10,
        backgroundColor: '#8860D0',
        color: 'white'
    },
    pageBox: {
        marginTop: 20,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }
}));

export default ({ params }) => {

    const classes = useStyles();

    const [open, setOpen] = useState(false);
    const [page, setPage] = useState(0);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleBack = () => setPage(prevState => prevState - 10);
    const handleNext = () => setPage(prevState => prevState + 10);

    const [books, setBooks] = useState({ list: null, loaded: false });

    //useEffect and grab book by id within the url params

    useEffect(() => {
        if (books.loaded) return;

        fetchSwitch();
    }, []);

    const fetchSwitch = async () => {
        let result;

        if (params.state) result = await fetchByRegion(params);
        if (params.title) result = await fetchByBook(params);

        setBooks({ ...result });
    };

    if (!books.loaded) return <CircularProgress />;
    return (
        <Grid className={classes.container} item xs={12}>

            <Button
                className={classes.button}
                onClick={handleOpen}
            >
                Search
            </Button>

            <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={open}
                onClose={handleClose}
            >
                <RegionQuery isModal={true} />
            </Modal>

            {books.list.map((item) => <BookCards
                    book={item}
                    id={item.id}
                    key={item.title}
                />
            )}

            <div className={classes.pageBox}>
                <Button
                    disabled={page === 0}
                    onClick={handleBack}
                >
                    <Icon>arrow_back_ios</Icon>
                </Button>

                <Typography>{page}</Typography>

                <Button
                    onClick={handleNext}
                >
                    <Icon>arrow_forward_ios</Icon>
                </Button>
            </div>

        </Grid>
    );
};