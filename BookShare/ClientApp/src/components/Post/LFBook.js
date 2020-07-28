import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { makeStyles } from '@material-ui/styles';
import {
    Paper,
    Typography,
    FormControl,
    InputLabel,
    Input,
    InputAdornment,
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
    input: {
        width: '100%',
        marginBottom: 10
    },
    addButton: {
        width: '100%',
        marginBottom: 10,
        padding: 5,
        backgroundColor: '#21ce99',
        color: 'white',
        transition: 'background-color 0.4s ease',
        '&:hover': {
            backgroundColor: '#1ee8ab',
            color: 'white'
        }
    },
    saveButton: {
        width: '100%',
        marginBottom: 10,
        padding: 5,
        backgroundColor: '#21ce99',
        color: 'white',
        transition: 'background-color 0.4s ease',
        '&:hover': {
            backgroundColor: '#1ee8ab',
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
    },
    underline: {
        '&:before': {
            borderBottom: '1px solid #21ce99'
        },
        '&:after': {
            borderBottom: `2px solid #21ce99`
        },
        '&:hover:not($disabled):not($focused):not($error):before': {
            borderBottom: `2px solid #f50057`
        },
        '&.MuiFormLabel-root': {
            color: '#21ce99'
        },
        '&.MuiFormLabel-root .Mui-focused': {
            color: '#21ce99'
        }
    },
    label: {
        color: '#21ce99 !important',
    }
}));

const initState = {
    value: "",
    open: true
};

export default ({ lfBooks, handleBooks, handleSave, isModal, handleClose }) => {

    const classes = useStyles();
    const dispatch = useDispatch();

    const [state, setState] = useState({ ...initState });

    const handleChange = (event) => {
        try {
            setState({ ...state, value: event.target.value });
        } catch (error) {
            dispatch({ type: "ERROR_NOTIFY", payload: "Something went wrong :(" });
        }
    };

    const preAdd = () => {
        try {
            handleBooks("ADD", state.value);
            setState({ ...initState });
        } catch (error) {
            dispatch({ type: "ERROR_NOTIFY", payload: "Something went wrong :(" });
        }
    };

    const handleList = () => setState({ ...state, open: !state.open });

    return (
        <Paper
            className={isModal ? classes.modalPaper : classes.listContainer}
        >
            <IconButton className={classes.closeButton} onClick={handleClose}>
                <Icon>close</Icon>
            </IconButton>
            <Typography
                className={classes.header}
            >
                Tradeable Books
            </Typography>

            <FormControl style={{ width: '100%' }}>
                <InputLabel classes={{ focused: classes.label }}>Title</InputLabel>
                <Input
                    className={classes.input}
                    classes={{ underline: classes.underline }}
                    value={state.value}
                    onChange={(e) => handleChange(e)}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                onClick={preAdd}
                            >
                                <Icon style={{ color: '#1976d2' }}>add</Icon>
                            </IconButton>
                        </InputAdornment>
                    }
                />
            </FormControl>

            <List className={classes.list}>
                <ListItem
                    className={classes.listHeader}
                    button
                    onClick={handleList}
                >
                    <ListItemIcon>
                        <Icon style={{ color: '#1976d2' }}>{state.open ? "remove" : "add"}</Icon>
                    </ListItemIcon>
                    <ListItemText primary="Book List" />
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