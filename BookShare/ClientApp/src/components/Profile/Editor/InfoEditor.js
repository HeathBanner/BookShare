import React from 'react';

import Inputs from './Inputs';
import StepButtons from './StepButtons';

import { makeStyles } from '@material-ui/styles';
import {
    Modal,
    Backdrop,
    Fade,
    Paper,
    Stepper,
    Step,
    StepLabel
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
    const { open, activeStep } = modalProps;

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

                        {steps.map((label) => {
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

                    <Inputs
                        modalProps={modalProps}
                        handleChange={handleChange}
                    />

                    <StepButtons
                        switchBoard={activeStep === steps.length}
                        activeStep={activeStep}
                        getStepContent={getStepContent}
                        handleBack={handleBack}
                        handleNext={handleNext}
                        handleSubmit={handleSubmit}
                        steps={steps}
                    />
                </Paper>
            </Fade>
        </Modal>
    );
};
