import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { RouteComponentProps } from 'react-router-dom';
import { History, LocationState } from 'history';

import InfoEditor from '../../components/Profile/Editor/InfoEditor';
import LFBooksEditor from '../../components/Post/LFBook';
import LocationEditor from '../../components/Profile/Location/LocationEditor';
import InfoScreen from '../../components/ScreenCatchers/InfoScreen';
import * as services from '../../components/Profile/Services/InfoServices';
import { INotify, IUser } from '../../store/interfaces';

import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { createStyles, withStyles } from '@material-ui/core';
import {
    Grid,
    Paper,
    Typography,
    Divider,
    Button,
    Icon,
    Modal
} from '@material-ui/core';

const styles = (theme: Theme) => createStyles({
    container: {
        display: 'flex',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '5%',
    },
    paper: {
        display: 'flex',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
        width: '40%',
        padding: '5%',
        marginTop: 60,
        background: 'rgb(255, 255, 255, 0.3)',
        [theme.breakpoints.down('xs')]: {
            width: '90%',
            padding: '10%'
        }
    },
    infoContainer: {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
        marginBottom: 20,
        width: '100%'
    },
    username: {
        width: '100%',
        textAlign: 'center'
    },
    dividers: {
        marginBottom: 20,
        marginBlockStart: '0.5em',
        width: '60%',
        backgroundColor: 'rgb(0, 0, 0, 0.3)'
    },
    infoTitle: {
        textAlign: 'center',
        width: '100%',
        color: '#21ce99',
        padding: 10,
        borderRadius: 20
    },
    info: {
        width: '100%',
        textAlign: 'center',
        color: '#8E8D8A'
    },
    secure: {
        width: '100%',
        background: 'black',
        color: 'black',
        display: 'inline',

    },
    buttons: {
        position: 'absolute',
        top: 0,
        left: 0,
    }
});

interface IProps extends RouteComponentProps {
    history: History<LocationState>;
    classes: any;
    store: any;
    dispatch: any;
};

class Profile extends Component<IProps, services.IState> {

    constructor(props: IProps) {
        super(props);
        this.state = {
            modalProps: services.initModalProps,
            lfBooks: services.initLFBooks,
            location: services.initLocation,
            notify: services.initNotify
        };
    };

    componentDidUpdate() {
        try {
            console.log(this.state.lfBooks);
            if (!this.props.store.user || this.state.lfBooks.loaded) return;

            const list = this.props.store.user.lfBooks;
            this.setState((state) => ({
                ...state,
                lfBooks: {
                    ...state.lfBooks,
                    list: list,
                    loaded: true
                }
            }));
        } catch (error) {
            this.props.dispatch({ type: "ERROR_NOTIFY", payload: "Something went wrong :(" });
        }
    };

    private closeLocation = (): void => {
        this.setState((state) => ({
            ...state,
            location: {
                ...state.location,
                open: false
            }
        }));
    };
    private closeLFBooks = (): void => {
        this.setState((state) => ({
            ...state,
            lfBooks: {
                ...state.lfBooks,
                open: false
            }
        }));
    };
    private handleList = (): void => {
        this.setState((state) => ({
            ...state,
            lfBooks: {
                ...state.lfBooks,
                openList: !state.lfBooks.openList
            }
        }));
    };

