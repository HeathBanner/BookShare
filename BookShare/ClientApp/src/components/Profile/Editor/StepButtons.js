import React from 'react';

import { makeStyles } from '@material-ui/styles';
import { Typography, Button } from '@material-ui/core';

const useStyles = makeStyles(() => ({

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
    );
};
