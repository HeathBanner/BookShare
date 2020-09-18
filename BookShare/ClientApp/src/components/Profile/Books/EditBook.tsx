import React, { PureComponent } from 'react';

import { IModal } from '../Services/BookServices';
import { createStyles, withStyles } from '@material-ui/styles';
import {
    Button,
    Modal,
    Paper,
    Divider
} from '@material-ui/core';

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
        padding: '5%',
        width: '80%'
    },
    buttons: {
        width: '100%',
        padding: 10,
        color: 'white',
        borderRadius: 20,
        backgroundColor: '#21ce99',
        transition: 'background-color 0.4s ease',
        '&:hover': {
            backgroundColor: '#1cebad',
            color: 'white'
        }
    },
    divider: {
        width: '60%',
        marginTop: 20,
        marginBottom: 20,
        backgroundColor: 'rgb(0, 0, 0, 0.2)'
    }
});

interface IProps {
    modal: IModal;
    handleClose: () => void;
    handleService: (type: string, id: string) => void;
    classes: any; 
};

class EditBook extends PureComponent<IProps> {
    render(): JSX.Element {
        return (
            <Modal
                open={this.props.modal.open}
                onClose={this.props.handleClose}
            >
                <Paper className={this.props.classes.paper}>
                    <Button
                        className={this.props.classes.buttons}
                        onClick={() => this.props.handleService("edit", this.props.modal.id)}
                    >
                        Edit
                    </Button>
    
                    <Divider className={this.props.classes.divider} />
    
                    <Button
                        className={this.props.classes.buttons}
                        onClick={() => this.props.handleService("delete", this.props.modal.id)}
                    >
                        Delete
                    </Button>
                </Paper>
            </Modal>
        );
    };
};

export default withStyles(styles)(EditBook);