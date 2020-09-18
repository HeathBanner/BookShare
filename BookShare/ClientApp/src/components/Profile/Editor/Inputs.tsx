import React, { PureComponent } from 'react';

import { IModal } from '../Services/InfoServices';
import { createStyles, withStyles } from '@material-ui/styles';
import {
    TextField,
    FormControl,
    InputLabel,
    Input,
    InputAdornment,
    Icon,
    IconButton
} from '@material-ui/core';

const styles = () => createStyles({
    inputContainers: {
        width: '100%',
        padding: '5%'
    },
    input: {
        width: '100%',
        marginBottom: 20
    },
    button: {
        width: '100%',
        padding: 10,
    },
    underline: {
        '&:before': {
            borderBottom: '1px solid #21ce99'
        },
        '&:after': {
            borderBottom: `2px solid #21ce99`
        },
        '&:hover:not($disabled):not($focused):not($error):before': {
            borderBottom: `2px solid #f50057`
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
    }
});

interface IProps {
    modalProps: IModal;
    handleChange: (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, type: string) => void;
    handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
    classes: any;
};

class Inputs extends PureComponent<IProps> {
    
    private renderStep = (): JSX.Element => {
        if (this.props.modalProps.type === "password") {
            return (
                <div className={this.props.classes.inputContainers}>
                    {["newPassword0", "newPassword1"].map((item, index) => {
                        return (
                            <FormControl style={{ width: '100%' }}>
                                <InputLabel classes={{ focused: this.props.classes.label }}>
                                    {index === 0 ? "Password" : "Re-Enter Password"}
                                </InputLabel>
                                <Input
                                    className={this.props.classes.input}
                                    classes={{ underline: this.props.classes.underline }}
                                    type={this.props.modalProps.visible ? "text" : "password"}
                                    value={index === 0 ? this.props.modalProps.newPassword0 : this.props.modalProps.newPassword1}
                                    onChange={e => this.props.handleChange(e, item)}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={(e) => this.props.handleClick(e)}
                                            >
                                                <Icon>{this.props.modalProps.visible ? "visibility" : "visibility_off"}</Icon>
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                        </FormControl>        
                        );
                    })}
                </div>
            );
        }

        return (
            <div className={this.props.classes.inputContainers}>
                <TextField
                    className={this.props.classes.input}
                    InputProps={{ classes: { underline: this.props.classes.underline }}}
                    InputLabelProps={{ classes: { focused: this.props.classes.label }}}    
                    label="Email"
                    value={this.props.modalProps.email}
                    onChange={(e) => this.props.handleChange(e, "email")}
                />
            </div>
        );
    };
    render(): JSX.Element {
        if (this.props.modalProps.activeStep === 0) {
            return (
                <div className={this.props.classes.inputContainers}>
                    <FormControl style={{ width: '100%' }}>
                        <InputLabel classes={{ focused: this.props.classes.label }}>Password</InputLabel>
                            <Input
                                className={this.props.classes.input}
                                classes={{ underline: this.props.classes.underline }}
                                placeholder="Password"
                                type={this.props.modalProps.visible ? "text" : "password"}
                                value={this.props.modalProps.password}
                                onChange={(e) => this.props.handleChange(e, 'password')}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={(e) => this.props.handleClick(e)}
                                        >
                                            <Icon style={{ color: this.props.modalProps.visible ? '#3f51b5' : 'rgba(0, 0, 0, 0.54)' }}>
                                                {this.props.modalProps.visible ? "visibility" : "visibility_off"}
                                            </Icon>
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                    </FormControl>
                </div>
            );
        }
    
        else return this.renderStep();
    };
};

export default withStyles(styles)(Inputs);