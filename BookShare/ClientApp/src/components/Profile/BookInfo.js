import React from 'react';

import { makeStyles, useTheme } from '@material-ui/styles';
import {
    Typography,
    GridList,
    GridListTile,
    GridListTileBar,
    Paper,
    Button,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    card: {
        width: '90%',
        marginBottom: 30,
        backgroundColor: 'rgb(255, 255, 255, 0.3)',
        boxShadow: '2px 1px 5px 1px rgba(0,0,0,0.2), 0px 1px 0px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)',
    },
    media: {
        height: 300,
        backgroundSize: 'contain',
        [theme.breakpoints.down('xs')]: {
            height: 140
        }
    },
    gridList: {
        flexWrap: 'nowrap',
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        transform: 'translateZ(0)',
        width: '100%',
        marginBottom: '10px !important'
    },
    titleBar: {
        background:
          'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
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
        display: 'block',
        width: '100%',
        marginTop: 15,
    }
}));

export default ({ book, handleOpen }) => {

    const theme = useTheme();
    const classes = useStyles(theme);
    const imgHelper = "data:image/jpeg;base64,";

    const { image, title, description, city, state, condition, eMedia, id } = book;

    return (
        <Card className={classes.card}>

            <GridList className={classes.gridList} cols={1.5}>
                {image.map((image, index) => (
                    <GridListTile key={`bookImage${index}`}>
                        <img src={`${imgHelper}${image.url}`} alt={`Book #${index}`}/>
                        <GridListTileBar
                            title={title}
                            classes={{ root: classes.titleBar, title: classes.title }}
                        />
                    </GridListTile>
                ))}
            </GridList>

            <CardContent className={classes.content}>
                <CardActionArea
                    onClick={() => handleOpen(id)}
                >
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
                        variant="caption"
                    >
                        Location: {city}, {state}
                    </Typography>

                    <Typography
                        className={classes.info}
                        color="textSecondary"
                        variant="caption"
                    >
                        Condition: {condition}
                    </Typography>

                    <Typography
                        className={classes.info}
                        color="textSecondary"
                        variant="caption"
                    >
                        External Media: {eMedia ? eMedia : "None"}
                    </Typography>
                </CardActionArea> 
            </CardContent>
        </Card>
    );
};
