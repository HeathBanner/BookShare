import React, { PureComponent } from 'react';

import { IInfo } from '../../pages/Auth/interfaces';

import { withStyles, createStyles } from '@material-ui/styles';
import {
    TextField,
    Button,
    FormControl,
    InputLabel,
    Input,
    InputAdornment,
    Icon,
    IconButton
} from '@material-ui/core';

const styles = () => createStyles({
    inputs: {
        width: '100%',
        marginBottom: 20
    },
    button: {
        width: '100%',
        padding: 10,
        backgroundColor: '#ca1d5d',
        color: 'white',
        transition: 'background-color 0.4s ease',
        '&:hover': {
            backgroundColor: '#de1f27',
            color: 'white'
        }
    }
});

interface IProps {
    register : IInfo;
    handleInput : (mode : string, type : string) => (event : React.ChangeEvent<HTMLInputElement>) => void;
    toggleVisibility : () => void;
    handleSubmit : (mode : string) => void;
    classes : any;
};

class Register extends PureComponent<IProps> {
    render() {
        return (
            <>
                <TextField
                    className={this.props.classes.inputs}
                    value={this.props.register.Username}
                    onChange={this.props.handleInput("register", "Username")}
                    label="Username"
                />
    
                <TextField
                    className={this.props.classes.inputs}
                    value={this.props.register.Email}
                    onChange={this.props.handleInput("register", "Email")}
                    label="Email"
                />
    
                <FormControl style={{ width: '100%' }}>
                    <InputLabel>Password</InputLabel>
                        <Input
                            className={this.props.classes.inputs}
                            type={this.props.register.Visible ? "text" : "password"}
                            value={this.props.register.Password}
                            onChange={this.props.handleInput("login", "Password")}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={this.props.toggleVisibility}
                                    >
                                        <Icon>{this.props.register.Visible ? "visibility" : "visibility_off"}</Icon>
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                </FormControl>        
    
                <Button
                    className={this.props.classes.button}
                    onClick={() => this.props.handleSubmit("register")}
                >
                    Submit
                </Button>
            </>
        );
    };
};

export default withStyles(styles)(Register);