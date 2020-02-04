import React from 'react';

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

                    {activeStep === steps.length ? (
                        <div>
                            <Typography>
                                All steps completed
                            </Typography>
                            <Button>
                                Done
                            </Button>
                        </div>
                    ) : (
                        <div>
                            <Typography>
                                {getStepContent(activeStep)}
                            </Typography>

                                <Button
                                    onClick={handleBack}
                                    disabled={activeStep === 0}
                                >
                                Back
                            </Button>

                                <Button
                                    onClick={handleNext}
                                    disabled={activeStep === steps.length - 1}
                                >
                                Next
                            </Button>
                        </div>
                        )}


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
