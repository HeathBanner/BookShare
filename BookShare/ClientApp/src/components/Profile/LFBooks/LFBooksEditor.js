import React from 'react';

import { makeStyles } from '@material-ui/styles';
import {
    Modal,
    Backdrop,
    Fade,
    Paper,
    TextField,
    Icon,
    Button
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
    paper: {
        display: 'flex',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        padding: '5%',
        width: '80%'
    },
    input: {
        width: '100%',
    }
}));

export default ({ lfBooks, handleClose, handleChange }) => {

    const classes = useStyles();

    const { open, value } = lfBooks;

    return (
        <Modal
            open={open}
            onClose={handleClose}
            BackdropComponent={Backdrop}
            BackdropProps={{ timeout: 500 }}
        >
            <Fade in={open}>
                <Paper className={classes.paper}>
                    <TextField
                        className={classes.input}
                        value={value}
                        onChange={(e) => handleChange(e)}
                        label="Title"
                    />
                </Paper>
            </Fade>
        </Modal>
    );
};
