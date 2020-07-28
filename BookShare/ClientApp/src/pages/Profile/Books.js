import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router';

import BookCards from '../../components/Books/Search/BookCards';
import ImageViewer from '../../components/Utils/ImageViewer';
import InfoScreen from '../../components/ScreenCatchers/InfoScreen';
import EditBook from '../../components/Profile/Books/EditBook';
import { fetchDelete, initModal } from '../../components/Profile/Services/BookServices';

import { makeStyles, useTheme } from '@material-ui/styles';
import {
    Grid,
    GridList,
    GridListTile,
    useMediaQuery
 } from '@material-ui/core';

 const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
        paddingTop: 60,
        paddingBottom: 30,
        paddingRight: '5%',
        paddingLeft: '5%',
    [theme.breakpoints.up('sm')]: {
            paddingRight: '10%',
            paddingLeft: '10%'
        }
    },
    tile: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center'
    }
 }));

const Books = ({ history }) => {

    const theme = useTheme();
    const classes = useStyles(theme);
    const store = useSelector(store => store);
    const dispatch = useDispatch();
    const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));
    
    const [modal, setModal] = useState({ ...initModal });
    const [viewer, setViewer] = useState({ open: false, index: 0 });

    const handleOpen = (id) => {
        try {
            setModal({ open: true, id: id });
        } catch (error) {
            dispatch({ type: "ERROR_NOTIFY", payload: "Something went wrong :(" });
        }
    };
    const handleClose = () => setModal({ ...initModal });

    const handleService = async (type, id) => {
        try {
            const { username } = store.user;
    
            let result;
            if (type === "edit") return history.push(`books/edit/${id}`);
            if (type === "delete") result = await fetchDelete(id, username);
            
            dispatch({ type: "UPDATE", payload: result.user });
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

    const renderBookInfo = () => {
        try {
            if (!store.user.posted) return "";
    
            return store.user.posted.map((item, index) => (
                    <GridListTile
                        key={item.id}
                        style={{ marginTop: 20, justifyContent: 'center' }}
                        classes={{ tile: classes.tile }}
                    >
                        <BookCards
                            book={item}
                            id={item.id}
                            index={index}
                            openViewer={openViewer}
                            openModal={handleOpen}
                        />
                    </GridListTile>
                ));
        } catch (error) {
            dispatch({ type: "ERROR_NOTIFY", payload: "Something went wrong :(" });
            return "";
        }
    };

    if (!store.user || store.user.posted.length < 1) return (
        <InfoScreen
            message={!store.user ? "You must be logged in to view this page" : "It appears you've not posted a book"}
            action={!store.user ? false : {
                message: "Click here to get started!",
                func: () => history.push("/post")
            }}
        />
    );
    return (
        <Grid
            className={classes.container}
            container
        >
            <GridList cellHeight="auto" spacing={20} cols={isDesktop ? 2 : 1}>
                {renderBookInfo()}
            </GridList>

            <EditBook
                modal={modal}
                handleClose={handleClose}
                handleService={handleService}
            />

            <ImageViewer
                images={store.user.posted[viewer.index].image}
                open={viewer.open}
                handleClose={closeViewer}
            />
        </Grid>
    );
};

export default withRouter(Books);