    protected handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
        this.setState((state) => ({
            ...state,
            modalProps: {
                ...state.modalProps,
                visible: !state.modalProps.visible
            }
        }));
    };

    protected handleInput = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, type: string, key: string): void => {
        try {
            const newValue = event.target.value;
            switch (type) {
                case "lfBooks":
                    this.setState((state) => ({
                        ...state,
                        lfBooks: {
                            ...state.lfBooks,
                            value: newValue
                        }
                    }));
                    break;
                case "location":
                    this.setState((state) => ({
                        ...state,
                        location: {
                            ...state.location,
                            [key]: newValue
                        }
                    }));
                    break;
                default:
                    break;
            }
        } catch (error) {
            this.props.dispatch({ type: "ERROR_NOTIFY", payload: "Something went wrong :(" });
        }
    };

    protected handleAutocomplete = (value: string, key: string): void => {
        try {
            this.setState((state) => ({
                ...state,
                location: {
                    ...state.location,
                    [key]: value
                }
            }));
        } catch (error) {
            this.props.dispatch({ type: "ERROR_NOTIFY", payload: "Something went wrong :(" });
        }
    };

    protected lfBooksInput = (event: React.ChangeEvent<HTMLInputElement>): void => {
        try {
            const { value } = event.target;
            this.setState((state) => ({
                ...state,
                lfBooks: {
                    ...state.lfBooks,
                    value: value
                }
            }));
        } catch (error) {
            this.props.dispatch({ type: "ERROR_NOTIFY", payload: "Something went wrong :(" });
        }
    };

    protected handleBooks = (type : string, param? : string, index? : number, list? : string[]) => {
        try {
            let lfBooks = [...this.state.lfBooks.list];
            if (type === "REMOVE" && typeof index === 'number') {
                lfBooks.splice(index, 1);
                this.setState((state) => ({
                    ...state,
                    lfBooks: {
                        ...state.lfBooks,
                        list: lfBooks
                    }
                }));
            }
            else if (typeof param === 'string') {
                lfBooks.push(param);
                this.setState((state) => ({
                    ...state,
                    lfBooks: {
                        ...state.lfBooks,
                        list: lfBooks,
                        value: ""
                    }
                }));
            }
        } catch (error) {
            this.props.dispatch({ type: "ERROR_NOTIFY", payload: "Something went wrong :(" });
        }
    };

    protected handleType = (type: string): void => {
        try {
            switch (type) {
                case "email":
                case "password":
                    this.setState((state) => ({
                        ...state,
                        modalProps: {
                            ...state.modalProps,
                            open: true,
                            type: type
                        }
                    }));
                    break;
                case "posted":
                    this.props.history.push("/bookshelf");
                    break;
                case "lfBooks":
                    this.setState((state) => ({
                        ...state,
                        lfBooks: {
                            ...state.lfBooks,
                            open: true
                        }
                    }));
                    break;
                case "location":
                    this.setState((state) => ({
                        ...state,
                        location: {
                            ...state.location,
                            open: true
                        }
                    }));
                    break;
                default:
                    break;
            }
        } catch (error) {
            this.props.dispatch({ type: "ERROR_NOTIFY", payload: "Something went wrong :(" });
        }
    };

    protected handleSave = async(type: string): Promise<void> => {
        try {
            switch (type) {
                case "lfBooks":
                    this.handleUpdateLF();
                    break;
                case "location":
                    this.handleUpdateLocation();
                    break;
                default:
                    break;
            }
        } catch (error) {
            this.props.dispatch({ type: "ERROR_NOTIFY", payload: "Something went wrong :(" });
        }
    };

    protected handleUpdateLF = async(): Promise<void> => {
        try {
            const { list } = this.state.lfBooks;
            const { username } = this.props.store.user;
            const { fetchUpdateLF } = await import('../../components/Profile/Services/InfoServices');
            const result: services.IUserReturn = await fetchUpdateLF(list, username);
            if (result.notify.warning) {
                this.props.dispatch({ type: "WARNING_NOTIFY", payload: result.notify.message });
            }
            if (result.notify.error) {
                this.props.dispatch({ type: "ERROR_NOTIFY", payload: result.notify.message });
            }
    
            this.setState((state) => ({
                ...state,
                lfBooks: services.initLFBooks
            }));
            this.props.dispatch({ type: "UPDATE", payload: result.user });
        } catch (error) {
            this.props.dispatch({ type: "ERROR_NOTIFY", payload: "Something went wrong :(" });
        }
    };

    protected handleUpdateLocation = async(): Promise<void> => {
        try {
            const { username } = this.props.store.user;
            const { fetchUpdateLocation } = await import('../../components/Profile/Services/InfoServices');
            const result: services.IUserReturn = await fetchUpdateLocation(this.state.location, username);
            console.log(result);
            if (result.notify.warning || result.notify.error) {
                return this.props.dispatch({ type: "CUSTOM_NOTIFY", payload: result.notify });
            }
    
            this.setState((state) => ({
                ...state,
                location: services.initLocation
            }));
            this.props.dispatch({ type: "UPDATE", payload: result.user });
        } catch (error) {
            this.props.dispatch({ type: "ERROR_NOTIFY", payload: "Something went wrong :(" });
        }
    };

    protected closeMainNotify = (): void => {
        try {
            if (this.state.location.open) {
                this.setState((state) => ({
                    ...state,
                    location: services.initLocation
                }))
            }
            else {
                this.setState((state) => ({
                    ...state,
                    lfBooks: services.initLFBooks
                }));
            }
            this.props.dispatch({ type: "RESET_NOTIFY" });
        } catch (error) {
            this.props.dispatch({ type: "ERROR_NOTIFY", payload: "Something went wrong :(" });
        }
    };

    protected closeModal = (): void => {
        this.setState((state) => ({
            ...state,
            modalProps: services.initModalProps
        }));
    };
    protected closeModalNotify = (): void => {
        try {
            if (this.state.modalProps.activeStep === 0 || this.state.modalProps.notify.warning) {
                return this.setState((state) => ({
                    ...state,
                    modalProps: {
                        ...state.modalProps,
                        ...services.initNotify
                    }
                }));
            }
    
            this.setState((state) => ({
                ...state,
                modalProps: services.initModalProps
            }));
            this.props.dispatch({ type: "RELOG" });
        } catch (error) {
            this.props.dispatch({ type: "ERROR_NOTIFY", payload: "Something went wrong :(" });
        }
    };

    protected handleNext = async(): Promise<void> => {
        try {
            let status: services.IModal;
            const { username } = this.props.store.user;
            const { activeStep, type } = this.state.modalProps;
    
            if (activeStep === 0) {
                const { fetchValidatePassword } = await import('../../components/Profile/Services/InfoServices');
                status = await fetchValidatePassword(this.state.modalProps, username);
            }
            if (type === "email" && activeStep === 1) {
                const { fetchUpdateEmail } = await import('../../components/Profile/Services/InfoServices');
                status = await fetchUpdateEmail(this.state.modalProps, username);
            }
            if (type === "password" && activeStep === 1) {
                const { fetchUpdatePassword } = await import('../../components/Profile/Services/InfoServices');
                status = await fetchUpdatePassword(this.state.modalProps, username);
            }
    
            return this.setState((state) => ({
                ...state,
                modalProps: { ...status }
            }));
        } catch (error) {
            this.props.dispatch({ type: "ERROR_NOTIFY", payload: "Something went wrong :(" });
        }
    };

    protected handleBack = (): void => {
        this.setState((state) => ({
            ...state,
            modalProps: {
                ...state.modalProps,
                activeStep: state.modalProps.activeStep - 1
            }
        }));
    };

    protected inputModal = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, type: string): void => {
        try {
            const { value } = event.target;
            this.setState((state) => ({
                ...state,
                modalProps: {
                    ...state.modalProps,
                    [type]: value
                }
            }));
        } catch (error) {
            this.props.dispatch({ type: "ERROR_NOTIFY", payload: "Something went wrong :(" });
        }
    };

    render(): JSX.Element {
        if (!this.props.store.user) return (
            <InfoScreen
                active={false}
                message="You must be logged in to use this"
                action={{
                    func: () => "",
                    message: ""
                }}
                icon="warning"
            />
        );
        return (
            <Grid container>
                <Grid className={this.props.classes.container} item xs={12}>
                    <Paper className={this.props.classes.paper}>
                        <InfoEditor
                            modalProps={this.state.modalProps}
                            handleClose={this.closeModal}
                            handleClick={this.handleClick}
                            handleChange={this.inputModal}
                            handleSubmit={this.handleSave}
                            handleNext={this.handleNext}
                            handleBack={this.handleBack}
                            steps={this.state.modalProps.type === "email" ? services.emailSteps : services.passwordSteps}
                            getEmailContent={services.getEmailContent}
                            getPasswordContent={services.getPasswordContent}
                        />
                        
                        <Modal
                            open={this.state.lfBooks.open || this.state.location.open}
                            onClose={this.state.lfBooks.open ? this.closeLFBooks : this.closeLocation}
                        >
                            {this.state.lfBooks.open ? (
                                <LFBooksEditor
                                    lfBooks={this.state.lfBooks.list}
                                    handleClose={this.closeLFBooks}
                                    handleChange={this.lfBooksInput}
                                    handleBooks={this.handleBooks}
                                    handleList={this.handleList}
                                    handleSubmit={this.handleSave}
                                    isModal={true}
                                />
                            ) : (
                                <LocationEditor
                                    location={this.state.location}
                                    handleChange={this.handleInput}
                                    handleAutocomplete={this.handleAutocomplete}
                                    handleSave={this.handleSave}
                                />
                            )}
                        </Modal>
    
                        <Typography
                            className={this.props.classes.username}
                            variant="h5"
                        >
                            Hello, {this.props.store.user.username}
                        </Typography>
    
                        <Divider className={this.props.classes.dividers} />
    
                        {services.buttonInfo.map((button, index) => {
                            return (
                                <div className={this.props.classes.infoContainer} key={`${button.text + index}`}>
                                    <Button
                                        className={this.props.classes.infoTitle}
                                        onClick={() => this.handleType(button.data)}
                                        endIcon={<Icon>{button.icon}</Icon>}
                                    >
                                        {button.text}
                                    </Button>
    
                                    <Divider className={this.props.classes.dividers} />
    
                                        {button.data === "password"
                                            ?
                                            <p className={this.props.classes.secure}>You Thought</p>
                                            :
                                            <Typography
                                                className={this.props.classes.info}
                                            >
                                                {services.buttonData(button.data, this.props.store.user)}
                                            </Typography>
                                        }
                                </div>
                            );
                        })}
                    </Paper>
                </Grid>
            </Grid>
        );
    };
};

const mapStateToProps = (state: any) => ({ store: state });

export default withRouter(connect(mapStateToProps)(withStyles(styles, { withTheme: true })(Profile)));
