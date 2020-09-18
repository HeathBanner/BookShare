import React, { Component, ChangeEvent } from 'react';
import { connect } from 'react-redux';

import InfoScreen from '../../components/ScreenCatchers/InfoScreen';
import Stepper from '../../components/Post/Stepper';
import ValidationScreen from '../../components/ScreenCatchers/ValidationScreen';
import { PostServices } from '../../components/Post/Services/PostServices';
import { IBook, IBookRaw, IImageRaw, IFetchId } from '../../components/Post/Services/interfaces';

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
});

interface IProps {
    editId: string;
    classes: any;
    dispatch: any;
    store: any
};

interface IState {
    book: IBook
};

class Index extends Component<IProps, IState> {
    public services = new PostServices();

    constructor(props: IProps) {
        super(props);
        this.state = {
            book: this.services.initBook
        };
    };

    componentDidMount() {
        if (!this.props.editId) return;
        this.handleBook();
    };

    componentDidUpdate() {
        console.log(this.state.book);
    }

    private handleBook = async(): Promise<void> => {
        try {
            const { fetchById } = await import('../../components/Post/Services/PostServices');
            const result: IFetchId = await fetchById(this.props.editId);

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

    private saveImage = async(event: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
        try {
            const { files } = event.target;
            if (files === null) {
                return this.props.dispatch({ type: "ERROR_NOTIFY", payload: "Something went wrong :(" });
            }
            else if (files.length > 5) {
                this.props.dispatch({ type: "ERROR_NOTIFY", payload: "You can only upload 5 photos" });
            }
            let currentImages: IImageRaw[] = this.state.book.image.value;
            let count = files.length;
            for (let file of files) {
                let reader = new FileReader();
                reader.onload = (e: any) => {
                    const parsed = e.target.result.split("base64,");
                    currentImages.push({ url: parsed[1] });
    
                    if (!--count) {
                        return this.setState((state) => ({
                            book: {
                                ...state.book,
                                image: {
                                    ...state.book.image,
                                    value: currentImages
                                }
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

    private deleteImage = (index: number, event: React.MouseEvent<HTMLButtonElement>): void => {
        try {
            let images: IImageRaw[] = this.state.book.image.value;
            images.splice(index, 1);
            this.setState((state) => ({
                book: {
                    ...state.book,
                    image: {
                        ...state.book.image,
                        value: images
                    }
                }
            }));
        } catch (error) {
            this.props.dispatch({ type: "ERROR_NOTIFY", payload: "Something went wrong :(" });
        }
    };

    protected handleInput = (type: string, event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, index?: number): void => {
        try {
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
        } catch (error) {
            this.props.dispatch({ type: "ERROR_NOTIFY", payload: "Something went wrong :(" });
        }
    };

    protected handleSelectInput = (type: string, event: React.ChangeEvent<{ value: unknown }>): void => {
        try {
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
        } catch (error) {
            this.props.dispatch({ type: "ERROR_NOTIFY", payload: "Something went wrong :(" });
        }
    };

    protected handleAutocomplete = (value: any): void => {
        try {
            const newValue: string = value ? value.title : "";
            this.setState((state) => ({
                book: {
                    ...state.book,
                    state: {
                        error: false,
                        value: value.title
                    }
                }
            }));
        } catch (error) {
            this.props.dispatch({ type: "ERROR_NOTIFY", payload: "Something went wrong :(" });
        }
    };

    protected handleSubmit = async(): Promise<void> => {
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

    protected bookInput = async(type: string, param: string, index?: number): Promise<void> => {
        try {
            let result: string[] = [...this.state.book.lfBooks];
            const { handleBook } = await import('../../components/Post/Services/PostServices');
            if (typeof index === 'number') {
                result = handleBook(type, param, index, result);
            } else {
                result = handleBook(type, param, 0, result);
            }
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

    render(): JSX.Element {
        if (!this.props.store.loggedIn) return <ValidationScreen />;
        if (this.props.store.user.posted.length >= 5) {
            return <InfoScreen
                active={false}
                message="You've reached your limit of 5 books posted."
                action={{
                    func: () => "",
                    message: ""
                }}
                icon="warning"
            />;
        }
        return (
            <Grid container>
                <Grid className={this.props.classes.container} item xs={12}>
                    <Stepper
                        book={this.state.book}
                        handleInput={this.handleInput}
                        handleSelectInput={this.handleSelectInput}
                        saveImage={this.saveImage}
                        deleteImage={this.deleteImage}
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