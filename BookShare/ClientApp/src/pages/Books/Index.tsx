import React, { Component } from 'react';
import { connect } from 'react-redux';

import { RouteComponentProps } from 'react-router-dom';
import { History, LocationState } from 'history';

import BookQuery from '../../components/Books/BookQuery';
import Multiple from '../../components/Books/Multiple';
import Manual from '../../components/Books/Manual';
import LFBook from '../../components/Post/LFBook';
import { initValidation } from '../../components/Books/Services/ContainerServices';

import { withStyles, createStyles, makeStyles } from '@material-ui/styles';
import {
    Paper,
    Tabs,
    Tab,
    Grow,
    Grid
} from '@material-ui/core';
import Validation from '../../components/Post/Services/Validation';

const styles = () => createStyles({
    // container: container,
    // alignmentContainer: alignmentContainer,
    // paper: paper,
    // modal: modal,
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
        width: '50%'
    }
});

interface IProps extends RouteComponentProps {
    isModal : boolean;
    isDesktop : boolean;
    history : History<LocationState>;
    classes : any;
    dispatch : any;
    store : any;
};

interface IValidation {
    open : boolean;
    lfBooks : any[];
};

interface IState {
    query : number;
    validation: IValidation;
};

class Index extends Component<IProps, IState> {

    // const store = useSelector(state => state);
    // const dispatch = useDispatch();

    constructor(props : IProps) {
        super(props);
        this.state = {
            query: 0,
            validation: initValidation
        };
    }

    componentWillMount() {
        console.log(this.props.store);
    };

    toggleValidation = () => {
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

    handleBooks = async (type : string, param : string) => {
        try {
            let result : any[];
            if (type === "ADD") {
                const { addBook } = await import('../../components/Books/Services/ContainerServices');
                result = addBook(param, this.state.validation.lfBooks);
            }
            if (type === "REMOVE") {
                const { removeBook } = await import('../../components/Books/Services/ContainerServices');
                result = removeBook(param, this.state.validation.lfBooks);
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

    handleSave = async () => {
        try {
            const { fetchUpdateLF } = await import('../../components/Profile/Services/InfoServices');
            const result = await fetchUpdateLF(this.state.validation.lfBooks, this.props.store.user.username);
            
            if (result.warning) {
                return this.props.dispatch({ type: "WARNING_NOTIFY", payload: result.message });
            }
            else if (result.error) {
                return this.props.dispatch({ type: "ERROR_NOTIFY", payload: result.message });
            } else {
                this.setState((state) => ({
                    ...state,
                    validation: initValidation
                }));
                this.props.dispatch({ type: "UPDATE", payload: result });
            }
        } catch (error) {
            this.props.dispatch({ type: "ERROR_NOTIFY", payload: "Something went wrong :(" });
        }
    };

    handleChange = (event : any, value : number) => {
        try {
            this.setState((state) => ({
                ...state,
                query: value
            }));
        }
        catch (error) {
            this.props.dispatch({ type: "ERROR_NOTIFY", payload: "Something went wrong :(" });
        }
    };

    renderSearch = () => {
        try {
            const props = {
                history: this.props.history,
                store: this.props.store,
                validation: this.state.validation,
                toggleValidation: this.toggleValidation,
                handleBooks: this.handleBooks,
                handleSave: this.handleSave,
                changeTab: this.handleChange
            };
            if (this.state.query === 0) return <BookQuery { ...props } />;
            if (this.state.query === 1) return <Multiple { ...props } />;
            return <Manual history={this.props.history} store={this.props.store} />;
        } catch (error) {
            this.props.dispatch({ type: "ERROR_NOTIFY", payload: "Something went wrong :(" });
        }
    };

    classnameSwitch = () => {
        if (this.props.isModal) return this.props.classes.modal;
        if (this.props.isDesktop) return this.props.classes.desktop;
        else return this.props.classes.paper;
    };

    render() {
        return (
            <Grid container  className={this.props.classes.container}>
                <Grid xs={12} className={this.props.classes.alignmentContainer}>
    
                    <Paper className={this.classnameSwitch()}>
                        <Tabs
                            value={this.state.query}
                            onChange={this.handleChange}
                            indicatorColor="primary"
                        >
                            <Tab label="Single" />
                            <Tab label="Multiple" />
                            <Tab label="Manual" />
                        </Tabs>
    
                        <Grow in={this.state.validation.open}>
                            <div>
                                {/* <LFBook
                                    lfBooks={this.state.validation.lfBooks}
                                    handleBooks={this.handleBooks}
                                    handleSave={this.handleSave}
                                    isModal={true}
                                    toggle={this.toggleValidation}
                                /> */}
                            </div>
                        </Grow>
    
                        { this.renderSearch() }
                        
                    </Paper>
                </Grid>
            </Grid>
        );
    };
};

const mapStateToProps = function(state : any) {
    return { store: state };
}

export default connect(mapStateToProps)(withStyles(styles, { withTheme: true })(Index));