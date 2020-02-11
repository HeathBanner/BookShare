import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router';

import BookInfo from '../../components/Profile/BookInfo';
import EditBook from '../../components/Profile/Books/EditBook';
import Notification from '../../components/Notifications/Notify';
import { fetchDelete, initModal, initNotify } from '../../components/Profile/Services/BookServices';

import { Grid } from '@material-ui/core';

const Books = ({ history }) => {

    const store = useSelector(store => store);
    const dispatch = useDispatch();
    
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

    if (!store.user) return "";
    return (
        <Grid
            style={{
                display: 'flex',
                alignContent: 'center',
                alignItems: 'center',
                justifyContent: 'center',
                flexWrap: 'wrap'
            }}
            container
        >
            {!store.user.posted
                ?
                ""
                :
                store.user.posted.map((item) =>
                    <BookInfo key={item.id} book={item} handleOpen={handleOpen} />)}

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