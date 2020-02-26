import React, { useEffect, useState } from 'react';

import LFBooks from '../LFBooks';

import { makeStyles } from '@material-ui/styles';
import {
    Grid,
    Typography,
    Paper,
    Button,
    Divider,
    CircularProgress,
    Icon
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
        marginBottom: 30,
        textAlign: 'center'
    },
    infoContainer: {
        display: 'flex',
        justifyContent: 'flex-start',
        width: '100%',
        marginBottom: 10
    },
    info: {
        width: '100%',
        marginBottom: 10,
    },
    buttons: {
        marginTop: 20,
    },
    listHeader: {
        width: '100%',
        marginTop: 10
    },
    listDivider: {
        marginBlockStart: '0.5em',
        width: '100%',
        backgroundColor: 'rgb(0, 0, 0, 0.2)'
    },
    list: {
        width: '100%',
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

        setBook({ info: json.books[0], loaded: true });
    };

    if (!book.loaded) return <CircularProgress />;

    const { image, title, description, condition, eMedia, city, state, lfBooks } = book.info;

    const renderCondition = () => {
        switch (condition) {
            case "Mint":
                return "sentiment_very_satisfied";
            case "Good":
                return "sentiment_satisfied";
            case "Fair":
                return "sentiment_dissatisfied";
            default:
                return "sentiment_very_dissatisfied";
        }
    };

    return (
        <Grid className={classes.container} item xs={12}>
            <Paper className={classes.paper}>
                <img
                    className={classes.img}
                    src={`data:image/jpeg;base64,${image}`}
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

                <div
                    className={classes.infoContainer}
                >
                    <Icon
                        style={{ marginRight: 10 }}
                    >
                        my_location
                    </Icon>
                    <Typography
                    >
                        Location: {city}, {state}
                    </Typography>
                </div>

                <div
                    className={classes.infoContainer}
                >
                    <Icon
                        style={{ marginRight: 10 }}
                    >
                        { renderCondition() }
                    </Icon>
                    <Typography>
                        Condition: {condition}
                    </Typography>
                </div>

                <div
                    className={classes.infoContainer}
                >
                    <Icon
                        style={{ marginRight: 10 }}
                    >
                        attachment
                    </Icon>
                    <Typography>
                        External Media: {eMedia}
                    </Typography>
                </div>

                <LFBooks lfBooks={lfBooks} />

                <Button
                    className={classes.buttons}
                >
                    Request
                </Button>
            </Paper>

        </Grid>
    );
};
