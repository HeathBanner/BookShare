import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import InfoEditor from './Editor/InfoEditor';
import {
    initModalProps,
    steps,
    getStepContent,
    fetchValidatePassword
} from './Services/InfoServices';

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
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginBottom: 20,
        width: '100%'
    },
    username: {
        width: '100%',
        textAlign: 'center'
    },
    divider: {
        marginBottom: 20,
        marginBlockStart: '0.5em',
        width: '60%',
        backgroundColor: 'rgb(0, 0, 0, 0.2)'
    },
    email: {
    }
}));

// CLEAN UP FUNCTIONS AND CONSTS TO SERVICES
export default () => {

    const classes = useStyles();
    const store = useSelector(store => store);

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

    const handleNext = async () => {
        let status;

        if (modalProps.activeStep === 0) status = await fetchValidatePassword(modalProps, store.user.username);
        //if (modalProps.type === "Email")  status = await fetchUpdateEmail(modalProps);
        //else status = await fetchUpdatePassword(modalProps);

        return setModalProps({ ...status });
    };

    const handleBack = () => {
        setModalProps(prevState => ({ ...prevState, activeStep: prevState.activeStep - 1 }));
    };

    const inputModal = (event, type) => {
        const { value } = event.target;
        setModalProps({ ...modalProps, [type]: value });
    };

    const submitModal = () => {
        console.log(modalProps);
    };

    if (!store.user) return "";
    return (
        <Paper className={classes.paper}>
            <InfoEditor
                modalProps={modalProps}
                handleClose={closeModal}
                handleSubmit={submitModal}
                handleChange={inputModal}
                handleNext={handleNext}
                handleBack={handleBack}
                steps={steps}
                getStepContent={getStepContent}
            />

            <Typography
                className={classes.username}
                variant="h5"
            >
                Hello, {username}
            </Typography>

            <Divider className={classes.divider} />

            <div className={classes.infoContainer}>
                <IconButton
                    onClick={() => changeInfo("Email")}
                >
                    <Icon>edit</Icon>
                </IconButton>
                <Typography
                    className={classes.email}
                >
                    Email: {email}
                </Typography>
            </div>

            <div className={classes.infoContainer}>
                <IconButton
                    onClick={() => changeInfo("Password")}
                >
                    <Icon>
                        edit
                    </Icon>
                </IconButton>
                <Typography>
                    Password:
                </Typography>
                <Icon>vpn_key</Icon>
            </div>

            <div className={classes.infoContainer}>
                <IconButton>
                    <Icon>
                        open_in_browser
                    </Icon>
                </IconButton>
                <Typography>
                    Books posted: {posted.length}
                </Typography>
            </div>
        </Paper>
    );
};
