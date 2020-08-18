import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { History, LocationState } from 'history';

// On next start up, check to see if Landing.tsx is needed in components/Books;

import QueryContainer from '../Index';
import RegionQuery from '../../../components/Books/RegionQuery';
import BookCards from '../../../components/Books/Search/BookCards';
import InfoScreen from '../../../components/ScreenCatchers/InfoScreen';
import Filter from '../../../components/Books/Search/Filter';
import ImageViewer from '../../../components/Utils/ImageViewer';
import { initModal, initFilter, IModal, IFilter, IBooks } from '../../../components/Books/Services/QueryServices';

import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { withStyles, createStyles } from '@material-ui/styles';
import {
    Grid,
    Modal,
    Button,
    Icon,
    IconButton,
    Typography,
    CircularProgress,
    GridList,
    GridListTile,
    withWidth,
    WithWidthProps
} from '@material-ui/core';

const styles = (theme : Theme) => createStyles({
    // container: theme.container,
    button: {
        // ...theme.button,
        marginBottom: 10
    },
    pageBox: {
        marginTop: 20,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
    },
    arrows: {
        padding: 10,
        backgroundColor: '#E98074',
        color: 'white'
    },
    circularProgress: {
        position: 'fixed',
        top: '50%',
        left: '50%'
    },
    tile: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center'
    }
});

interface IProps extends RouteComponentProps {
    match : any;
    history : History<LocationState>;
    classes : any;
    dispatch : any;
    store : any;
    width: WithWidthProps;
};

interface IViewer {
    open : boolean;
    index : number;
};

interface IState {
    modal : IModal;
    books : IBooks;
    checked : IFilter;
    viewer : IViewer;
};

class Index extends Component<IProps, IState> {

    constructor(props : IProps) {
        super(props);
        this.state = {
            modal : initModal,
            books : { list: [], loaded: false, page: 1 },
            checked: initFilter,
            viewer: { open: false, index: 0 }
        };
    };
    
    isDesktop = this.props.width >= 600;

    componentDidUpdate() {
        if (!this.state.books.loaded && this.props.store.user || this.props.match.params.page !== this.state.books.page) {
            this.fetchSwitch();
        }
    };

    handleOpen = (type : string) => (event : React.MouseEvent<HTMLButtonElement>) : void => {
        try {
            this.setState((state) => ({
                ...state,
                modal: {
                    ...state.modal,
                    [type]: true
                }
            }));
        } catch (error) {
            this.props.dispatch({ type: "ERROR_NOTIFY", payload: "Something went wrong :(" });
        }
    };
    
    handleClose = (type : string) => (event : React.MouseEvent<HTMLButtonElement>) : void => {
        try {
            this.setState((state) => ({
                ...state,
                modal: {
                    ...state.modal,
                    [type]: false
                }
            }));
        } catch (error) {
            this.props.dispatch({ type: "ERROR_NOTIFY", payload: "Something went wrong :(" });
        }
    };

    handleBack() {
        try {
            const { params } = this.props.match;
            const newPage = parseInt(params.page) - 1;
            if (this.props.match.params.list) {
                return this.props.history.push(`/bookList/${newPage}/${params.state}/${params.city}/${params.list}`);
            }
            return this.props.history.push(`/books/${newPage}/${params.title}/${params.state}/${params.city}/${params.sale}/${params.trade}`);
        } catch (error) {
            this.props.dispatch({ type: "ERROR_NOTIFY", payload: "Something went wrong :(" });
        }
    };

    handleNext() {
        try {
            const { params } = this.props.match;
            const newPage = parseInt(params.page) + 1;
            if (params.list) {
                return this.props.history.push(`/bookList/${newPage}/${params.state}/${params.city}/${params.list}`);
            }
            return this.props.history.push(`/books/${newPage}/${params.title}/${params.state}/${params.city}/${params.sale}/${params.trade}`);
        } catch (error) {
            this.props.dispatch({ type: "ERROR_NOTIFY", payload: "Something went wrong :(" });
        }
    };

    handleSwitch = (type : string) => (event : React.ChangeEvent<HTMLInputElement>) : void => {
        try {
            let value : Object;
            switch(type) {
                case "Study":
                    value = { ...this.state.checked.Study, on: !this.state.checked.Study.on };
                case "Condition":
                    value = { ...this.state.checked.Condition, on: !this.state.checked.Condition.on };
                case "ISBN":
                    value = { ...this.state.checked.Study, on: !this.state.checked.ISBN.on };
                default:
                    value = { ...this.state.checked.Study, on: !this.state.checked.CourseId };
            };

            this.setState((state) => ({
                ...state,
                checked: {
                    ...state.checked,
                    [type]: value
                }
            }));
        } catch (error) {
            this.props.dispatch({ type: "ERROR_NOTIFY", payload: "Something went wrong :(" });
        }
    };

    handleChange = (type : string) => (event : React.ChangeEvent<{ value: unknown }>) : void => {
        try {
            const { value } = event.target;
            let obj : Object;
            if (type === "Study") obj = { ...this.state.checked.Study, value: value };
            else obj = { ...this.state.checked.Condition, value: value };

            this.setState((state) => ({
                ...state,
                checked: {
                    ...state.checked,
                    [type]: value 
                }
            }));
        } catch (error) {
            this.props.dispatch({ type: "ERROR_NOTIFY", payload: "Something went wrong :(" });
        }
    };

