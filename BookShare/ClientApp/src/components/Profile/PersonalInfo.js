import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import InfoEditor from './Editor/InfoEditor';
import {
    initModalProps,
    emailSteps,
    passwordSteps,
    getStepContent,
    fetchValidatePassword,
    fetchUpdatePassword,
    fetchUpdateEmail,
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
    Icon
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
        marginTop: 20
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
export default () => {

    const classes = useStyles();
    const store = useSelector(store => store);
    const dispatch = useDispatch();

    const { email, username, posted } = store.user;

    const [modalProps, setModalProps] = useState({ ...initModalProps });

    const changeInfo = (type) => {
        setModalProps({
            ...modalProps,
            open: true,
            type: type
        });
    };

    const closeModal = () => setModalProps({ ...initModalProps });
    const closeNotify = () => {
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
        const username = store.user.username;
        const { activeStep, type } = modalProps;

        if (activeStep === 0) status = await fetchValidatePassword(modalProps, username);
        if (type === "Email" && activeStep === 1) status = await fetchUpdateEmail(modalProps, username);
        if (type === "Password" && activeStep === 1) status = await fetchUpdatePassword(modalProps, username);

        return setModalProps({ ...status });
    };

    const handleBack = () => {
        setModalProps(prevState => ({ ...prevState, activeStep: prevState.activeStep - 1 }));
    };

    const inputModal = (event, type) => {
        const { value } = event.target;
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
                steps={modalProps.type === "Email" ? emailSteps : passwordSteps}
                getStepContent={getStepContent}
            />

            <Notification
                notification={modalProps.notify}
                handleClose={closeNotify}
            />

            <Typography
                className={classes.username}
                variant="h5"
            >
                Hello, {username}
            </Typography>

            <Divider className={classes.dividers} />

            {buttonInfo.map((button) => {
                return (
                    <div className={classes.infoContainer}>
                        <IconButton
                            className={classes.buttons}
                            onClick={button.click ? () => changeInfo("Email") : ""}
                        >
                            <Icon>{button.icon}</Icon>
                        </IconButton>
                        <Typography
                            className={classes.infoTitle}
                        >
                            {button.text}
                        </Typography>

                        <Divider className={classes.dividers} />

                        <Typography
                            className={classes.info}
                        >
                            {button.data === "password"
                                ?
                                <p className={classes.secure}>You Thought</p>
                                :
                                buttonData(button.data, store.user)}
                        </Typography>
                    </div>
                );
            })}
        </Paper>
    );
};
