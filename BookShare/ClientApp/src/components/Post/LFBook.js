import React, { useState } from 'react';

import { makeStyles } from '@material-ui/styles';
import {
    Paper,
    Typography,
    TextField,
    Button,
    List,
    ListItem,
    ListItemSecondaryAction,
    ListItemText,
    ListItemIcon,
    IconButton,
    Icon,
    Collapse,
    Divider
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
    listContainer: {
        display: 'flex',
        alignContent: 'center',
        alignItems: 'center',
        justifyItems: 'center',
        flexWrap: 'wrap',
        padding: 10,
        marginBottom: 20,
        width: '100%'
    },
    modalPaper: {
        display: 'flex',
        alignContent: 'center',
        alignItems: 'center',
        justifyItems: 'center',
        flexWrap: 'wrap',
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        padding: '5%',
        marginBottom: 20,
        width: '80%',
        zIndex: 5
    },
    header: {
        width: '100%',
        textAlign: 'center',
        marginBottom: 10
    },
    list: {
        width: '100%'
    },
    LFInput: {
        width: '100%',
        marginBottom: 10
    },
    addButton: {
        width: '100%',
        marginBottom: 10,
        padding: 5,
        backgroundColor: '#ca1d5d',
        color: 'white',
        transition: 'background-color 0.4s ease',
        '&:hover': {
            backgroundColor: '#de1f27',
            color: 'white'
        }
    },
    saveButton: {
        width: '100%',
        marginBottom: 10,
        padding: 5,
        backgroundColor: '#ca1d5d',
        color: 'white',
        transition: 'background-color 0.4s ease',
        '&:hover': {
            backgroundColor: '#de1f27',
            color: 'white'
        }
    },
    divider: {
        marginBlockStart: '0.5em',
        width: '100%',
        backgroundColor: 'rgb(0, 0, 0, 0.2)'
    },
    closeButton: { 
        position: 'absolute',
        top: 0,
        right: 0,
    }
}));

const initState = {
    value: "",
    open: true
};

export default ({ lfBooks, handleBooks, addBook, removeBook, handleSave, isModal, toggle }) => {

    const classes = useStyles();

    const [state, setState] = useState({ ...initState });

    const handleChange = (event) => {
        setState({ ...state, value: event.target.value });
    };

    const preAdd = () => {
        handleBooks("ADD", state.value);
        setState({ ...initState });
    };

    const handleList = () => setState({ ...state, open: !state.open });

    return (
        <Paper
            className={
                isModal ? classes.modalPaper : classes.listContainer
            }
        >
            <IconButton className={classes.closeButton} onClick={toggle}>
                <Icon>close</Icon>
            </IconButton>
            <Typography
                className={classes.header}
            >
                Tradeable Books
            </Typography>

            <TextField
                className={classes.LFInput}
                value={state.value}
                onChange={(e) => handleChange(e)}
                label="Title"
            />

            <Button
                className={classes.addButton}
                onClick={preAdd}
            >
                Add
            </Button>

            <List className={classes.list}>
                <ListItem
                    className={classes.listHeader}
                    button
                    onClick={handleList}
                >
                    <ListItemText primary="Book List" />
                    <ListItemIcon>
                        <Icon>{state.open ? "expand_less" : "expand_more"}</Icon>
                    </ListItemIcon>
                </ListItem>
                <Divider className={classes.divider} />
                <Collapse in={state.open} timeout="auto" unmountOnExit>
                    {lfBooks ? lfBooks.map((item, index) => {
                            return (
                                <ListItem key={`${item}&${index}`}>
                                    <ListItemSecondaryAction>
                                        <IconButton
                                            onClick={() => handleBooks("REMOVE", index)}
                                        >
                                            <Icon>clear</Icon>
                                        </IconButton>
                                    </ListItemSecondaryAction>

                                    <ListItemText primary={item} />
                                </ListItem>
                            );
                        }) : ""}
                    </Collapse>
                </List>

                {isModal ? (
                <Button
                    className={classes.saveButton}
                    onClick={() => handleSave("lfBooks")}
                >
                    Save
                </Button>
                ) : ""}
        </Paper>
    );
};