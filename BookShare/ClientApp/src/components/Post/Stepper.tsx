import React, { Component } from 'react';
import { connect } from 'react-redux';

import { IBook } from './Services/interfaces';
import validation, { IValid } from './Services/Validation';
import BookIntro from './Inputs/BookIntro';
import BookInfo from './Inputs/BookInfo';
import BookOutro from './Inputs/BookOutro';

import { createStyles, withStyles } from '@material-ui/styles';
import {
    Paper,
    Typography,
    Button,
    Stepper,
    Step,
    StepLabel
} from '@material-ui/core';

const styles = () => createStyles({
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
        flexWrap: 'wrap',
        width: '100%'
    }
});

const getSteps = () => ["Book Intro", "Book Info", "Book Outro"];

interface IState {
    activeStep: number;
};

interface IProps {
    book: IBook;
    handleInput: (type: string, event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
    handleSelectInput: (type: string, event: React.ChangeEvent<{ value: unknown }>) => void;
    saveImage: (event: React.ChangeEvent<HTMLInputElement>) => void;
    deleteImage: (index: number, event: React.MouseEvent<HTMLButtonElement>) => void;
    handleAutocomplete: (value: any) => void;
    bookInput: (type: string, param: string, index?: number) => void;
    handleSubmit: () => void;
    classes: any;
    store: any;
    dispatch: any;
};

class CustomStepper extends Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state = {
            activeStep: 0
        };
    };

    componentDidUpdate() {
        try {
            if (this.props.store.success) {
                this.setState({ activeStep: 0 });
            }
        } catch (error) {
            this.props.dispatch({ type: "ERROR_NOTIFY", payload: "Something went wrong :(" });
        }
    };

    private handleNext = (): void => {
        this.setState((state) => ({
            activeStep: state.activeStep + 1
        }));
    };
    private handleBack = (): void => {
        this.setState((state) => ({
            activeStep: state.activeStep - 1
        }));
    };

    private inputSwitch = (snapStep : number)=> {
        try {
            const props = { 
                handleInput: this.props.handleInput,
                saveImage: this.props.saveImage,
                deleteImage: this.props.deleteImage,
                book: this.props.book
            };
    
            switch (snapStep) {
                case 0:
                    return <BookIntro {...props} />;
                case 1:
                    return <BookInfo
                        handleAutocomplete={this.props.handleAutocomplete}
                        handleSelectInput={this.props.handleSelectInput}
                        {...props}
                    />;
                case 2:
                    return <BookOutro bookInput={this.props.bookInput} {...props} />;
                default:
                    return;
            }
        } catch (error) {
            this.props.dispatch({ type: "ERROR_NOTIFY", payload: "Something went wrong :(" });
        }
    };

    render(): JSX.Element {
        const steps: string[] = getSteps();
        const notValid: IValid = validation(this.state.activeStep, this.props.book);    
        return (
            <Paper className={this.props.classes.paper}>
    
                <Stepper className={this.props.classes.stepper} activeStep={this.state.activeStep}>
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
    
                {this.state.activeStep === steps.length ? (
                    <div>
                        <Typography>
                            All steps completed. You're finished...
                        </Typography>
                        <Button>
                            Done
                        </Button>
                    </div>
                ) : (
                    <div className={this.props.classes.contentContainer}>
                        {this.inputSwitch(this.state.activeStep)}
    
                        <Typography style={{ width: '100%', textAlign: 'center' }}>
                            {notValid.error ? notValid.message : "You may proceed"}
                        </Typography>
                        <Button disabled={this.state.activeStep <= 0} onClick={this.handleBack}>
                            Back
                        </Button>
                        <Button
                            disabled={notValid.error}
                            onClick={this.state.activeStep === steps.length - 1 ? this.props.handleSubmit : this.handleNext}
                        >
                            {this.state.activeStep === steps.length - 1 ? "Finish" : "Next"}
                        </Button>
                    </div>
                )}
            </Paper>
        );
    };
};

const mapStateToProps = (state : any) => ({ store: state });

export default connect(mapStateToProps)(withStyles(styles)(CustomStepper));