import React , { Component } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { History, LocationState } from 'history';
import { withRouter } from 'react-router-dom';

import * as services from './services';
import { withStyles, createStyles } from '@material-ui/core/styles';
import {
    Grid,
    CircularProgress,
    Paper,
    TextField,
    Button,
    Typography,
    InputAdornment,
    Icon,
    IconButton
} from '@material-ui/core';

const styles = () => createStyles({
    container: {
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap'
    },
    paper: {
        display: 'flex',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
        width: '80%',
        borderRadius: 10,
        padding: 20
    },
    typo: {
        marginBottom: 20,
        width: '100%',
        textAlign: 'center'
    },
    helperText: {
        margin: '10px 0px',
        width: '100%',
        textAlign: 'center'
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
        padding: 10,
        borderRadius: 20,
        width: '100%',
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

const passInit: services.IPass = {
    checked: false,
    pass: false,
    password1: {
        value: "",
        visible: false
    },
    password2: {
        value: "",
        visible: false
    },
    email: "",
    notification: {
        error: false,
        success: false,
        warning: false,
        message: ""
    }
};

interface IProps extends RouteComponentProps {
    match: any;
    history: History<LocationState>;
    classes: any;
    dispatch: any;
};

interface IState {
    pass: services.IPass;
};  

class Index extends Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state = {
            pass: passInit
        };
    };

    password1 = services.passwordTest(this.state.pass.password1.value);
    password2 = services.passwordTest(this.state.pass.password2.value);

    componentDidMount = () => {
        this.passwordRequest();
    };

    passwordRequest = async(): Promise<void> => {
        try {
            const result = await fetch(`api/token/validatePasswordToken/token=${this.props.match.params.token}`);
            const json = await result.json();
            if (!json.statusCode || json.statusCode !== 200) {
                return this.setState((state) => ({
                    pass: {
                        ...state.pass,
                        checked: true,
                        pass: false
                    }
                }));
            }

            this.setState((state) => ({
                pass: {
                    ...state.pass,
                    checked: true,
                    email: json.user.email
                }
            }))
        } catch (error) {
            this.props.dispatch({ type: "ERROR_NOTIFY", payload: "Something went wrong :(" });
        }
    };

    handleInput = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, key: string): void => {
        try {
            let newValue: services.IPassword;
            if (key === "password1") newValue = this.state.pass.password1;
            else newValue = this.state.pass.password2;
            newValue.value = event.target.value;

            this.setState((state) => ({
                pass: {
                    ...state.pass,
                    [key]: newValue
                }
            }));
        } catch (error) {
            this.props.dispatch({ type: "ERROR_NOTIFY", payload: "Something went wrong :(" });
        }
    };

    toggleVisibility = (event: React.MouseEvent<HTMLButtonElement>, type: string): void => {
        try {
            if (type === "password1") {
                this.setState((state) => ({
                    pass: {
                        ...state.pass,
                        password1: {
                            ...state.pass.password1,
                            visible: !state.pass.password1.visible
                        }
                    }
                }));
            } else {
                this.setState((state) => ({
                    pass: {
                        ...state.pass,
                        password2: {
                            ...state.pass.password2,
                            visible: !state.pass.password2.visible
                        }
                    }
                }));
            }
        } catch (error) {
            this.props.dispatch({ type: "ERROR_NOTIFY", payload: "Something went wrong :(" });   
        }
    };

    handleSave = async(): Promise<void> => {
        try {
            const { password1, password2 } = this.state.pass;
            if (!password1.value || !password2.value || password1.value !== password2.value) {
                return;
            }
            const result: services.IPass = await services.handleSave(this.state.pass);
            this.setState((state) => ({
                pass: result
            }));
        } catch (error) {
            this.props.dispatch({ type: "ERROR_NOTIFY", payload: "Something went wrong :(" });
        }
    };
    
    render(): JSX.Element {
        const { pass } = this.state;
        if (!pass.pass && !pass.checked) {
            return (
                <Grid container>
                    <CircularProgress />
                </Grid>
            );
        }
        if (pass.checked && !pass.pass) {
            return (
                <Grid container>
                    <Typography>
                        Forbidden
                    </Typography>
                </Grid>
            );
        }
        return (
            <Grid container className={this.props.classes.container}>
                <Paper className={this.props.classes.paper}>
                    <Typography variant="h5" className={this.props.classes.typo}>
                        Choose your new password
                    </Typography>
    
                    <Typography
                        className={this.props.classes.helperText}
                        variant="subtitle2"
                    >
                        {services.renderHelp({
                            color: this.password1.color,
                            value: pass.password1.value
                        }, {
                            color: this.password2.color,
                            value: pass.password2.value
                        })}
                    </Typography>
    
                    <TextField
                        className={this.props.classes.inputs}
                        label="New Password"
                        value={pass.password1.value}
                        type={pass.password1.visible ? "text" : "password"}
                        onChange={(e) => this.handleInput(e, "password1")}
                        InputLabelProps={{ classes: { focused: this.props.classes.label }}}    
                        InputProps={{
                            classes: { underline: this.props.classes.underline },
                            startAdornment: <InputAdornment position="start">
                                <Icon className={this.props.classes[this.password1.color]}>
                                    {this.password1.icon}
                                </Icon>
                            </InputAdornment>,
                            endAdornment: <InputAdornment position="end">
                                <IconButton onClick={(e) => this.toggleVisibility(e, "password1")}>
                                    <Icon>{pass.password1.visible ? "visibility" : "visibility_off"}</Icon>
                                </IconButton>
                            </InputAdornment>
                        }}
                    />
                    <TextField
                        className={this.props.classes.inputs}
                        label="Confirm Password"
                        value={pass.password2.value}
                        onChange={(e) => this.handleInput(e, "password2")}
                        type={pass.password2.visible ? "text" : "password"}
                        InputLabelProps={{ classes: { focused: this.props.classes.label }}}    
                        InputProps={{
                            classes: { underline: this.props.classes.underline },
                            startAdornment: <InputAdornment position="start">
                                <Icon className={this.props.classes[this.password2.color]}>
                                    {this.password2.icon}
                                </Icon>
                            </InputAdornment>,
                            endAdornment: <InputAdornment position="end">
                                <IconButton onClick={(e) => this.toggleVisibility(e, "password2")}>
                                    <Icon>{pass.password2.visible ? "visibility" : "visibility_off"}</Icon>
                                </IconButton>
                            </InputAdornment>
                        }}
                    />
    
                    <Button
                        onClick={this.handleSave}
                        className={this.props.classes.button}
                        disabled={!pass.password1.value || !pass.password2.value || pass.password1.value !== pass.password2.value}
                    >
                        Submit
                    </Button>
                </Paper>
    
            </Grid>
        );
    };
};

export default connect()(withStyles(styles)(withRouter(Index)));