import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router';

import QueryContainer from '../Index';
import RegionQuery from '../../../components/Books/RegionQuery';
import BookCards from '../../../components/Books/Search/BookCards';
import InfoScreen from '../../../components/ScreenCatchers/InfoScreen';
import Filter from '../../../components/Books/Search/Filter';
import ImageViewer from '../../../components/Utils/ImageViewer';
import { initModal, initFilter } from '../../../components/Books/Services/QueryServices';

import { makeStyles, useTheme } from '@material-ui/styles';
import {
    Grid,
    Modal,
    Button,
    Icon,
    IconButton,
    Typography,
    CircularProgress,
    useMediaQuery,
    GridList,
    GridListTile
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    container: theme.container,
    button: {
        ...theme.button,
        marginBottom: 10
    },
    pageBox: {
        marginTop: 20,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
    },
    arrows: {
        padding: 10,
        backgroundColor: '#E98074',
        color: 'white'
    },
    circularProgress: {
        position: 'fixed',
        top: '50%',
        left: '50%'
    },
    tile: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center'
    }
}));

const Landing = ({ match, history }) => {

    const theme = useTheme();
    const classes = useStyles(theme);
    const store = useSelector(state => state);
    const dispatch = useDispatch();
    const { params } = match;
    const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));

    const [modal, setModal] = useState({ ...initModal });
    const [books, setBooks] = useState({ list: null, loaded: false, page: 1 });
    const [checked, setChecked] = useState({ ...initFilter });
    const [viewer, setViewer] = useState({ open: false, index: 0 });

    useEffect(() => {
        if (!books.loaded && store.user || params.page !== books.page) {
            fetchSwitch();
        }
    }, [store, books, params]);

    const handleOpen = (type) => event => {
        try {
            setModal({ ...modal, [type]: true });
        } catch (error) {
            dispatch({ type: "ERROR_NOTIFY", payload: "Something went wrong :(" });
        }
    };
    const handleClose = (type) => event => {
        try {
            setModal({ ...modal, [type]: false });
        } catch (error) {
            dispatch({ type: "ERROR_NOTIFY", payload: "Something went wrong :(" });
        }
    };

    const handleBack = () => {
        try {
            const newPage = parseInt(params.page) - 1;
            if (params.list) {
                return history.push(`/bookList/${newPage}/${params.state}/${params.city}/${params.list}`);
            }
            return history.push(`/books/${newPage}/${params.title}/${params.state}/${params.city}/${params.sale}/${params.trade}`);
        } catch (error) {
            dispatch({ type: "ERROR_NOTIFY", payload: "Something went wrong :(" });
        }
    };

    const handleNext = () => {
        try {
            const newPage = parseInt(params.page) + 1;
            if (params.list) {
                return history.push(`/bookList/${newPage}/${params.state}/${params.city}/${params.list}`);
            }
            return history.push(`/books/${newPage}/${params.title}/${params.state}/${params.city}/${params.sale}/${params.trade}`);
        } catch (error) {
            dispatch({ type: "ERROR_NOTIFY", payload: "Something went wrong :(" });
        }
    };

    const handleSwitch = (type) => event => {
        try {
            const value = !checked[type].on;
            setChecked({ ...checked, [type]: { ...checked[type], on: value } });
        } catch (error) {
            dispatch({ type: "ERROR_NOTIFY", payload: "Something went wrong :(" });
        }
    };

    const handleChange = (type) => event => {
        try {
            setChecked({ ...checked, [type]: { ...checked[type], value: event.target.value } });
        } catch (error) {
            dispatch({ type: "ERROR_NOTIFY", payload: "Something went wrong :(" });
        }
    };

    const handleInput = (type) => event => {
        try {
            setChecked({ ...checked, [type]: { ...checked[type], value: event.target.value } });
        } catch (error) {
            dispatch({ type: "ERROR_NOTIFY", payload: "Something went wrong :(" });
        }
    };

    const openViewer = (index) => {
        try {
            setViewer({ open: true, index: index });
        } catch (error) {
            dispatch({ type: "ERROR_NOTIFY", payload: "Something went wrong :(" });
        }
    };
    const closeViewer = () => setViewer({ open: false, index: 0 });

    const fetchSwitch = async () => {
        try {
            let result;
            if (params.title) {
                const { fetchByBook } = await import('../../../components/Books/Services/QueryServices');
                result = await fetchByBook(params, store.user.lfBooks);
            }
            if (params.list) {
                const { fetchByList } = await import('../../../components/Books/Services/QueryServices');
                result = await fetchByList(params);
            }

            setBooks({ ...result });
        } catch (error) {
            dispatch({ type: "ERROR_NOTIFY", payload: "Something went wrong :(" });
        }
    };

    const handleApply = async (checked) => {
        try {
            const { genFilter } = await import('../../../components/Books/Services/QueryServices');
            const newBooks = await genFilter(checked, params);
            
            setBooks({ ...books, list: newBooks });
            setModal({ ...modal, filter: false });
        } catch (error) {
            dispatch({ type: "ERROR_NOTIFY", payload: "Something went wrong :(" });
        }
    };

    const renderSearch = () => {
        if (isDesktop) return <QueryContainer history={history} isDesktop={true} />
        return (
            <Button
                className={classes.button}
                onClick={handleOpen("query")}
            >
                Search
            </Button>
        );
    };

    const renderTiles = () => {
        if (books.loaded && books.list.length === 0) return (
            <Typography
                style={{
                    width: '100%',
                    textAlign: 'center',
                    margin: '30px 0px'
                }}
            >
                There appears to be no books with the title of {params.title} in your area
            </Typography>
        );
        else return books.list.map((item, index) => (
                <GridListTile key={item.title} classes={{ tile: classes.tile }} >
                    <BookCards
                        book={item}
                        id={item.id}
                        index={index}
                        openViewer={openViewer}
                    />
                </GridListTile>
            )
        );
    };

    if (!store.user) return (
        <InfoScreen
            message="You must be logged in to view this"
            action={false}
        />
    );
    if (!books.loaded) return <CircularProgress className={classes.circularProgress} />;
    return (
        <Grid container>
            <Grid className={classes.container} item xs={12}>

                {renderSearch()}

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

                <GridList
                    cellHeight="auto"
                    spacing={20}
                    className={classes.gridList}
                    cols={isDesktop ? 2 : 1}
                >
                    {renderTiles()}
                </GridList>

                <div className={classes.pageBox}>
                    <IconButton
                        className={classes.arrows}
                        disabled={parseInt(books.page) === 1}
                        onClick={handleBack}
                    >
                        <Icon>arrow_back_ios</Icon>
                    </IconButton>

                    <Typography
                        style={{ margin: "0px 10px" }}
                    >
                        {books.page}
                    </Typography>

                    <IconButton
                        className={classes.arrows}
                        onClick={handleNext}
                        disabled={books.list.length < 3}
                    >
                        <Icon>arrow_forward_ios</Icon>
                    </IconButton>
                </div>

                <ImageViewer
                    images={books.list[viewer.index].image}
                    open={viewer.open}
                    handleClose={closeViewer}
                />
            </Grid>
        </Grid>
    );
};

export default withRouter(Landing);
