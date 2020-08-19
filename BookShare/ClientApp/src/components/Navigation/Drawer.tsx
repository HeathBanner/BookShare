import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { History, LocationState } from 'history';
import { withRouter } from 'react-router';

import Notify from '../Notifications/Notify';

import { withStyles, createStyles } from '@material-ui/styles';
import {
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Icon
} from '@material-ui/core';

const styles = () => createStyles({
    drawer: {
        backgroundImage: 'linear-gradient(#de1f27, #ca1d5d)'
    },
    listItems: {
        color: "white",
        flexWrap: 'wrap',
        width: '100%',
        display: 'block !important',
        textAlign: 'center',
        marginBottom: 10
    },
    buttons: {
        color: 'white',
        width: '100%',
        display: 'block !important',
        textAlign: 'center',
    }
});

const navList = [
    {
        text: "Home",
        icon: "home",
        link: "/"
    },
    {
        text: "Books",
        icon: "menu_book",
        link: "/books"
    },
    {
        text: "Post",
        icon: "library_add",
        link: "/post"
    }
];

interface IProps extends RouteComponentProps {
    history : History<LocationState>;
    classes : any;
    dispatch : any;
};

interface IState {
    open : boolean;
};

class NavDrawer extends Component<IProps, IState> {

    constructor(props : IProps) {
        super(props);
        this.state = {
            open: false
        };
    };

    toggleDrawer = (open : boolean) => (event : React.MouseEvent<HTMLButtonElement>) : void => {
        try {
            if (event.type === "keydown") {
                return;
            }

            this.setState({ open: open });
        } catch (error) {
            this.props.dispatch({ type: "ERROR_NOTIFY", payload: "Something went wrong :(" });
        }

    };

    handleRedirect(link : string) : void {
        try {
            this.setState({ open: false});
            this.props.history.push(link);
        } catch (error) {
            this.props.dispatch({ type: "ERROR_NOTIFY", payload: "Something went wrong :(" });
        }
    };

    render() {
        return (
            <>
                <IconButton
                    style={{ color: 'white' }}
                    onClick={this.toggleDrawer(true)}
                >
                    <Icon>menu</Icon>
                </IconButton>
                <Drawer
                    PaperProps={{ className: this.props.classes.drawer }}
                    open={this.state.open}
                    onClose={this.toggleDrawer(false)}
                >
                    <List>
                        {navList.map((item) => {
                            return (
                                <ListItem
                                    className={this.props.classes.listItems}
                                    onClick={() => this.handleRedirect(item.link)}
                                    button
                                    key={item.text}
                                >
                                    <ListItemIcon
                                        className={this.props.classes.buttons}
                                    >
                                        <Icon>{item.icon}</Icon>
                                    </ListItemIcon>
    
                                    <ListItemText style={{width: '100%', textAlign: 'center'}} primary={item.text} />
                                </ListItem>
                            );
                        })}
                    </List>
                </Drawer>
            </>
        );
    };
};

export default connect()(withStyles(styles)(withRouter(NavDrawer)));
