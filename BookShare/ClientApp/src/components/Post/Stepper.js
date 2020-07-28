import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import validation from './Services/Validation';
import BookIntro from './Inputs/BookIntro';
import BookInfo from './Inputs/BookInfo';
import BookOutro from './Inputs/BookOutro';

import { makeStyles } from '@material-ui/styles';
import {
    Paper,
    Typography,
    Button,
    Stepper,
    Step,
    StepLabel
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
    paper: {
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
        width: '80%',
        padding: '10px 20px',
        marginTop: 36
    },
    stepper: {
        width: '100%'
    },
    contentContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
        alignItem: 'center',
        flexWrap: 'wrap'
    }
}));

const getSteps = () => ["Book Intro", "Book Info", "Book Outro"];

export default ({ book, handleInput, handleAutocomplete, bookInput, handleSubmit }) => {

    const classes = useStyles();
    const store = useSelector(store => store);
    const dispatch = useDispatch();

    const [activeStep, setActiveStep] = useState(0);
    const steps = getSteps();
    const notValid = validation(activeStep, book);

    useEffect(() => {
        try {
            if (store.success) setActiveStep(0);
        } catch (error) {
            dispatch({ type: "ERROR_NOTIFY", payload: "Something went wrong :(" });
        }
    }, [store.success]);

    const handleNext = () => setActiveStep(prevActiveStep => prevActiveStep + 1);
    const handleBack = () => setActiveStep(prevActiveStep => prevActiveStep - 1);

    const inputSwitch = (snapStep) => {
        try {
            const props = { handleInput, book };
    
            switch (snapStep) {
                case 0:
                    return <BookIntro {...props} />;
                case 1:
                    return <BookInfo handleAutocomplete={handleAutocomplete} {...props} />;
                case 2:
                    return <BookOutro bookInput={bookInput} {...props} />;
                default:
                    return;
            }
        } catch (error) {
            dispatch({ type: "ERROR_NOTIFY", payload: "Something went wrong :(" });
        }
    };

    return (
        <Paper className={classes.paper}>

            <Stepper className={classes.stepper} activeStep={activeStep}>
                {steps.map((label) => {
                    const stepProps = {};
                    const labelProps = {};
                    return (
                        <Step key={label} {...stepProps}>
                            <StepLabel {...labelProps}>{ label }</StepLabel>
                        </Step>
                    );
                })}
            </Stepper>

            {activeStep === steps.length ? (
                <div>
                    <Typography>
                        All steps completed. You're finished...
                    </Typography>
                    <Button>
                        Done
                    </Button>
                </div>
            ) : (
                <div className={classes.contentContainer}>
                    {inputSwitch(activeStep)}

                    <Typography style={{ width: '100%', textAlign: 'center' }}>
                        {notValid ? notValid : "You may proceed"}
                    </Typography>
                    <Button disabled={activeStep <= 0} onClick={handleBack}>
                        Back
                    </Button>
                    <Button
                        disabled={notValid}
                        onClick={activeStep === steps.length - 1 ? handleSubmit : handleNext}
                    >
                        {activeStep === steps.length - 1 ? "Finish" : "Next"}
                    </Button>
                </div>
            )}
        </Paper>
    );
};