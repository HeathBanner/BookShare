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
        padding: '5%',
    },
    buttons: {
        width: '100%',
        padding: 10,
        marginBottom: 20
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
