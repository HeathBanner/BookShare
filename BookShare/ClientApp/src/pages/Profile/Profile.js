import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import InfoEditor from '../../components/Profile/Editor/InfoEditor';
import LFBooksEditor from '../../components/Post/LFBook';
import LocationEditor from '../../components/Profile/Location/LocationEditor';
import InfoScreen from '../../components/ScreenCatchers/InfoScreen';
import * as services from '../../components/Profile/Services/InfoServices';
import Notification from '../../components/Notifications/Notify';

import { makeStyles, useTheme } from '@material-ui/core';
import {
    Grid,
    Paper,
    Typography,
    Divider,
    Button,
    Icon,
    Modal
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '5%',
    },
    paper: {
        display: 'flex',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
        width: '40%',
        padding: '5%',
        marginTop: 60,
        background: 'rgb(255, 255, 255, 0.3)',
        [theme.breakpoints.down('xs')]: {
            width: '90%',
            padding: '10%'
        }
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
        textAlign: 'center'
    },
    dividers: {
        marginBottom: 20,
        marginBlockStart: '0.5em',
        width: '60%',
        backgroundColor: 'rgb(0, 0, 0, 0.3)'
    },
    infoTitle: {
        textAlign: 'center',
        width: '100%',
        color: '#21ce99',
        padding: 10,
        borderRadius: 20
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

export default ({ history }) => {

    const theme = useTheme();
    const classes = useStyles(theme);
    const store = useSelector(store => store);
    const dispatch = useDispatch();

    const { username } = store.user;

    const [modalProps, setModalProps] = useState({ ...services.initModalProps });
    const [lfBooks, setLFBooks] = useState({ ...services.initLFBooks });
    const [location, setLocation] = useState({ ...services.initLocation });
    const [notify, setNotify] = useState({ ...services.initNotify })

    useEffect(() => {
        try {
            if (!store.user || lfBooks.loaded) return;

            const list = store.user.lfBooks;
            setLFBooks({ ...lfBooks, list: list, loaded: true });
        } catch (error) {
            dispatch({ type: "ERROR_NOTIFY", payload: "Something went wrong :(" });
        }
    }, [store, lfBooks]);

    const closeLocation = () => setLocation({ ...location, open: false });
    const closeLFBooks = () => setLFBooks({ ...lfBooks, open: false });
    const handleList = () => setLFBooks({ ...lfBooks, openList: !lfBooks.openList });

    const handleInput = (event, type, key) => {
        try {
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
        } catch (error) {
            dispatch({ type: "ERROR_NOTIFY", payload: "Something went wrong :(" });
        }
    };

    const handleAutocomplete = (value, key) => {
        try {
            setLocation({ ...location, [key]: value.title });
        } catch (error) {
            dispatch({ type: "ERROR_NOTIFY", payload: "Something went wrong :(" });
        }
    };

    const lfBooksInput = (event) => {
        try {
            setLFBooks({ ...lfBooks, value: event.target.value });
        } catch (error) {
            dispatch({ type: "ERROR_NOTIFY", payload: "Something went wrong :(" });
        }
    };

    const handleBooks = (type, param) => {
        try {
            let newList = lfBooks.list;
            if (type === "REMOVE") {
                newList.splice(param, 1);
                setLFBooks({ ...lfBooks, list: newList });    
            } else {
                newList.push(param);
                setLFBooks({ ...lfBooks, list: newList, value: "" });    
            }
        } catch (error) {
            dispatch({ type: "ERROR_NOTIFY", payload: "Something went wrong :(" });
        }
    };

    const handleType = (type) => {
        try {
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
        } catch (error) {
            dispatch({ type: "ERROR_NOTIFY", payload: "Something went wrong :(" });
        }
    };

    const handleSave = async (type) => {
        try {
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
        } catch (error) {
            dispatch({ type: "ERROR_NOTIFY", payload: "Something went wrong :(" });
        }
    };

    const handleUpdateLF = async () => {
        try {
            const { fetchUpdateLF } = await import('../../components/Profile/Services/InfoServices');
            const result = await fetchUpdateLF(lfBooks.list, username);
            if (result.warning) {
                dispatch({ type: "WARNING_NOTIFY", payload: result.message });
            }
            if (result.error) {
                dispatch({ type: "ERROR_NOTIFY", payload: result.message });
            }
    
            setLFBooks({ ...services.initLFBooks });
            dispatch({ type: "UPDATE", payload: result });
        } catch (error) {
            dispatch({ type: "ERROR_NOTIFY", payload: "Something went wrong :(" });
        }
    };

    const handleUpdateLocation = async () => {
        try {
            const { fetchUpdateLocation } = await import('../../components/Profile/Services/InfoServices');
            const result = await fetchUpdateLocation(location, username);
            if (result.warning || result.error) return setNotify({ ...notify, ...result });
    
            dispatch({ type: "UPDATE", payload: result });
        } catch (error) {
            dispatch({ type: "ERROR_NOTIFY", payload: "Something went wrong :(" });
        }
    };

    const closeMainNotify = () => {
        try {
            if (location.open) setLocation({ ...services.initLocation });
            else setLFBooks({ ...services.initLFBooks });
            dispatch({ type: "RESET_NOTIFY" });
        } catch (error) {
            dispatch({ type: "ERROR_NOTIFY", payload: "Something went wrong :(" });
        }
    };

    const closeModal = () => setModalProps({ ...services.initModalProps });
    const closeModalNotify = () => {
        try {
            if (modalProps.activeStep === 0 || modalProps.notify.warning) {
                return setModalProps(prevState => ({
                    ...prevState,
                    notify: { ...services.initModalProps.notify }
                }));
            }
    
            setModalProps({ ...services.initModalProps });
            dispatch({ type: "RELOG" });
        } catch (error) {
            dispatch({ type: "ERROR_NOTIFY", payload: "Something went wrong :(" });
        }
    };

    const handleNext = async () => {
        try {
            let status;
            const { activeStep, type } = modalProps;
    
            if (activeStep === 0) {
                const { fetchValidatePassword } = await import('../../components/Profile/Services/InfoServices');
                status = await fetchValidatePassword(modalProps, username);
            }
            if (type === "email" && activeStep === 1) {
                const { fetchUpdateEmail } = await import('../../components/Profile/Services/InfoServices');
                status = await fetchUpdateEmail(modalProps, username);
            }
            if (type === "password" && activeStep === 1) {
                const { fetchUpdatePassword } = await import('../../components/Profile/Services/InfoServices');
                status = await fetchUpdatePassword(modalProps, username);
            }
    
            return setModalProps({ ...status });
        } catch (error) {
            dispatch({ type: "ERROR_NOTIFY", payload: "Something went wrong :(" });
        }
    };

    const handleBack = () => {
        setModalProps(prevState => ({ ...prevState, activeStep: prevState.activeStep - 1 }));
    };

    const inputModal = (event, type) => {
        try {
            const { value } = event.target;
            if (type === "visible") return setModalProps({ ...modalProps, visible: !modalProps.visible });
    
            setModalProps({ ...modalProps, [type]: value });
        } catch (error) {
            dispatch({ type: "ERROR_NOTIFY", payload: "Something went wrong :(" });
        }
    };

    if (!store.user) return (
        <InfoScreen
            message="You must be logged in to use this"
            action={false}
            icon="warning"
        />
    );
    return (
        <Grid container>
            <Grid className={classes.container} item xs={12}>
                <Paper className={classes.paper}>
                    <InfoEditor
                        modalProps={modalProps}
                        handleClose={closeModal}
                        handleChange={inputModal}
                        handleNext={handleNext}
                        handleBack={handleBack}
                        steps={modalProps.type === "email" ? services.emailSteps : services.passwordSteps}
                        getEmailContent={services.getEmailContent}
                        getPasswordContent={services.getPasswordContent}
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
                                handleBooks={handleBooks}
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

                    {services.buttonInfo.map((button, index) => {
                        return (
                            <div className={classes.infoContainer} key={`${button.text + index}`}>
                                <Button
                                    className={classes.infoTitle}
                                    onClick={() => handleType(button.data)}
                                    endIcon={<Icon>{button.icon}</Icon>}
                                >
                                    {button.text}
                                </Button>

                                <Divider className={classes.dividers} />

                                    {button.data === "password"
                                        ?
                                        <p className={classes.secure}>You Thought</p>
                                        :
                                        <Typography
                                            className={classes.info}
                                        >
                                            {services.buttonData(button.data, store.user)}
                                        </Typography>
                                    }
                            </div>
                        );
                    })}
                </Paper>
            </Grid>
        </Grid>
    );
};