    handleInput = (type : string) => (event : React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) : void => {
        try {
            const { value } = event.target;
            let obj : Object;
            if (type === "ISBN") obj = { ...this.state.checked.ISBN, value: value };
            else obj = { ...this.state.checked.CourseId, value: value };

            this.setState((state) => ({
                ...state,
                checked: {
                    ...state.checked,
                    [type]: obj
                }
            }));
        } catch (error) {
            this.props.dispatch({ type: "ERROR_NOTIFY", payload: "Something went wrong :(" });
        }
    };

    openViewer(index : number) : void {
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
    closeViewer() : void {
        try {
            this.setState((state) => ({
                ...state,
                viewer: {
                    open: false,
                    index: 0                
                }
            }));
        } catch (error) {
            this.props.dispatch({ type: "ERROR_NOTIFY", payload: "Something went wrong :(" });
        }
    };

    async fetchSwitch() : Promise<void> {
        try {
            let result : IBooks;
            const { params } = this.props.match;
            if (params.title) {
                const { fetchByBook } = await import('../../../components/Books/Services/QueryServices');
                result = await fetchByBook(params, this.props.store.user.lfBooks);
            }
            if (params.list) {
                const { fetchByList } = await import('../../../components/Books/Services/QueryServices');
                result = await fetchByList(params);
            }

            this.setState((state) => ({
                ...state,
                books: result
            }));
        } catch (error) {
            this.props.dispatch({ type: "ERROR_NOTIFY", payload: "Something went wrong :(" });
        }
    };

    async handleApply() : Promise<void> {
        try {
            const { genFilter } = await import('../../../components/Books/Services/QueryServices');
            const newBooks = await genFilter(this.state.checked, this.props.match.params);
            
            this.setState((state) => ({
                ...state,
                books: {
                    ...state.books,
                    list: newBooks
                },
                modal: {
                    ...state.modal,
                    filter: false
                }
            }));
        } catch (error) {
            this.props.dispatch({ type: "ERROR_NOTIFY", payload: "Something went wrong :(" });
        }
    };

    renderSearch() {
        if (this.isDesktop) return <QueryContainer isDesktop={true} />
        else return (
            <Button
                className={this.props.classes.button}
                onClick={this.handleOpen("query")}
            >
                Search
            </Button>
        );
    };

    renderTiles() : JSX.Element | JSX.Element[] {
        if (this.state.books.loaded && this.state.books.list.length === 0) {
            return (
                <Typography
                    style={{
                        width: '100%',
                        textAlign: 'center',
                        margin: '30px 0px'
                    }}
                >
                    There appears to be no books with the title of {this.props.match.params.title} in your area
                </Typography>
            );
        }
        else return this.state.books.list.map((item, index) => (
                <GridListTile key={item.title} classes={{ tile: this.props.classes.tile }} >
                    <BookCards
                        book={item}
                        id={item.id}
                        index={index}
                        openViewer={this.openViewer}
                    />
                </GridListTile>
            ));
    };

    render() {
        if (!this.props.store.user) return (
            <InfoScreen
                message="You must be logged in to view this"
                action={false}
            />
        );
        if (!this.state.books.loaded) return <CircularProgress className={this.props.classes.circularProgress} />;
        return (
            <Grid container>
                <Grid className={this.props.classes.container} item xs={12}>
    
                    {this.renderSearch()}
    
                    <Button
                        className={this.props.classes.button}
                        onClick={this.handleOpen("filter")}
                    >
                        Filter
                    </Button>
    
                    <Modal
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                        open={this.state.modal.query}
                        onClose={this.handleClose("query")}
                    >
                        <RegionQuery isModal={true} />
                    </Modal>
    
                    <Modal
                        open={this.state.modal.filter}
                        onClose={this.handleClose("filter")}
                    >
                        <Filter
                            handleApply={this.handleApply}
                            handleSwitch={this.handleSwitch}
                            handleChange={this.handleChange}
                            handleInput={this.handleInput}
                            checked={this.state.checked}
                        />
                    </Modal>
    
                    <GridList
                        cellHeight="auto"
                        spacing={20}
                        className={this.props.classes.gridList}
                        cols={this.isDesktop ? 2 : 1}
                    >
                        {this.renderTiles()}
                    </GridList>
    
                    <div className={this.props.classes.pageBox}>
                        <IconButton
                            className={this.props.classes.arrows}
                            disabled={parseInt(this.state.books.page) === 1}
                            onClick={this.handleBack}
                        >
                            <Icon>arrow_back_ios</Icon>
                        </IconButton>
    
                        <Typography
                            style={{ margin: "0px 10px" }}
                        >
                            {this.state.books.page}
                        </Typography>
    
                        <IconButton
                            className={this.props.classes.arrows}
                            onClick={this.handleNext}
                            disabled={this.state.books.list.length < 3}
                        >
                            <Icon>arrow_forward_ios</Icon>
                        </IconButton>
                    </div>
    
                    <ImageViewer
                        images={this.state.books.list[this.state.viewer.index].image}
                        open={this.state.viewer.open}
                        handleClose={this.closeViewer}
                    />
                </Grid>
            </Grid>
        );
    };
};

const mapStateToProps = (state : any) => ({ store: state });

export default connect(mapStateToProps)(withStyles(styles, { withTheme: true })(withWidth()(Index)));
