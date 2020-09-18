import React, { Component } from 'react';
import { connect } from 'react-redux';

import { createStyles, withStyles } from '@material-ui/core/styles';
import { Modal, IconButton, Icon } from '@material-ui/core';

const styles = () => createStyles({
    modal: {
        width: '100%',
        display: 'flex',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    container: {
        display: 'flex',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
        width: '100%'
    },
    image: {
        width: '60%',
        height: 'auto'
    },
    icons: {
        color: '#21ce99'
    }
});

interface IImage {
    url: string;
};

interface IProps {
    images: IImage[];
    open: boolean;
    handleClose: () => void;
    classes: any;
    dispatch: any;
};

interface IState {
    index: number;
};

class ImageViewer extends Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state = {
            index: 0
        };
    };

    private beginClose = (): void => {
        try {
            this.setState({ index: 0 });
            this.props.handleClose();
        } catch (error) {
            this.props.dispatch({ type: "ERROR_NOTIFY", message: "Image Viewer had an oopsie" });
        }
    };

    private handleClick = (type: "NEXT" | "BACK"): void => {
        try {
            if (type === "NEXT") {
                this.setState((state) => ({
                    index: state.index + 1
                }));
            }
            else {
                this.setState((state) => ({
                    index: state.index - 1
                }));
            }
        } catch (error) {
            this.props.dispatch({ type: "ERROR_NOTIFY", message: "Image Viewer had an oopsie" });
        }
    };
    
    render(): JSX.Element | string {
        if (!this.props.images) return "";
        const image = "data:image/jpeg;base64," + this.props.images[this.state.index].url;
        return (
            <Modal className={this.props.classes.modal} open={this.props.open} onClose={this.beginClose}>
                <div className={this.props.classes.container}>
    
                    <IconButton
                        onClick={() => this.handleClick("BACK")}
                        disabled={this.state.index <= 0}
                    >
                        <Icon
                            fontSize={"large"}
                            className={this.props.classes.icons}
                        >
                            navigate_before
                        </Icon>
                    </IconButton>
                    <img className={this.props.classes.image} src={image}/>
                    <IconButton
                        style={{ zIndex: 550 }}
                        onClick={() => this.handleClick("NEXT")}
                        disabled={this.state.index >= this.props.images.length - 1}
                    >
                        <Icon
                            fontSize={"large"}
                            className={this.props.classes.icons}
                        >
                            navigate_next
                        </Icon>
                    </IconButton>
                </div>
            </Modal>
        );
    };
};

export default connect()(withStyles(styles)(ImageViewer));