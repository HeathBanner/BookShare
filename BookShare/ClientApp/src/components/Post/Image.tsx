import React, { PureComponent, ChangeEvent } from 'react';

import { createStyles, withStyles } from '@material-ui/styles';
import {
    Modal,
    Paper,
    TextField,
    Button
} from '@material-ui/core';

const styles = () => createStyles({
    paper: {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        padding: '5%',
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
        width: '90%'
    },
    input: {
        width: '100%',
        marginBottom: 20
    },
    button: {
        width: '100%',
        padding: 10,
        color: 'white',
        backgroundColor: '#E85A4F',
        '&:hover': {
            backgroundColor: '#E98074',
        }
    }
});

interface IProps {
    open: boolean;
    handleInput: (type: string, e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
    handleClose: () => void;
    classes: any;
};

class Image extends PureComponent<IProps> {
    render(): JSX.Element {
        return (
            <Modal
                open={this.props.open}
                onClose={this.props.handleClose}
            >
                <Paper className={this.props.classes.paper}>
                    <TextField
                        onChange={(e) => this.props.handleInput("image", e)}
                        label="Image URL"
                        className={this.props.classes.input}
                    />
    
                    <Button
                        className={this.props.classes.button}
                        onClick={this.props.handleClose}
                    >
                        Done
                    </Button>
                </Paper>
            </Modal>
        );
    };
};

export default withStyles(styles)(Image);