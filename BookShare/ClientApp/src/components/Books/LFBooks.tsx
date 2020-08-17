import React, { Component } from 'react';

import { withStyles, createStyles } from '@material-ui/styles';
import {
    Icon,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    Collapse,
    Divider
} from '@material-ui/core';

const styles = () => createStyles({
    listHeader: {
        width: '100%',
        marginTop: 10
    },
    listDivider: {
        marginBlockStart: '0.5em',
        width: '100%',
        backgroundColor: 'rgb(0, 0, 0, 0.2)'
    },
    list: {
        width: '100%',
    }
});

interface IProps {
    lfBooks : string[];
    classes : any;
};

interface IState {
    open : boolean;
};

class LFBooks extends Component<IProps, IState> {

    constructor(props : IProps) {
        super(props);
        this.state = {
            open: true
        };
    };

    handleOpen = () => this.setState((state) => ({ open: !state.open }));

    render() {
        return (
            <List className={this.props.classes.list}>
                <ListItem button onClick={this.handleOpen}>
                    <ListItemIcon>
                        <Icon>{this.state.open ? "remove" : "add"}</Icon>
                    </ListItemIcon>
                    <ListItemText primary="Tradeable Books" />
                </ListItem>
    
                <Divider className={this.props.classes.listDivider} />
    
                <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                    {this.props.lfBooks.map((item) => {
                        return (
                            <ListItem style={{ padding: '4px 16px' }}>
                                <ListItemText primary={item} />
                            </ListItem>
                        );
                    })}
                </Collapse>
            </List>
        );
    };
};

export default withStyles(styles)(LFBooks);