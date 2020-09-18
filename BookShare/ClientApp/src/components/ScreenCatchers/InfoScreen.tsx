import React, { PureComponent } from 'react';

import { createStyles, withStyles } from '@material-ui/styles';
import { Paper, Typography, Button, Icon } from '@material-ui/core';

const styles = () => createStyles({
    paper: {
        display: 'flex',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '70%',
        padding: '10%'
    },
    message: {
        width: '100%',
        textAlign: 'center',
        marginBottom: 30
    },
    action: {
        width: '100%',
        padding: 10,
        backgroundColor: '#ca1d5d',
        color: 'white',
        transition: 'background-color 0.4s ease',
        '&:hover': {
            backgroundColor: '#de1f27',
            color: 'white'
        }
    },
    warning: {
        color: '#ff9800',
        marginBottom: 20,
        fontSize: '4rem'
    },
    default: {
        marginBottom: 20,
        fontSize: '4rem'
    }
});

interface IProps {
    active: boolean;
    message: string;
    action: {
        func: () => void;
        message: string;
    };
    icon: string;
    classes: any;
};

class InfoScreen extends PureComponent<IProps> {

    private iconSwitch() {
        switch (this.props.icon) {
            case "warning":
                return this.props.classes.warning;
            default:
                return this.props.classes.default;
        }
    };

    private renderActionButton(): JSX.Element | string {
        if (!this.props.active) return "";
        return (
            <Button
                className={this.props.classes.action}
                onClick={() => this.props.action.func()}
            >
                {this.props.action.message}
            </Button>
        );
    };

    render(): JSX.Element {
        return (
            <Paper className={this.props.classes.paper}>
                <Icon
                    className={this.iconSwitch()}
                    fontSize="large"
                >
                    {this.props.icon}
                </Icon>
    
                <Typography
                    className={this.props.classes.message}
                    variant="h5"
                >
                    {this.props.message}
                </Typography>
    
                {this.renderActionButton()}
            </Paper>
        );
    };
};

export default withStyles(styles)(InfoScreen);