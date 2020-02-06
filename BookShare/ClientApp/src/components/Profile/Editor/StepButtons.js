import React from 'react';

import { makeStyles } from '@material-ui/styles';
import { Typography, Button } from '@material-ui/core';

const useStyles = makeStyles(() => ({
    stepContent: {
        display: 'flex',
        alignItem: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
        padding: '0 5%'
    },
    stepText: {
        marginBottom: 15,
        textAlign: 'center',
        width: '100%'
    },
    stepButtons: {
        flexGrow: 1,
        padding: 10
    }
}));

export default ({
    switchBoard,
    activeStep,
    getStepContent,
    handleBack,
    handleNext,
    steps
}) => {

    const classes = useStyles();

    if (switchBoard) {
        return (
            <div>
                <Typography>
                    All steps completed
                </Typography>
                <Button>
                    Done
                </Button>
            </div>
        );
    }

    return (
        <div className={classes.stepContent}>
            <Typography
                className={classes.stepText}
            >
                {getStepContent(activeStep)}
            </Typography>

            <Button
                className={classes.stepButtons}
                onClick={handleBack}
                disabled={activeStep === 0}
            >
                Back
            </Button>

            <Button
                className={classes.stepButtons}
                onClick={handleNext}
                disabled={activeStep === steps.length - 1}
            >
                Next
            </Button>
        </div>
    );
};
