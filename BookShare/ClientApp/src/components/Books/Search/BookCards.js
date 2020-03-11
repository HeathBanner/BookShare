import React from 'react';
import { withRouter } from 'react-router';

import LFBooks from '../LFBooks';

import { makeStyles, useTheme } from '@material-ui/styles';
import {
    Typography,
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    card: {
        marginTop: 30,
    },
    media: {
        height: 300,
        backgroundSize: 'contain',
        [theme.breakpoints.down('xs')]: {
            height: 140
        }
    },
    content: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
    },
    title: {
        width: '100%',
        marginBottom: 5,
        textAlign: 'center'
    },
    description: {
        display: '-webkit-box',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        '-webkit-box-orient': 'vertical',
        '-webkit-line-clamp': '2',
        lineHeight: '1.5em !important',
        maxHeight: '8em',
        padding: 1,
        marginTop: 20
    },
    info: {
        width: '100%',
        marginTop: 15,
    },
    listHeader: {
        width: '100%',
        marginTop: 10
    },
    divider: {
        marginBlockStart: '0.5em',
        width: '100%',
        backgroundColor: 'rgb(0, 0, 0, 0.2)'
    },
    list: {
        width: '100%',
    }
}));

const BookCards = ({ book, id, history }) => {

    const theme = useTheme();
    const classes = useStyles(theme);
        
    const handleClick = () => history.push(`/books/${id}`);

    const { image, title, description, condition, eMedia, state, city, lfBooks } = book;

    return (
        <Card className={classes.card}>
            <CardMedia
                className={classes.media}
                image={`data:image/jpeg;base64,${image}`}
                title={title}
            />
            <CardContent className={classes.content}>
                <Typography
                    className={classes.title}
                    variant="h5"
                >
                    {title}
                </Typography>

                <Typography className={classes.description}>
                    {description}
                </Typography>

                <Typography
                    className={classes.info}
                    color="textSecondary"
                >
                    Location: {city}, {state}
                </Typography>

                <Typography
                    className={classes.info}
                    color="textSecondary"
                >
                    Condition: {condition}
                </Typography>

                <Typography
                    className={classes.info}
                    color="textSecondary"
                >
                    External Media: {eMedia ? eMedia : "None"}
                </Typography>

                <LFBooks lfBooks={lfBooks} />

            </CardContent>
            <CardActions className={classes.content}>
                <Button
                    onClick={handleClick}
                >
                    View
                </Button>
                <Button>
                    Request
                </Button>
            </CardActions>
        </Card>
    );
};

export default withRouter(BookCards);
