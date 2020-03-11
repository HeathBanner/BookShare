import React from 'react';

import { makeStyles, useTheme } from '@material-ui/styles';
import {
    Typography,
    Button,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    card: {
        width: '100%',
        backgroundColor: 'rgb(255, 255, 255, 0.3)',
        boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)',
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
    }
}));

export default ({ book, handleOpen }) => {

    const theme = useTheme();
    const classes = useStyles(theme);

    const { image, title, description, city, state, condition, eMedia, id } = book;

    return (
        <Card className={classes.card}>
            <CardActionArea
                onClick={() => handleOpen(id)}
            >
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
