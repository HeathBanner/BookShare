import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { History, LocationState } from 'history';
import { withRouter } from 'react-router-dom';

import { withStyles, createStyles } from '@material-ui/styles';
import {
    Avatar,
    Button,
    Popper,
    Fade,
    Paper,
    Typography,
    ClickAwayListener
} from '@material-ui/core';

const styles = () => createStyles({
    popper: {
        display: 'flex',
        justifyContent: 'flex-end',
        width: '100%'
    },
    button: {
        position: 'absolute',
        right: 16,
        top: '50%',
        transform: 'translate(0%, -50%)',
        padding: 12
    },
    avatar: {
        backgroundColor: 'red'
    },
    paper: {
        width: '20%',
        padding: 10
    },
    buttons: {
        width: '100%',
        padding: 10,
        whiteSpace: 'nowrap'
    }
});

const buttons = [
    {
        text: "Profile",
        url: "/profile",
        func: false
    },
    {
        text: "My Books",
        url: "/bookshelf",
        func: false
    },
    {
        text: "Signout",
        func: true
    }
];

interface IProps extends RouteComponentProps {
    user: any;
    history: History<LocationState>;
    classes: any;
    dispatch: any;
};

interface IState {
    anchorEl: any;
};

class User extends Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state = {
            anchorEl: false
        };
    };

    handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
        try {
            const selection = event.currentTarget;
            const getBoundingClientRect = () => selection.getBoundingClientRect();
    
            if (this.state.anchorEl) {
                return this.setState({ anchorEl: false });
            }
    
            this.setState({
                anchorEl: {
                    clientWidth: getBoundingClientRect().width,
                    clientHeight: getBoundingClientRect().height,
                    getBoundingClientRect
                }
            });
        } catch (error) {
            this.props.dispatch({ type: "ERROR_NOTIFY", payload: "Something went wrong :(" });
        }
    };
    closeAnchor = () => this.setState({ anchorEl: false });

    signOut = () => this.props.dispatch({ type: "SIGNOUT" });

    handleHistory = (url: string): void => {
        try {
            this.props.history.push(url);
            this.setState({ anchorEl: false });
        } catch (error) {
            this.props.dispatch({ type: "ERROR_NOTIFY", payload: "Something went wrong :(" });
        }
    };

    render(): JSX.Element {
        const open: boolean = Boolean(this.state.anchorEl);
        const id: string | undefined = open ? 'transition-popper' : undefined;
        return (
            <>
                <Button
                    className={this.props.classes.button}
                    onClick={this.handleClick}
                >
                    <Avatar className={this.props.classes.avatar}>
                        {this.props.user.username.charAt(0)}
                    </Avatar>
                </Button>
    
                <Popper
                    className={this.props.classes.popper}
                    id={id}
                    open={open}
                    anchorEl={this.state.anchorEl ? this.state.anchorEl : null}
                    transition
                >
                    {({ TransitionProps }) => (
                        <Fade {...TransitionProps} timeout={50}>
                            <ClickAwayListener onClickAway={this.closeAnchor}>
                                <Paper className={this.props.classes.paper}>
                                    {buttons.map((item : any) => {
                                        return (
                                            <Button
                                                key={item.text}
                                                className={this.props.classes.buttons}
                                                onClick={() => item.func ? this.signOut() : this.handleHistory(item.url)}
                                            >
                                                <Typography variant="body2">
                                                    {item.text}
                                                </Typography>
                                            </Button>
                                        );
                                    })}
                                </Paper>
                            </ClickAwayListener>
                        </Fade>
                    )}
                </Popper>
             </>
        );
    };
};

export default connect()(withStyles(styles)(withRouter(User)));
