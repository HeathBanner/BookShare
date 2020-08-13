import React, { Component } from 'react';
import { connect } from 'react-redux';

import Login from '../../components/Auth/Login';
import Register from '../../components/Auth/Register';
import { initInfo } from '../../components/Auth/Services/AuthServices';
import * as interfaces from './interfaces';

import { withStyles, createStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import {
    Grid,
    Paper,
    Tabs,
    Tab,
    Modal,
    Button
} from '@material-ui/core';

const styles = ({ breakpoints } : Theme) => createStyles({
    paper: {
        position: 'fixed',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        display: 'flex',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
        padding: '0% 5% 2% 5%',
        [breakpoints.up('lg')]: {
            width: '25%',
        },
        [breakpoints.down('md')]: {
        },
        [breakpoints.down('xs')]: {
            padding: '0% 10% 5% 10%',
            width: '70%'
        }
    },
    forgotPassword: {
        marginTop: 10,
        padding: 10
    }
});

class Index extends Component<interfaces.IProps, interfaces.IState> {

    constructor(props : interfaces.IProps) {
        super(props);
        this.state = {
            mode: 0,
            info: initInfo
        };
    };

    handleChange = (event : any, value : any) => {
        try {
            this.setState((state) => ({ ...state, mode: value }));
        } catch (error) {
            this.props.dispatch({ type: "ERROR_NOTIFY", payload: "Something went wrong :(" });
        }
    };

    handleInput = (mode : string, type : string) => (event : React.ChangeEvent<HTMLInputElement>) => {
        try {
            const { value } = event.target;
            if (mode === "Visible") {
                return this.setState((state) => ({
                    ...state,
                    info: {
                        ...state.info,
                        Visible: !state.info.Visible
                    }
                }));
            }
            this.setState((state) => ({
                ...state,
                info: {
                    ...state.info,
                    [type]: value
                }
            }));
        } catch (error) {
            this.props.dispatch({ type: "ERROR_NOTIFY", payload: "Something went wrong :(" });
        }
    };

    toggleVisibility = () => {
        try {
            this.setState((state) => ({
                ...state,
                info: {
                    ...state.info,
                    Visible: !state.info.Visible
                }
            }));
        } catch (error) {
            this.props.dispatch({ type: "ERROR_NOTIFY", payload: "Something went wrong :(" });
        }
    }

    handleSubmit = async (mode : String) => {
        try {
            let result : interfaces.INotify;
    
            if (mode === "login") {
                const { fetchLogin } = await import('../../components/Auth/Services/AuthServices');
                result = await fetchLogin(this.state.info);
            } else {
                const { fetchRegister } = await import('../../components/Auth/Services/AuthServices');
                result = await fetchRegister(this.state.info);
            }

            if (result.error) {
                return this.props.dispatch({ type: "ERROR_NOTIFY", payload: result.message });
            }
            if (result.success && mode === "register") {
                return this.props.dispatch({ type: "SUCCESS_NOTIFY", payload: result.message });
            }
            if (result.success) {
                this.props.dispatch({
                    type: "LOGIN",
                    payload: result.payload
                });
                this.props.handleClose();
            }
        } catch (error) {
            this.props.dispatch({ type: "ERROR_NOTIFY", payload: "Something went wrong :(" });
        }
    };

    handlePush = () => {
        try {
            this.props.history.push("/passwordRecovery");
            this.props.handleClose();
        } catch (error) {
            this.props.dispatch({ type: "ERROR_NOTIFY", payload: "Something went wrong :(" });
        }
    };

    renderAuth = () => {
        try {
            if (this.state.mode === 0) {
                return <Login
                        login={this.state.info}
                        handleInput={this.handleInput}
                        toggleVisibility={this.toggleVisibility}
                        handleSubmit={this.handleSubmit}
                    />;
            }
            return <Register
                register={this.state.info}
                handleInput={this.handleInput}
                toggleVisibility={this.toggleVisibility}
                handleSubmit={this.handleSubmit}
            />;
        } catch (error) {
            this.props.dispatch({ type: "ERROR_NOTIFY", payload: "Something went wrong :(" });
        }
    };

    render() {
        return (
            <Grid container>
                <Grid item xs={12}>
                    <Modal
                        aria-labelledby="Authentication Menu"
                        aria-describedby="Menu for Login and Register"
                        open={this.props.auth}
                        onClose={this.props.handleClose}
                    >
                        <Paper className={this.props.classes.paper}>
                            <Tabs
                                value={this.state.mode}
                                onChange={this.handleChange}
                            >
                                <Tab label="Login" />
                                <Tab label="Register" />
                            </Tabs>
    
                            <Button
                                className={this.props.classes.forgotPassword}
                                onClick={() => this.handlePush()}
                            >
                                Forgot password?
                            </Button>
    
                            {this.renderAuth()}
    
                        </Paper>
    
                    </Modal>
                </Grid>
            </Grid>
        );
    }
};

export default connect()(withStyles(styles, { withTheme: true })(Index));