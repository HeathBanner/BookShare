import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router';

import BookInfo from '../../components/Profile/BookInfo';
import InfoScreen from '../../components/ScreenCatchers/InfoScreen';
import EditBook from '../../components/Profile/Books/EditBook';
import Notification from '../../components/Notifications/Notify';
import { fetchDelete, initModal, initNotify } from '../../components/Profile/Services/BookServices';

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
    }
 }));

const Books = ({ history }) => {

    const theme = useTheme();
    const classes = useStyles(theme);
    const store = useSelector(store => store);
    const dispatch = useDispatch();
    const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));
    
    const [modal, setModal] = useState({ ...initModal });
    const [notify, setNotify] = useState({ ...initNotify });

    const handleOpen = (id) => setModal({ open: true, id: id });
    const handleClose = () => setModal({ ...initModal });

    const handleService = async (type, id) => {
        const { username } = store.user;

        let result;
        if (type === "edit") return history.push(`books/edit/${id}`);
        if (type === "delete") result = await fetchDelete(id, username);
        
        setNotify({ ...notify, ...result.notify });
        dispatch({ type: "UPDATE", payload: result.user });
    };

    const handleNotify = () => setNotify({ ...initNotify });

    const renderBookInfo = () => {
        if (!store.user.posted) return "";

        return store.user.posted.map((item) => (
                <GridListTile key={item.id} style={{ marginTop: 20 }}>
                    <BookInfo book={item} handleOpen={handleOpen} />
                </GridListTile>
            ));
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

            <Notification
                notification={notify}
                handleClose={handleNotify}
            />
        </Grid>
    );
};

export default withRouter(Books);