import React from 'react';
import { withRouter } from 'react-router';

import { makeStyles } from '@material-ui/styles';
import {
    Typography,
    Button,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia
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
    }
}));

const BookCards = ({ book, id, history }) => {

    const classes = useStyles();

    const handleClick = () => history.push(`/books/${id}`);

    const { image, title, description, condition, eMedia } = book;

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
                    <Typography>
                        {title}
                    </Typography>

                    <Typography className={classes.description}>
                        {description}
                    </Typography>
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
