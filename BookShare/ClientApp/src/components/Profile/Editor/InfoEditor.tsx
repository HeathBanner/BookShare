import React, { PureComponent } from 'react';

import { IModal } from '../Services/InfoServices';
import Inputs from './Inputs';
import StepButtons from './StepButtons';

import { createStyles, withStyles } from '@material-ui/styles';
import {
    Modal,
    Backdrop,
    Fade,
    Paper,
    Stepper,
    Step,
    StepLabel
} from '@material-ui/core';

const styles = () => createStyles({
    paper: {
        display: 'flex',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
        position: 'fixed',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        padding: '5%',
        width: '80%'
    },
});

interface IProps {
    modalProps: IModal;
    handleClose: () => void;
    handleSubmit: (type: string) => void;
    handleChange: (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, type: string) => void;
    handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
    steps: string[];
    getEmailContent: (step: number) => string;
    getPasswordContent: (step: number) => string;
    handleNext: () => void;
    handleBack: () => void;
    classes: any;
};

class InfoEditor extends PureComponent<IProps> {
    render(): JSX.Element {
        return (
            <Modal
                open={this.props.modalProps.open}
                onClose={this.props.handleClose}
                BackdropComponent={Backdrop}
                BackdropProps={{ timeout: 500 }}
            >
                <Fade in={this.props.modalProps.open}>
                    <Paper className={this.props.classes.paper}>
                        <Stepper
                            style={{ padding: 0, marginBottom: 20 }}
                            activeStep={this.props.modalProps.activeStep}
                        >
    
                            {this.props.steps.map((label) => {
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
                            modalProps={this.props.modalProps}
                            handleChange={this.props.handleChange}
                            handleClick={this.props.handleClick}
                        />
    
                        <StepButtons
                            switchBoard={this.props.modalProps.activeStep === this.props.steps.length}
                            activeStep={this.props.modalProps.activeStep}
                            getStepContent={this.props.modalProps.type === "password" ? this.props.getPasswordContent : this.props.getEmailContent}
                            handleBack={this.props.handleBack}
                            handleNext={this.props.handleNext}
                            handleSubmit={this.props.handleSubmit}
                            steps={this.props.steps}
                        />
                    </Paper>
                </Fade>
            </Modal>
        );
    };
};

export default withStyles(styles)(InfoEditor);