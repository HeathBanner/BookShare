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
    window : any;
    history : History<LocationState>;
    classes : any;
    store : any;
};

interface IState {
    auth : boolean;
};

const trigger = useScrollTrigger();

class Appbar extends Component<IProps, IState> {

    constructor(props : IProps) {
        super(props);
        this.state = {
            auth: false
        };
    };


    handleOpen = () => this.setState({ auth: true });
    handleClose = () => this.setState({ auth: false });

    renderAuth() {
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

    render() {
        return (
            <>
                <div className={this.props.classes.placeHolder}></div>
                <Slide appear={false} direction="down" in={!trigger}>
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
                            history={history}
                        />
                    </AppBar>
                </Slide>
            </>
        );
    };
};

const mapStateToProps = (state : any) => ({ store: state });

export default connect()(withStyles(styles)(withRouter(NavBar)));