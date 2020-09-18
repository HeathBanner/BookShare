import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { History, LocationState } from 'history';
import { withRouter } from 'react-router-dom'; 

import { handleEmail, IEmail } from './services';
import {
    Grid,
    Typography,
    TextField,
    Button,
    InputAdornment,
    Icon,
} from '@material-ui/core';
import { withStyles, createStyles } from '@material-ui/core/styles';

const styles = () => createStyles({
    container: {
        display: 'flex',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
        padding: 20,
        minHeight: '100vh'
    },
    typo: {
        width: '100%',
        textAlign: 'center',
        marginBottom: 10
    },
    inputs: {
        width: '100%',
        marginBottom: 20,
        '&:underline': {
            '&:before': {
                borderBottom: '1px solid #21ce99'
            },
            '&:after': {
                borderBottom: `2px solid #21ce99`
            },
            '&:hover:not($disabled):not($focused):not($error):before': {
                borderBottom: `2px solid #f50057`
            }
        }
    },
    underline: {
        '&:before': {
            borderBottom: '1px solid #21ce99'
        },
        '&:after': {
            borderBottom: `2px solid #21ce99`
        },
        '&:hover:not($disabled):not($focused):not($error):before': {
            borderBottom: `2px solid #21ce99`
        },
        '&.MuiFormLabel-root': {
            color: '#21ce99'
        },
        '&.MuiFormLabel-root .Mui-focused': {
            color: '#21ce99'
        }
    },
    label: {
        color: '#21ce99 !important',
    },
    button: {
        width: '100%',
        padding: 10,
        backgroundColor: '#21ce99',
        color: 'white'
    },
    error: {
        color: '#f44336'
    },
    warning: {
        color: '#ff9800'
    },
    success: {
        color: '#4caf50'
    }
});

const initEmail: IEmail = {
    value: "",
    valid: false,
    notification: {
        error: false,
        success: false,
        warning: false,
        message: ""
    }
};

interface IProps extends RouteComponentProps {
    history: History<LocationState>;
    classes: any;
    dispatch: any;
};

interface IState {
    email: IEmail;
};

class PasswordRecovery extends Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state = {
            email: initEmail
        };
    };

    re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    valid = this.re.test(String(this.state.email.value).toLowerCase());

    handleChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void => {
        try {
            const { value } = event.target;
            this.setState((state) => ({
                email: {
                    ...state.email,
                    value: value
                }
            }));
        } catch (error) {
            this.props.dispatch({ type: "ERROR_NOTIFY", payload: "Something went wrong :(" });
        }
    };

    handleSubmit = async(): Promise<void> => {
        try {
            if (!this.valid) return;
            const result = await handleEmail(this.state.email);
            this.setState({ email: result });
        } catch (error) {
            this.props.dispatch({ type: "ERROR_NOTIFY", payload: "Something went wrong :(" });
        }
    };

    render(): JSX.Element {
        if (this.state.email.notification.success) {
            return (
                <Grid container className={this.props.classes.container}>
                    <Typography className={this.props.classes.typo}>
                        A recovery link has been sent to your email. Follow it's directions to finish.
                    </Typography>
    
                    <Button
                        className={this.props.classes.button}
                        onClick={() => this.props.history.push("/")}
                    >
                        Home Page
                    </Button>
                </Grid>
            );
        }
        return (
            <Grid container className={this.props.classes.container}>
                <Typography className={this.props.classes.typo}>
                    Please enter the email address associated with the lost account.
                </Typography>
    
                <TextField
                    className={this.props.classes.inputs}
                    label="Email Address"
                    value={this.state.email.value}
                    type="email"
                    onChange={this.handleChange}
                    InputLabelProps={{ classes: { focused: this.props.classes.label }}}    
                    InputProps={{
                        classes: { underline: this.props.classes.underline },
                        startAdornment: <InputAdornment position="start">
                            <Icon className={this.valid ? this.props.classes.success : this.props.classes.error}>
                                {this.valid ? "check_outline" : "error_outline"}
                            </Icon>
                        </InputAdornment>,
                    }}
                />
    
                <Button
                    className={this.props.classes.button}
                    onClick={this.handleSubmit}
                    disabled={!this.valid}
                >
                    Submit
                </Button>
    
            </Grid>
        );
    };
};

export default connect()(withStyles(styles)(withRouter(PasswordRecovery)));