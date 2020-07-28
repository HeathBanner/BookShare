import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import {
    Modal,
    IconButton,
    Icon
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
    modal: {
        width: '100%',
        display: 'flex',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    container: {
        display: 'flex',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
        width: '100%'
    },
    image: {
        width: '60%',
        height: 'auto'
    },
    icons: {
        color: '#21ce99'
    }
}));

export default ({ images, open, handleClose }) => {

    const [index, setIndex] = useState(0);
    const classes = useStyles();
    const dispatch = useDispatch();

    const beginClose = () => {
        try {
            setIndex(0);
            handleClose();
        } catch (error) {
            dispatch({ type: "ERROR_NOTIFY", message: "Image Viewer had an oopsie" });
        }
    };
    
    if (!images) return "";
    const image = "data:image/jpeg;base64," + images[index].url;
    return (
        <Modal className={classes.modal} open={open} onClose={beginClose}>
            <div className={classes.container}>

                <IconButton
                    onClick={() => setIndex(index - 1)}
                    disabled={index <= 0}
                >
                    <Icon
                        fontSize={"large"}
                        className={classes.icons}
                    >
                        navigate_before
                    </Icon>
                </IconButton>
                <img className={classes.image} src={image}/>
                <IconButton
                    style={{ zIndex: 550 }}
                    onClick={() => setIndex(index + 1)}
                    disabled={index >= images.length - 1}
                >
                    <Icon
                        fontSize={"large"}
                        className={classes.icons}
                    >
                        navigate_next
                    </Icon>
                </IconButton>
            </div>
        </Modal>
    );
};