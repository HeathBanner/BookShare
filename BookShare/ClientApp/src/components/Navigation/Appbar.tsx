import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { History, LocationState } from 'history';
import { withRouter } from 'react-router-dom';

import Drawer from './Drawer';
import Container from '../../pages/Auth/index';
import User from './User';

import { withStyles, createStyles } from '@material-ui/styles';
import {
    AppBar,
    Toolbar,
    useScrollTrigger,
    Slide,
    Typography,
    Button,
    CircularProgress
} from '@material-ui/core';

const styles = () => createStyles({
    toolbar: {
        backgroundColor: '#21ce99'
    },
    navHeader: {
        color: 'white',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
    },
    button: {
        position: 'absolute',
        right: 16,
        top: '50%',
        transform: 'translate(0%, -50%)',
        padding: 12,
        color: 'white'
    },
    progress: {
        position: 'absolute',
        right: 16,
        padding: 12
    }
});

interface IProps extends RouteComponentProps {
    history: History<LocationState>;
    classes: any;
    store: any;
};

interface IState {
    auth: boolean;
    customScrollyBoi: boolean;
};

interface IElevationScroll {
    handleTrigger: (type: "OPEN" | "CLOSE") => void;
};

function ElevationScroll(props: IElevationScroll) {
    const trigger = useScrollTrigger();

    console.log("HOOK: " + trigger);
    if (trigger) {
        props.handleTrigger("OPEN");
    } else {
        props.handleTrigger("CLOSE");
    }

    return <></>;
};

class Appbar extends Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state = {
            auth: false,
            customScrollyBoi: false
        };
    };

    private handleOpen = (): void => this.setState({ auth: true });
    private handleClose = (): void => this.setState({ auth: false });

    private handleTrigger = (type: "OPEN" | "CLOSE") => {        
        if (this.state === undefined) return;
        if (type === "OPEN" && this.state.customScrollyBoi === false) {
            this.setState((state) => ({
                ...state,
                customScrollyBoi: true
            }));
        }
        else if (type === "CLOSE" && this.state.customScrollyBoi === true) {
            this.setState((state) => ({
                ...state,
                customScrollyBoi: false
            }));
        }
    };

    private handleHistory = () => this.props.history.push('/passwordRecovery');

    private renderAuth = (): JSX.Element => {
        if (this.props.store.loggedIn) {
            return <User user={this.props.store.user} />;
        }
        else if (this.props.store.checking) {
            return <CircularProgress className={this.props.classes.progress} color="secondary" />;
        }
        else return (
            <Button
                className={this.props.classes.button}
                onClick={this.handleOpen}
            >
                Login
            </Button>
        );
    };

    render(): JSX.Element {
        return (
            <>
                <div className={this.props.classes.placeHolder}></div>
                <ElevationScroll handleTrigger={this.handleTrigger} />
                <Slide appear={false} direction="down" in={!this.state.customScrollyBoi}>
                    <AppBar>
                        <Toolbar className={this.props.classes.toolbar}>
                            <Drawer />
    
                            <Typography
                                className={this.props.classes.navHeader}
                                variant="h5"
                            >
                                Sothis
                            </Typography>
    
                            {this.renderAuth()}
                        </Toolbar>

                        <Container
                            auth={this.state.auth}
                            handleClose={this.handleClose}
                            handleHistory={this.handleHistory}
                        />
                    </AppBar>
                </Slide>
            </>
        );
    };
};

const mapStateToProps = (state: any) => ({ store: state });

export default connect(mapStateToProps)(withStyles(styles)(withRouter(Appbar)));