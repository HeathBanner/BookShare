import React, { Component } from 'react';
import { connect } from 'react-redux';

import InfoScreen from '../../components/ScreenCatchers/InfoScreen';
import Stepper from '../../components/Post/Stepper';
import ValidationScreen from '../../components/ScreenCatchers/ValidationScreen';
import { initBook, IBook, IFetchId } from '../../components/Post/Services/PostServices';

import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { withStyles, createStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';

const styles = (theme : Theme) => createStyles({
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '5% 25%',
        minHeight: '100vh',
        [theme.breakpoints.down('xs')]: {
            padding: '10% 5%',
        }
    },
    paper: {
        display: 'flex',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
        padding: '5%',
        marginTop: 50,
    },
    image: {
        width: '100%',
        height: 300,
        marginBottom: 20,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: '50% 50%'
    },
    title: {
        width: '100%',
        textAlign: 'center'
    },
    divider: {
        marginBlockCenter: '0.5em',
        width: '40%',
        backgroundColor: 'rgb(0, 0, 0, 0.2)',
        marginBottom: 30,
    },
    inputs: {
        width: '100%',
        marginBottom: 20
    },
    inputContainers: {
        width: '100%',
        marginBottom: 20,
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'flex-end',
        alignItems: 'flex-end'
    },
    button: {
        padding: 10,
        backgroundColor: 'red',
        color: 'white',
        width: '100%'
    }
});

interface IProps {
    editId : string;
    classes : any;
    dispatch : any;
    store : any
};

interface IState {
    book : IBook
};

class Index extends Component<IProps, IState> {

    constructor(props : IProps) {
        super(props);
        this.state = {
            book : initBook
        };
    };

    componentDidMount() {
        if (!this.props.editId) return;
        this.handleBook();
    };

    async handleBook() : Promise<void> {
        try {
            const { fetchById } = await import('../../components/Post/Services/PostServices');
            const result : IFetchId = await fetchById(this.props.editId);

            if (result.notify.warning) {
                this.props.dispatch({ type: "WARNING_NOTIFY", payload: result.notify.message });
            }
            if (result.notify.error) {
                return this.props.dispatch({ type: "ERROR_NOTIFY", payload: result.notify.message });
            }
    
            this.setState({ book: result.book });
        } catch (error) {
            this.props.dispatch({ type: "ERROR_NOTIFY", payload: "Something went wrong :(" });
        }
    };

    handleInput = (type : string, event : React.ChangeEvent<HTMLInputElement>) : void => {
        try {
            if (type === "image") {
                const { files } = event.target;
                return this.saveImage(type, files);
            }
            else if (type === "deleteImage") return this.deleteImage(event);
            else {
                const { value } = event.target;
                this.setState((state) => ({
                    book: {
                        ...state.book,
                        [type]: {
                            error: false,
                            value: value
                        }
                    }
                }));
            }
        } catch (error) {
            this.props.dispatch({ type: "ERROR_NOTIFY", payload: "Something went wrong :(" });
        }
    };

    handleAutocomplete(value : any) : void {
        try {
            this.setState((state) => ({
                book: {
                    ...state.book,
                    error: false,
                    value: value.title
                }
            }));
        } catch (error) {
            this.props.dispatch({ type: "ERROR_NOTIFY", payload: "Something went wrong :(" });
        }
    };

    async saveImage(type : string, blob : any) : Promise<void> {
        try {
            if (blob.length > 5) {
                this.props.dispatch({ type: "ERROR_NOTIFY", payload: "You can only upload 5 photos" });
            }
            let currentImages = this.state.book.image;
            let count = blob.length;
            for (let file of blob) {
                let reader = new FileReader();
                reader.onload = (e : any) => {
                    const parsed = e.target.result.split("base64,");
                    currentImages.push({ url: parsed[1] });
    
                    if (!--count) {
                        return this.setState((state) => ({
                            book: {
                                ...state.book,
                                [type]: currentImages
                            }
                        }));
                    }
                };
                reader.readAsDataURL(file);
            }        
        } catch (error) {
            this.props.dispatch({ type: "ERROR_NOTIFY", payload: "Something went wrong :(" });
        }
    };

    deleteImage = (index: number) : void => {
        try {
            let images = this.state.book.image;
            images.splice(index, 1);
            this.setState((state) => ({
                book: {
                    ...state.book,
                    image: images
                }
            }));
        } catch (error) {
            this.props.dispatch({ type: "ERROR_NOTIFY", payload: "Something went wrong :(" });
        }
    };

    async handleSubmit() : Promise<void> {
        try {
            let result;
            const { preSubmit } = await import('../../components/Post/Services/PostServices');
            const flag = preSubmit(this.state.book, this.props.store.notify);
    
            if (flag.notify.warning) {
                this.setState({ book: flag.book });
                this.props.dispatch({ type: "WARNING_NOTIFY", payload: flag.notify.message });
            }
            if (this.props.editId) {
                const { fetchEdit } = await import('../../components/Post/Services/PostServices');
                result = await fetchEdit(this.state.book, this.props.store.user, this.props.editId);
            }
            else {
                const { fetchPost } = await import('../../components/Post/Services/PostServices');
                result = await fetchPost(this.state.book, this.props.store.user);
            }
    
            this.props.dispatch({
                type: "NEW_BOOK",
                payload: {
                    user: result.user,
                    notification: {
                        success: true,
                        message: "Book has been posted!"
                    }
                }
            });
        } catch (error) {
            this.props.dispatch({ type: "ERROR_NOTIFY", payload: "Something went wrong :(" });
        }
    };

    async bookInput(type : string, param : string) : Promise<void> {
        try {
            const { handleBook } = await import('../../components/Post/Services/PostServices');
            const result = handleBook(type, param, 0, this.state.book.lfBooks);
            this.setState((state) => ({
                book: {
                    ...state.book,
                    lfBooks: result
                }
            }));
        } catch (error) {
            this.props.dispatch({ type: "ERROR_NOTIFY", payload: "Something went wrong :(" });
        }
    };

    render() {

        if (!this.props.store.loggedIn) return <ValidationScreen />;
        if (this.props.store.user.posted.length >= 5) {
            return <InfoScreen
                message="You've reached your limit of 5 books posted."
                icon="warning"
            />;
        }
        return (
            <Grid container>
                <Grid className={this.props.classes.container} item xs={12}>
                    <Stepper
                        book={this.state.book}
                        handleInput={this.handleInput}
                        handleAutocomplete={this.handleAutocomplete}
                        bookInput={this.bookInput}
                        handleSubmit={this.handleSubmit}
                    />
                </Grid>
            </Grid>
        );
    };
};

const mapStateToProps = (state : any) => ({ store: state });

export default connect(mapStateToProps)(withStyles(styles)(Index));