import React from 'react';
import { withRouter } from 'react-router';

import LFBooks from '../LFBooks';

import { makeStyles } from '@material-ui/styles';
import {
    Typography,
    Button,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    Divider,
    List,
    ListItem,
    ListItemText
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
    card: {
        marginTop: 30,
    },
    media: {
        height: 140
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

    const classes = useStyles();
        
    const handleClick = () => history.push(`/books/${id}`);

    const { image, title, description, condition, eMedia, state, city, lfBooks } = book;

    return (
        <Card className={classes.card}>
            <CardActionArea
                onClick={handleClick}
            >
                <CardMedia
                    className={classes.media}
                    image={image}
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
            </CardActionArea>
            <CardActions className={classes.content}>
                <Button>
                    Track
                </Button>
                <Button>
                    Request
                </Button>
            </CardActions>
        </Card>
    );
};

export default withRouter(BookCards);
