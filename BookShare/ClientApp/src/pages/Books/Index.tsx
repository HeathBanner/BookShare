import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { RouteComponentProps } from 'react-router-dom';
import { History, LocationState } from 'history';

import BookQuery from '../../components/Books/BookQuery';
import Multiple from '../../components/Books/Multiple';
import Manual from '../../components/Books/Manual';
import LFBook from '../../components/Post/LFBook';
import InfoScreen from '../../components/ScreenCatchers/InfoScreen';
import { initValidation, IValidation, initNotify, IInitNotify } from '../../components/Books/Services/ContainerServices';

import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { withStyles, createStyles } from '@material-ui/styles';
import { Paper, Tabs, Tab, Grow, Grid } from '@material-ui/core';

const styles = ({ breakpoints }: Theme) => createStyles({
    container: {
        display: 'flex',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
        padding: '20% 10% 10% 10%',
        minHeight: '100vh'    
    },
    alignmentContainer: {
        display: 'flex',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
    },
    paper: {
        display: 'flex',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
        padding: '5%',
        width: '40%',
        borderRadius: 10,
        boxShadow: '2px 1px 5px 1px rgba(0,0,0,0.2), 0px 1px 0px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)',
        [breakpoints.down('sm')]: {
            width: '60%'
        },
        [breakpoints.down('xs')]: {
            width: '80%'
        },    
    },
    modal: {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        display: 'flex',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
        padding: '10%',
        width: '95%'        
    },
    desktop: {
        display: 'flex',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
        marginTop: 60,
        marginBottom: 30,
        background: 'rgb(255, 255, 255, 0.5)',
        padding: '0% 5% 3% 5%',
        // width: '50%',
    }
});

interface IProps extends RouteComponentProps {
    isModal?: boolean;
    isDesktop?: boolean;
    history: History<LocationState>;
    classes: any;
    dispatch: any;
    store: any;
};

interface IState {
    query: number;
    validation: IValidation;
};

class Index extends Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state = {
            query: 0,
            validation: initValidation
        };
    };

    componentDidUpdate() {
        console.log(this.state.validation.lfBooks);
    }

    toggleValidation = (): void => {
        try {
            this.setState((state) => ({
                ...state,
                validation: {
                    ...state.validation,
                    open: !state.validation.open
                }
            }));
        } catch (error) {
            this.props.dispatch({ type: "ERROR_NOTIFY", payload: "Something went wrong :(" });
        }
    };

    handleBooks = async(type: string, param: string, index?: number): Promise<void> => {
        try {
            let result: any[] = [...this.state.validation.lfBooks];
            if (type === "ADD") {
                const { addBook } = await import('../../components/Books/Services/ContainerServices');
                result = addBook(param, result);
            }
            if (type === "REMOVE" && typeof index === 'number') {
                const { removeBook } = await import('../../components/Books/Services/ContainerServices');
                result = removeBook(index, result);
            }
            this.setState((state) => ({
                ...state,
                validation: {
                    ...state.validation,
                    lfBooks: result
                }
            }));
        } catch (error) {
            this.props.dispatch({ type: "ERROR_NOTIFY", payload: "Something went wrong :(" });
        }
    };

    handleSave = async(type: string): Promise<void> => {
        try {
            const { fetchUpdateLF } = await import('../../components/Profile/Services/InfoServices');
            const result = await fetchUpdateLF(this.state.validation.lfBooks, this.props.store.user.username);
            
            if (result.notify.warning) {
                return this.props.dispatch({ type: "WARNING_NOTIFY", payload: result.notify.message });
            }
            else if (result.notify.error) {
                return this.props.dispatch({ type: "ERROR_NOTIFY", payload: result.notify.message });
            } else {
                this.setState((state) => ({
                    ...state,
                    validation: initValidation
                }));
                const success: IInitNotify = { ...initNotify, success: true, message: "LF Books has been updated!" };
                this.props.dispatch({ type: "UPDATE&NOTIFY", payload: { user: result.user, notification: success }});
            }
        } catch (error) {
            this.props.dispatch({ type: "ERROR_NOTIFY", payload: "Something went wrong :(" });
        }
    };

    handleChange = (value: number): void => {
        try {
            console.log(value);
            this.setState((state) => ({
                ...state,
                query: value
            }));
        } catch (error) {
            this.props.dispatch({ type: "ERROR_NOTIFY", payload: "Something went wrong :(" });
        }
    };

    handleTab = (event: any, value: any): void => {
        try {
            this.setState((state) => ({
                ...state,
                query: value
            }));
        } catch (error) {
            this.props.dispatch({ type: "ERROR_NOTIFY", payload: "Something went wrong :(" });
        }
    };

    renderSearch = (): JSX.Element | undefined => {
        try {
            const props = {
                history: this.props.history,
                validation: this.state.validation,
                toggleValidation: this.toggleValidation,
                handleBooks: this.handleBooks,
                handleSave: this.handleSave,
                changeTab: this.handleChange
            };
            if (this.state.query === 0) return <BookQuery { ...props } />;
            else if (this.state.query === 1) return <Multiple { ...props } />;
            else return <Manual store={this.props.store} />;
        } catch (error) {
            this.props.dispatch({ type: "ERROR_NOTIFY", payload: "Something went wrong :(" });
        }
    };

    classnameSwitch = () => {
        if (this.props.isModal) return this.props.classes.modal;
        if (this.props.isDesktop) return this.props.classes.desktop;
        else return this.props.classes.paper;
    };

    render(): JSX.Element {
        if (!this.props.store.user) {
            return (
                    <InfoScreen
                        active={false}
                        message="You must be logged in to view this"
                        action={{
                            func: () => "",
                            message: ""
                        }}
                        icon="warning"
                    />
                );
        }
        return (
            <Grid container  className={this.props.classes.container}>
                <Grid xs={12} className={this.props.classes.alignmentContainer}>
    
                    <Paper className={this.props.classes.desktop}>
                        <Tabs
                            value={this.state.query}
                            onChange={this.handleTab}
                            indicatorColor="primary"
                        >
                            <Tab label="Single" />
                            <Tab label="Multiple" />
                            <Tab label="Manual" />
                        </Tabs>
    
                        <Grow in={this.state.validation.open}>
                            <div>
                                <LFBook
                                    lfBooks={this.state.validation.lfBooks}
                                    handleBooks={this.handleBooks}
                                    handleSubmit={this.handleSave}
                                    isModal={true}
                                    handleClose={this.toggleValidation}
                                />
                            </div>
                        </Grow>
    
                        { this.renderSearch() }
                        
                    </Paper>
                </Grid>
            </Grid>
        );
    };
};

const mapStateToProps = (state : any) => ({ store: state });

export default withRouter(connect(mapStateToProps)(withStyles(styles, { withTheme: true })(Index)));