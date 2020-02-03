import React from 'react';

import { makeStyles } from '@material-ui/styles';
import {
    Modal,
    Paper,
    TextField,
    Button
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
    paper: {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        padding: '5%',
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
        width: '90%'
    },
    input: {
        width: '100%',
        marginBottom: 20
    },
    button: {
        width: '100%',
        padding: 10,
        color: 'white',
        backgroundColor: '#E85A4F',
        '&:hover': {
            backgroundColor: '#E98074',
        }
    }
}));

export default ({ open, handleInput, handleClose }) => {

    const classes = useStyles();

    return (
        <Modal
            open={open}
            onClose={handleClose}
        >
            <Paper className={classes.paper}>
                <TextField
                    onChange={(e) => handleInput("Image", e)}
                    label="Image URL"
                    className={classes.input}
                />

                <Button
                    className={classes.button}
                    onClick={handleClose}
                >
                    Done
                </Button>
            </Paper>
        </Modal>
    );
};
