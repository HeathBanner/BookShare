import React, { PureComponent } from 'react';

import { createStyles, withStyles } from '@material-ui/styles';
import { Typography, Button } from '@material-ui/core';

const styles = () => createStyles({
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
});

interface IProps {
    switchBoard: boolean;
    activeStep: number;
    getStepContent: (step: number) => string;
    handleNext: () => void;
    handleBack: () => void;
    handleSubmit: (type: string) => void;
    steps: string[];
    classes: any;
};

class StepButtons extends PureComponent<IProps> {
    render(): JSX.Element {
        if (this.props.switchBoard) {
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
        else return (
            <div className={this.props.classes.stepContent}>
                <Typography
                    className={this.props.classes.stepText}
                >
                    {this.props.getStepContent(this.props.activeStep)}
                </Typography>
    
                <Button
                    className={this.props.classes.stepButtons}
                    onClick={this.props.handleBack}
                    disabled={this.props.activeStep === 0}
                >
                    Back
                </Button>
    
                <Button
                    className={this.props.classes.stepButtons}
                    onClick={this.props.handleNext}
                    disabled={this.props.activeStep === this.props.steps.length - 1}
                >
                    Next
                </Button>
            </div>
        );
    };
};

export default withStyles(styles)(StepButtons);