import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import LFBooks from '../../../components/Books/LFBooks';
import ImageViewer from '../../../components/Utils/ImageViewer';
import InfoScreen from '../../../components/ScreenCatchers/InfoScreen';
import * as services from '../../../components/Books/BookView/services';

import { makeStyles, useTheme } from '@material-ui/styles';
import {
    Grid,
    GridList,
    GridListTile,
    GridListTileBar,
    Typography,
    Paper,
    Button,
    Divider,
    CircularProgress,
    Icon,
    Card,
    CardContent
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    container: theme.container,
    paper: theme.bookPaper,
    gridList: theme.imagesGridList,
    titleBar: theme.imagesTitleBar,
    title: theme.imagesTitle,
    divider: theme.divider,
    contentContainer: theme.alignmentContainer,
    img: {
        width: 'auto',
        height: 300,
        [theme.breakpoints.down('xs')]: {
            height: 140
        }
    },
    body: {
        width: '100%',
        marginBottom: 50,
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

export default ({ match }) => {

    const theme = useTheme();
    const classes = useStyles(theme);
    const store = useSelector(store => store);
    const dispatch = useDispatch();
    const imgHelper = "data:image/jpeg;base64,";

    const [book, setBook] = useState(services.bookInit);
    const [viewer, setViewer] = useState(false);

    useEffect(() => {
        try {
            if (book.loaded || !store.user) return;
    
            fetchBooks();
        } catch (error) {
            dispatch({ type: "ERROR_NOTIFY", payload: "Something went wrong :(" });
        }
    }, [store]);

    const fetchBooks = async () => {
        try {
            const result = await fetch(`api/book/id=${match.params.id}`);
            const json = await result.json();
    
            setBook({ ...book, info: json.books[0], loaded: true });
        } catch (error) {
            dispatch({ type: "ERROR_NOTIFY", payload: "Something went wrong :(" });
        }
    };

    const openViewer = () => setViewer(true);
    const closeViewer = () => setViewer(false);

    if (!store.user) return (
        <InfoScreen
            message="You must be logged in to view this"
            action={false}
        />
    );
    if (!book.loaded) return <CircularProgress />;

    const { image, title, description, condition, eMedia, city, state, lfBooks } = book.info;
    const isRequested = services.isRequested(store.user.request, book.info.id);

    const handleRequest = async () => {
        try {
            const result = await services.handleRequest(store.user, book)
            setBook(result);
        } catch (error) {
            dispatch({ type: "ERROR_NOTIFY", payload: "Something went wrong :(" });
        }
    };

    return (
        <Grid container>
            <Grid className={classes.container} item xs={12}>
                <Card className={classes.paper}>
                    <GridList
                        onClick={openViewer}
                        className={classes.gridList}
                        cols={1.5}
                    >
                        {image.map((img, index) => (
                            <GridListTile key={`bookImage${index}`}>
                                <img src={`${imgHelper}${img.url}`} alt={`Book #${index}`}/>
                                <GridListTileBar
                                    title={title}
                                    classes={{ root: classes.titleBar, title: classes.title }}
                                />
                            </GridListTile>
                        ))}
                    </GridList>

                    <CardContent className={classes.contentContainer}>
                        <Typography
                            className={classes.title}
                            variant="h5"
                        >
                            {title}
                        </Typography>

                        <Divider className={classes.divider} />

                        <Typography className={classes.body}>
                            {description ? description : "No Description..."}
                        </Typography>

                        <div className={classes.infoContainer}>
                            <Icon
                                fontSize="small"
                                style={{ marginRight: 10 }}
                            >
                                my_location
                            </Icon>
                            <Typography variant="subtitle2">
                                Location: {city}, {state}
                            </Typography>
                        </div>

                        <div className={classes.infoContainer}>
                            <Icon
                                fontSize="small"
                                style={{ marginRight: 10 }}
                            >
                                { services.renderCondition(condition) }
                            </Icon>
                            <Typography variant="subtitle2">
                                Condition: {condition}
                            </Typography>
                        </div>

                        <div className={classes.infoContainer}>
                            <Icon
                                fontSize="small"
                                style={{ marginRight: 10 }}
                            >
                                attachment
                            </Icon>
                            <Typography variant="subtitle2">
                                External Media: {!eMedia ? "None" : eMedia}
                            </Typography>
                        </div>

                        {lfBooks.length === 0 ? "" : <LFBooks lfBooks={lfBooks} />}
                        
                        <Button
                            className={classes.buttons}
                            onClick={handleRequest}
                            disabled={isRequested.flag}
                        >
                            {isRequested.flag ? `Requested on ${isRequested.date}` : "Request"}
                        </Button>
                    </CardContent>

                </Card>

                <ImageViewer
                    images={image}
                    open={viewer}
                    handleClose={closeViewer}
                />

            </Grid>
        </Grid>
    );
};
