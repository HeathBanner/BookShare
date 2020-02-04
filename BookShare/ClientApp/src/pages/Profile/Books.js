import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import BookInfo from '../../components/Profile/BookInfo';
import EditBook from '../../components/Profile/Books/EditBook';
import Notification from '../../components/Notifications/Notify';
import { fetchDelete, initModal, initNotify } from '../../components/Profile/Services/BookServices';

import { Grid } from '@material-ui/core';

export default () => {

    const store = useSelector(store => store);
    const dispatch = useDispatch();
    
    const [modal, setModal] = useState({ ...initModal });
    const [notify, setNotify] = useState({ ...initNotify });

    const handleOpen = (id) => setModal({ open: true, id: id });
    const handleClose = () => setModal({ ...initModal });

    const handleService = async (type, id) => {
        const { username } = store.user;

        let result;
        if (type === "edit") return console.log("EDIT");
        if (type === "delete") result = await fetchDelete(id, username);
        
        setNotify({ ...notify, ...result.notify });
        dispatch({ type: "UPDATE", payload: result.user });
    };

    const handleNotify = () => setNotify({ ...initNotify });

    if (!store.user) return "";
    return (
        <Grid container>
            {!store.user.posted
                ?
                ""
                :
                store.user.posted.map((item) =>
                <BookInfo book={item} handleOpen={handleOpen} />)}

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
