import React, { useEffect, useState } from 'react';

import { makeStyles } from '@material-ui/styles';
import {
    Grid,
    Typography,
    Paper,
    Button,
    Divider,
    CircularProgress
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
    container: {
        display: 'flex',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
        padding: '5%'
    },
    paper: {
        display: 'flex',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
        padding: '5%',
    },
    img: {

    },
    title: {
        width: '100%',
        textAlign: 'center',
        marginTop: 20,
    },
    divider: {
        marginBlockStart: '0.5em',
        width: '60%',
        marginBottom: 20,
        backgroundColor: 'rgb(0, 0, 0, 0.2)'
    },
    body: {
        width: '100%',
        marginBottom: 30
    },
    info: {
        width: '100%',
        marginBottom: 10,
    },
    buttons: {
        marginTop: 20,
    }
}));

export default ({ params }) => {

    const classes = useStyles();

    const [book, setBook] = useState({ info: null, loaded: false });

    useEffect(() => {
        if (book.loaded) return;

        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        console.log(params.id);
        const result = await fetch(`api/book/id=${params.id}`);
        const json = await result.json();

        setBook({ info: json[0], loaded: true });
    };

    if (!book.loaded) return <CircularProgress />;

    const { image, title, description, condition, eMedia } = book.info;

    return (
        <Grid className={classes.container} item xs={12}>
            <Paper className={classes.paper}>
                <img
                    className={classes.img}
                    src={image}
                    alt={title}
                />

                <Typography
                    className={classes.title}
                    variant="h5"
                >
                    {title}
                </Typography>

                <Divider className={classes.divider} />

                <Typography
                    className={classes.body}
                >
                    {description}
                </Typography>

                <Typography
                    className={classes.info}
                >
                    Condition: {condition}
                </Typography>

                <Typography
                    className={classes.info}
                >
                    External Media: {eMedia}
                </Typography>

                <Button
                    className={classes.buttons}
                >
                    Track
                </Button>

                <Button
                    className={classes.buttons}
                >
                    Request
                </Button>
            </Paper>

        </Grid>
    );
};
