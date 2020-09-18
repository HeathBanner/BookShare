import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import { createStyles, withStyles } from '@material-ui/styles';
import { amber, green } from '@material-ui/core/colors';
import {
    IconButton,
    Icon,
    Snackbar,
    SnackbarContent,
} from '@material-ui/core';

const styles = () => createStyles({
    success: {
        backgroundColor: green[600]
    },
    error: {
        backgroundColor: "#eb4034"
    },
    warning: {
        backgroundColor: amber[700]
    },
    message: {
        display: 'flex',
        alignItems: 'center'
    },
});

interface IProps {
    classes: any;
    store: any;
    dispatch: any;
};

class Notify extends PureComponent<IProps> {

    handleClose = (): void => this.props.dispatch({ type: "RESET_NOTIFY" });

    isOpen = (): boolean => {
        const { error, success, warning } = this.props.store.notification;
        return error || success || warning;
    };

    cardColor = () => {
        const { error, success } = this.props.store.notification;
        switch (true) {
            case error:
                return this.props.classes.error;
            case success:
                return this.props.classes.success;
            default:
                return this.props.classes.warning;
        }
    };

    render(): JSX.Element {
        return (
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                open={this.isOpen()}
                autoHideDuration={6000}
                onClose={this.handleClose}
            >
                <SnackbarContent
                    className={this.cardColor()}
                    message={
                        <span className={this.props.classes.message}>
                            <Icon>check_circle</Icon>
                            {this.props.store.notification.message}
                        </span>
                    }
                    action={
                        <IconButton
                            key="close"
                            color="inherit"
                            onClick={this.handleClose}
                        >
                            <Icon>close</Icon>
                        </IconButton>
                    }
                />
            </Snackbar>
        );
    };
};

const mapStateToProps = (state: any) => ({ store: state });

export default connect(mapStateToProps)(withStyles(styles)(Notify));