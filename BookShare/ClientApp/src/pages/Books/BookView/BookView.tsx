import React, { Component } from 'react';
import { connect } from 'react-redux';

import LFBooks from '../../../components/Books/LFBooks';
import ImageViewer from '../../../components/Utils/ImageViewer';
import InfoScreen from '../../../components/ScreenCatchers/InfoScreen';
import * as services from '../../../components/Books/BookView/services';

import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { withStyles, createStyles } from '@material-ui/styles';
import {
    Grid,
    GridList,
    GridListTile,
    GridListTileBar,
    Typography,
    Button,
    Divider,
    CircularProgress,
    Icon,
    Card,
    CardContent
} from '@material-ui/core';

const styles = (theme : Theme) => createStyles({
    container: {
        display: 'flex',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
        padding: '20% 10% 10% 10%',
        minHeight: '100vh'
    },
    paper: {
        display: 'flex',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
        background: 'rgb(255, 255, 255, 0.5)',
        padding: '0% 0% 0% 0%',
        borderRadius: '12px',
        [theme.breakpoints.up('lg')]: {
            width: '45%'
        },
        [theme.breakpoints.down('md')]: {
            width: '60%',
            padding: '0% 0% 0% 0%',
        },
        [theme.breakpoints.down('xs')]: {
            width: '100%',
            padding: '0% 0% 0% 0%'
        },
        boxShadow: "0px 2px 1px -1px rgba(0,0,0,0.2), 2px 2px 3px 0px rgba(0,0,0,0.14), 2px 2px 3px 1px rgba(0,0,0,0.12), 0px 1px 3px 0px rgba(0,0,0,0.12), 0px 1px 3px 0px rgba(0,0,0,0.12)"
    },
    gridList: {
        flexWrap: 'nowrap',
        transform: 'translateZ(0)',
        width: '100%',
        marginBottom: '20px !important'
    },
    titleBar: {
        background:
        'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
    title: {
        width: '100%',
        textAlign: 'center',
        marginTop: 20,
    },
    divider: {
        marginBlockStart: '0.5em',
        width: '60%',
        marginBottom: 20,
        backgroundColor: 'rgb(0, 0, 0, 0.2)'
    },
    contentContainer: {
        display: 'flex',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
    },
    img: {
        width: 'auto',
        height: 300,
        [theme.breakpoints.down('xs')]: {
            height: 140
        }
    },
    body: {
        width: '100%',
        marginBottom: 50,
        textAlign: 'center'
    },
    infoContainer: {
        display: 'flex',
        justifyContent: 'flex-start',
        width: '100%',
        marginBottom: 10
    },
    info: {
        width: '100%',
        marginBottom: 10,
    },
    buttons: {
        marginTop: 20,
    },
    listHeader: {
        width: '100%',
        marginTop: 10
    },
    listDivider: {
        marginBlockStart: '0.5em',
        width: '100%',
        backgroundColor: 'rgb(0, 0, 0, 0.2)'
    },
    list: {
        width: '100%',
    }
});

interface IProps {
    match : any;
    classes : any;
    store : any;
    dispatch : any;
};

interface IState {
    book : services.IBook;
    viewer : boolean;
};

class BookView extends Component<IProps, IState> {

    constructor(props : IProps) {
        super(props);
        this.state = {
            book: services.bookInit,
            viewer: false
        };
    };

    imgHelper = "data:image/jpeg;base64,";


    componentDidMount() {
        try {
            if (this.state.book.loaded || !this.props.store.user) return;
            this.fetchBooks();
        } catch (error) {
            this.props.dispatch({ type: "ERROR_NOTIFY", payload: "Something went wrong :(" });
        }
    };

    componentDidUpdate() {
        try {
            if (this.state.book.loaded || !this.props.store.user) return;
            this.fetchBooks();
        } catch (error) {
            this.props.dispatch({ type: "ERROR_NOTIFY", payload: "Something went wrong :(" });
        }
    }

    fetchBooks = async(): Promise<void> => {
        try {
            const result = await fetch(`api/book/id=${this.props.match.params.id}`);
            const json = await result.json();
            this.setState((state) => ({
                ...state,
                book: {
                    ...state.book,
                    info: json.books[0],
                    loaded: true
                }
            }));
        } catch (error) {
            this.props.dispatch({ type: "ERROR_NOTIFY", payload: "Something went wrong :(" });
        }
    };

    openViewer = () => this.setState((state) => ({ ...state, viewer: true }));
    closeViewer = () => this.setState((state) => ({ ...state, viewer: false }));

    handleRequest = async(): Promise<void> => {
        try {
            const result = await services.handleRequest(this.props.store.user, this.state.book)
            this.setState((state) => ({
                ...state,
                book: result
            }));
        } catch (error) {
            this.props.dispatch({ type: "ERROR_NOTIFY", payload: "Something went wrong :(" });
        }
    };

    render(): JSX.Element {
        if (!this.props.store.user) return (
            <InfoScreen
                active={false}
                message="You must be logged in to view this"
                action={{
                    func: () => "",
                    message: ""
                }}
                icon="alert"
            />
        );
        else if (!this.state.book.loaded) return <CircularProgress />;
    
        const { image, title, description, condition, eMedia, city, state, lfBooks } = this.state.book.info;
        const isRequested = services.isRequested(this.props.store.user.request, this.state.book.info.id);
    
        return (
            <Grid container>
                <Grid className={this.props.classes.container} item xs={12}>
                    <Card className={this.props.classes.paper}>
                        <GridList
                            onClick={this.openViewer}
                            className={this.props.classes.gridList}
                            cols={1.5}
                        >
                            {image.map((img : any, index : number) => (
                                <GridListTile key={`bookImage${index}`}>
                                    <img src={`${this.imgHelper}${img.url}`} alt={`Book #${index}`}/>
                                    <GridListTileBar
                                        title={title}
                                        classes={{ root: this.props.classes.titleBar, title: this.props.classes.title }}
                                    />
                                </GridListTile>
                            ))}
                        </GridList>
    
                        <CardContent className={this.props.classes.contentContainer}>
                            <Typography
                                className={this.props.classes.title}
                                variant="h5"
                            >
                                {title}
                            </Typography>
    
                            <Divider className={this.props.classes.divider} />
    
                            <Typography className={this.props.classes.body}>
                                {description ? description : "No Description..."}
                            </Typography>
    
                            <div className={this.props.classes.infoContainer}>
                                <Icon
                                    fontSize="small"
                                    style={{ marginRight: 10 }}
                                >
                                    my_location
                                </Icon>
                                <Typography variant="subtitle2">
                                    Location: {city}, {state}
                                </Typography>
                            </div>
    
                            <div className={this.props.classes.infoContainer}>
                                <Icon
                                    fontSize="small"
                                    style={{ marginRight: 10 }}
                                >
                                    { services.renderCondition(condition) }
                                </Icon>
                                <Typography variant="subtitle2">
                                    Condition: {condition}
                                </Typography>
                            </div>
    
                            <div className={this.props.classes.infoContainer}>
                                <Icon
                                    fontSize="small"
                                    style={{ marginRight: 10 }}
                                >
                                    attachment
                                </Icon>
                                <Typography variant="subtitle2">
                                    External Media: {!eMedia ? "None" : eMedia}
                                </Typography>
                            </div>
    
                            {lfBooks.length === 0 ? "" : <LFBooks lfBooks={lfBooks} />}
                            
                            <Button
                                className={this.props.classes.buttons}
                                onClick={this.handleRequest}
                                disabled={isRequested.flag}
                            >
                                {isRequested.flag ? `Requested on ${isRequested.date}` : "Request"}
                            </Button>
                        </CardContent>
    
                    </Card>
    
                    <ImageViewer
                        images={image}
                        open={this.state.viewer}
                        handleClose={this.closeViewer}
                    />
    
                </Grid>
            </Grid>
        );
    };
};

const mapStateToProps = (state : any) => ({ store: state });

export default connect(mapStateToProps)(withStyles(styles, { withTheme: true})(BookView));