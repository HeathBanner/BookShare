import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';

import InfoEditor from './Editor/InfoEditor';
import LFBooksEditor from '../../components/Post/LFBook';
import LocationEditor from './Location/LocationEditor';
import {
    initModalProps,
    initNotify,
    initLFBooks,
    initLocation,
    emailSteps,
    passwordSteps,
    getEmailContent,
    getPasswordContent,
    fetchValidatePassword,
    fetchUpdatePassword,
    fetchUpdateEmail,
    fetchUpdateLF,
    fetchUpdateLocation,
    buttonInfo,
    buttonData
} from './Services/InfoServices';
import Notification from '../Notifications/Notify';

import { makeStyles } from '@material-ui/core';
import {
    Paper,
    Typography,
    Divider,
    IconButton,
    Icon,
    Modal
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
    paper: {
        display: 'flex',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
        width: '90%',
        padding: '10%',
        marginTop: 60,
        background: 'rgb(255, 255, 255, 0.3)'
    },
    infoContainer: {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
        marginBottom: 20,
        width: '100%'
    },
    username: {
        width: '100%',
        textAlign: 'center',
        color: '#E98074'
    },
    dividers: {
        marginBottom: 20,
        marginBlockStart: '0.5em',
        width: '60%',
        backgroundColor: 'rgb(0, 0, 0, 0.2)'
    },
    infoTitle: {
        textAlign: 'center',
        width: '100%',
        paddingTop: 12
    },
    info: {
        width: '100%',
        textAlign: 'center',
        color: '#8E8D8A'
    },
    secure: {
        width: '100%',
        background: 'black',
        color: 'black',
        display: 'inline',

    },
    buttons: {
        position: 'absolute',
        top: 0,
        left: 0,
    }
}));

