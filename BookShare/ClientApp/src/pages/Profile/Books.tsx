import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { History, LocationState } from 'history';
import { withRouter } from 'react-router';

import BookCards from '../../components/Books/Search/BookCards';
import ImageViewer from '../../components/Utils/ImageViewer';
import InfoScreen from '../../components/ScreenCatchers/InfoScreen';
import EditBook from '../../components/Profile/Books/EditBook';
import { fetchDelete, initModal, IModal, IViewer } from '../../components/Profile/Services/BookServices';
import { IUserReturn } from '../../components/Profile/Services/InfoServices';
import { User, IPosted } from '../../store/interfaces';

import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { createStyles, withStyles } from '@material-ui/styles';
import {
    Grid,
    GridList,
    GridListTile,
 } from '@material-ui/core';

 // Figure out a way to work without isDesktop
 const styles = (theme: Theme) => createStyles({
    container: {
        display: 'flex',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
        paddingTop: 60,
        paddingBottom: 30,
        paddingRight: '5%',
        paddingLeft: '5%',
    [theme.breakpoints.up('sm')]: {
            paddingRight: '10%',
            paddingLeft: '10%'
        }
    },
    tile: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center'
    }
 });

interface IProps extends RouteComponentProps {
    history: History<LocationState>;
    classes: any;
    store: any;
    dispatch: any;
};

interface IState {
    modal: IModal;
    viewer: IViewer;
};

class Books extends Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state = {
            modal: initModal,
            viewer: {
                open: false,
                index: 0
            }
        };
    };

    protected handleOpen = (id: string): void => {
        try {
            this.setState((state) => ({
                ...state,
                modal: {
                    open: true,
                    id: id
                }
            }));
        } catch (error) {
            this.props.dispatch({ type: "ERROR_NOTIFY", payload: "Something went wrong :(" });
        }
    };
    protected handleClose = (): void => {
        this.setState((state) => ({
            ...state,
            modal: initModal
        }));
    };

    protected handleService = async(type: string, id: string): Promise<void> => {
        try {
            const { username } = this.props.store.user;
    
            let result: IUserReturn = new User().generateEmptyUserReturn();
            if (type === "edit") return this.props.history.push(`books/edit/${id}`);
            if (type === "delete") result = await fetchDelete(id, username);
            
            this.props.dispatch({ type: "UPDATE", payload: result.user });
        } catch (error) {
            this.props.dispatch({ type: "ERROR_NOTIFY", payload: "Something went wrong :(" });
        } 
    };

    protected openViewer = (index: number): void => {
        try {
            this.setState((state) => ({
                ...state,
                viewer: {
                    open: true,
                    index: index
                }
            }));
        } catch (error) {
            this.props.dispatch({ type: "ERROR_NOTIFY", payload: "Something went wrong :(" });
        }
    };

    protected closeViewer = (): void => {
        this.setState((state) => ({
            ...state,
            viewer: {
                open: false,
                index: 0
            }
        }));
    };

    protected renderBookInfo = (): JSX.Element | string => {
        try {
            if (!this.props.store.user.posted) return "";
    
            return this.props.store.user.posted.map((item: IPosted, index: number) => (
                    <GridListTile
                        key={item.id}
                        style={{ marginTop: 20, justifyContent: 'center' }}
                        classes={{ tile: this.props.classes.tile }}
                    >
                        <BookCards
                            book={item}
                            id={item.id}
                            index={index}
                            openViewer={this.openViewer}
                            openModal={this.handleOpen}
                        />
                    </GridListTile>
                ));
        } catch (error) {
            this.props.dispatch({ type: "ERROR_NOTIFY", payload: "Something went wrong :(" });
            return "";
        }
    };

    render(): JSX.Element {
        if (!this.props.store.user || this.props.store.user.posted.length < 1) return (
            <InfoScreen
                message={!this.props.store.user ? "You must be logged in to view this page" : "It appears you've not posted a book"}
                action={{
                    message: "Click here to get started!",
                    func: () => this.props.history.push("/post")
                }}
                active={!this.props.store.user}
                icon="alert"
            />
        );
        return (
            <Grid
                className={this.props.classes.container}
                container
            >
                <GridList cellHeight="auto" spacing={20} cols={1}>
                    {this.renderBookInfo()}
                </GridList>
    
                <EditBook
                    modal={this.state.modal}
                    handleClose={this.handleClose}
                    handleService={this.handleService}
                />
    
                <ImageViewer
                    images={this.props.store.user.posted[this.state.viewer.index].image}
                    open={this.state.viewer.open}
                    handleClose={this.closeViewer}
                />
            </Grid>
        );
    };
};

const mapStateToProps = (state: any) => ({ store: state });

export default withRouter(connect(mapStateToProps)(withStyles(styles, { withTheme: true })(Books)));