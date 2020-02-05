import React from 'react';

import StepButtons from './StepButtons';

import { makeStyles } from '@material-ui/styles';
import {
    Modal,
    Backdrop,
    Fade,
    Paper,
    TextField,
    Button,
    Stepper,
    Step,
    StepLabel,
    Typography
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
    paper: {
        display: 'flex',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
        padding: '5%'
    },
    input: {
        width: '100%',
        marginBottom: 20
    },
    button: {
        width: '100%',
        padding: 10,
    }
}));

// TRY AND FIGURE OUT AN ELEGANT SOLUTION TO CLEANING UP THE PROPS

export default ({
    modalProps,
    handleClose,
    handleSubmit,
    handleChange,
    steps,
    getStepContent,
    handleNext,
    handleBack
}) => {

    const classes = useStyles();
    const { open, type, email, password, activeStep } = modalProps;

    return (
        <Modal
            open={open}
            onClose={handleClose}
            BackdropComponent={Backdrop}
            BackdropProps={{ timeout: 500 }}
        >
            <Fade in={open}>
                <Paper className={classes.paper}>
                    <Stepper activeStep={activeStep}>


                        {steps.map((label, index) => {
                            const stepProps = {};
                            const labelProps = {};

                            return (
                                <Step key={label} {...stepProps}>
                                    <StepLabel {...labelProps}>
                                        {label}
                                    </StepLabel>
                                </Step>
                            );
                        })}
                    </Stepper>

                    <StepButtons
                        switchBoard={activeStep === steps.length}
                        activeStep={activeStep}
                        getStepContent={getStepContent}
                        handleBack={handleBack}
                        handleNext={handleNext}
                        steps={steps}
                    />

                    <TextField
                        className={classes.input}
                        label={type}
                        value={type === "Email" ? email : password}
                        onChange={(e) => handleChange(e, type)}
                    />

                    <Button
                        className={classes.button}
                        onClick={handleSubmit}
                    >
                        Submit
                    </Button>
                </Paper>
            </Fade>
        </Modal>
    );
};