// CLEAN UP FUNCTIONS AND CONSTS TO SERVICES
const PersonalInfo =  ({ history }) => {

    const classes = useStyles();
    const store = useSelector(store => store);
    const dispatch = useDispatch();

    const { username } = store.user;

    const [modalProps, setModalProps] = useState({ ...initModalProps });
    const [lfBooks, setLFBooks] = useState({ ...initLFBooks });
    const [location, setLocation] = useState({ ...initLocation });
    const [notify, setNotify] = useState({ ...initNotify })

    const closeLocation = () => setLocation({ ...location, open: false });
    const closeLFBooks = () => setLFBooks({ ...lfBooks, open: false });
    const handleList = () => setLFBooks({ ...lfBooks, openList: !lfBooks.openList });

    const handleInput = (event, type, key) => {
        const newValue = event.target.value;
        switch (type) {
            case "lfBooks":
                setLFBooks({ ...lfBooks, value: newValue });
                break;
            case "location":
                setLocation({ ...location, [key]: newValue });
                break;
            default:
                break;
        }
    };

    const handleAutocomplete = (value, key) => {
        setLocation({ ...location, [key]: value.title });
    };

    const lfBooksInput = (event) => {
        setLFBooks({ ...lfBooks, value: event.target.value });
    };

    const addBook = (title) => {
        let newList = lfBooks.list;
        newList.push(title);

        setLFBooks({ ...lfBooks, list: newList, value: "" });
    };

    const removeBook = (index) => {
        let newList = lfBooks.list;
        newList.splice(index, 1);

        setLFBooks({ ...lfBooks, list: newList });
    };

    const handleType = (type) => {
        switch (type) {
            case "email":
            case "password":
                setModalProps({
                    ...modalProps,
                    open: true,
                    type: type
                });
                break;
            case "posted":
                history.push("/bookshelf");
                break;
            case "lfBooks":
                setLFBooks({ ...lfBooks, open: true });
                break;
            case "location":
                setLocation({ ...location, open: true });
                break;
            default:
                break;
        }
    };

    const handleSave = async (type) => {
        switch (type) {
            case "lfBooks":
                handleUpdateLF();
                break;
            case "location":
                handleUpdateLocation();
                break;
            default:
                break;
        }
    };

    const handleUpdateLF = async () => {
        const result = await fetchUpdateLF(lfBooks.list, username);
        if (result.warning || result.error) return setNotify({ ...notify, ...result });

        setLFBooks({ ...initLFBooks });
        dispatch({ type: "UPDATE", payload: result });
    };

    const handleUpdateLocation = async () => {
        const result = await fetchUpdateLocation(location, username);
        if (result.warning || result.error) return setNotify({ ...notify, ...result });

        setLocation({ ...initLocation });
        dispatch({ type: "UPDATE", payload: result });
    };

    const closeMainNotify = () => {
        if (location.open) setLocation({ ...initLocation });
        else setLFBooks({ ...initLFBooks });

        setNotify({ ...initNotify });
    };

    const closeModal = () => setModalProps({ ...initModalProps });
    const closeModalNotify = () => {
        if (modalProps.activeStep === 0 || modalProps.notify.warning) {
            return setModalProps(prevState => ({
                ...prevState,
                notify: { ...initModalProps.notify }
            }));
        }

        setModalProps({ ...initModalProps });
        dispatch({ type: "RELOG" });
    };

    const handleNext = async () => {
        let status;
        const { activeStep, type } = modalProps;

        if (activeStep === 0) status = await fetchValidatePassword(modalProps, username);
        if (type === "email" && activeStep === 1) status = await fetchUpdateEmail(modalProps, username);
        if (type === "password" && activeStep === 1) status = await fetchUpdatePassword(modalProps, username);

        return setModalProps({ ...status });
    };

    const handleBack = () => {
        setModalProps(prevState => ({ ...prevState, activeStep: prevState.activeStep - 1 }));
    };

    const inputModal = (event, type) => {
        const { value } = event.target;
        if (type === "visible") return setModalProps({ ...modalProps, visible: !modalProps.visible });

        setModalProps({ ...modalProps, [type]: value });
    };

    if (!store.user) return "";
    return (
        <Paper className={classes.paper}>
            <InfoEditor
                modalProps={modalProps}
                handleClose={closeModal}
                handleChange={inputModal}
                handleNext={handleNext}
                handleBack={handleBack}
                steps={modalProps.type === "email" ? emailSteps : passwordSteps}
                getEmailContent={getEmailContent}
                getPasswordContent={getPasswordContent}
            />
            
            <Modal
                open={lfBooks.open || location.open}
                onClose={lfBooks.open ? closeLFBooks : closeLocation}
                timeout="auto"
                unmountOnExit
            >
                {lfBooks.open ? (
                    <LFBooksEditor
                        lfBooks={lfBooks.list}
                        handleClose={closeLFBooks}
                        handleChange={lfBooksInput}
                        addBook={addBook}
                        removeBook={removeBook}
                        handleList={handleList}
                        handleSave={handleSave}
                        isModal={true}
                    />
                ) : (
                    <LocationEditor
                        location={location}
                        handleChange={handleInput}
                        handleAutocomplete={handleAutocomplete}
                        handleSave={handleSave}
                    />
                )}
            </Modal>

            <Notification
                notification={modalProps.open ? modalProps.notify : notify}
                handleClose={modalProps.open ? closeModalNotify : closeMainNotify}
            />

            <Typography
                className={classes.username}
                variant="h5"
            >
                Hello, {username}
            </Typography>

            <Divider className={classes.dividers} />

            {buttonInfo.map((button, index) => {
                return (
                    <div className={classes.infoContainer} key={`${button.text + index}`}>
                        <IconButton
                            className={classes.buttons}
                            onClick={() => handleType(button.data)}
                        >
                            <Icon>{button.icon}</Icon>
                        </IconButton>
                        <Typography
                            className={classes.infoTitle}
                        >
                            {button.text}
                        </Typography>

                        <Divider className={classes.dividers} />

                            {button.data === "password"
                                ?
                                <p className={classes.secure}>You Thought</p>
                                :
                                <Typography
                                    className={classes.info}
                                >
                                    {buttonData(button.data, store.user)}
                                </Typography>
                            }
                    </div>
                );
            })}
        </Paper>
    );
};

export default withRouter(PersonalInfo);
