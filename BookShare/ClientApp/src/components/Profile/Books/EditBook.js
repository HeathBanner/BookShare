import React from 'react';

import { makeStyles } from '@material-ui/styles';
import {
    Button,
    Modal,
    Paper
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
    buttons: {
        width: '100%',
        padding: 10,
        color: 'white',
        backgroundColor: '#E85A4F',
        transition: 'background-color 0.4s ease',
        '&:hover': {
            backgroundColor: '#E98074',
            color: 'white'
        }
    }
}));

export default ({ modal, handleClose, handleService }) => {

    const classes = useStyles();

    return (
        <Modal
            open={modal.open}
            onClose={handleClose}
        >
            <Paper className={classes.paper}>
                <Button
                    className={classes.buttons}
                    onClick={() => handleService("edit", modal.id)}
                    style={{ marginBottom: 20 }}
                >
                    Edit
                </Button>

                <Button
                    className={classes.buttons}
                    onClick={() => handleService("delete", modal.id)}
                >
                    Delete
                </Button>
            </Paper>
        </Modal>
    );
};
