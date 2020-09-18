import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { RouteComponentProps } from 'react-router-dom';
import { History, LocationState } from 'history';

import LFBooks from '../LFBooks';

import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { withStyles, createStyles } from '@material-ui/styles';
import {
    Typography,
    GridList,
    GridListTile,
    GridListTileBar,
    Card,
    CardContent,
} from '@material-ui/core';

const styles = (theme : Theme) => createStyles({
    card: {
        marginTop: 30,
        marginBottom: 10,
        borderRadius: 10,
        width: '90%',
        boxShadow: '2px 1px 5px 1px rgba(0,0,0,0.2), 0px 1px 0px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)',
    },
    media: {
        height: 300,
        backgroundSize: 'contain',
        [theme.breakpoints.down('xs')]: {
            height: 140
        }
    },
    gridList: {
        flexWrap: 'nowrap',
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        transform: 'translateZ(0)',
        width: '100%',
        marginBottom: '20px !important'
    },
    titleBar: {
        background:
          'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
    content: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
    },
    title: {
        width: '100%',
        marginBottom: 5,
        textAlign: 'center'
    },
    description: {
        display: '-webkit-box',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        '-webkit-box-orient': 'vertical',
        '-webkit-line-clamp': '2',
        lineHeight: '1.5em !important',
        maxHeight: '8em',
        padding: 1,
        marginTop: 20
    },
    info: {
        width: '100%',
        marginTop: 15,
    },
    listHeader: {
        width: '100%',
        marginTop: 10
    },
    divider: {
        marginBlockStart: '0.5em',
        width: '100%',
        backgroundColor: 'rgb(0, 0, 0, 0.2)'
    },
    list: {
        width: '100%',
    }
});

interface IProps extends RouteComponentProps {
    book: any;
    id: string;
    openViewer: (index: number) => void;
    index: number;
    openModal?: (id: string) => void;
    history: History<LocationState>;
    classes: any;
    dispatch: any;
};

class BookCards extends PureComponent<IProps> {
        
    handleClick = () => {
        try {
            console.log("CLICK")
            this.props.history.push(`/books/${this.props.id}`);
        } catch (error) {
            this.props.dispatch({ type: "ERROR_NOTIFY", payload: "Something went wrong :(" });
        }
    };

    render(): JSX.Element {
        console.log(this.props.openModal ? true : false);
        const imgHelper = "data:image/jpeg;base64,";
        const { image, title, description, condition, eMedia, state, city, lfBooks, price } = this.props.book;
        return (
            <Card className={this.props.classes.card}>
                <GridList
                    onClick={() => this.props.openViewer(this.props.index)}
                    className={this.props.classes.gridList}
                    cols={1.5}
                >
                    {image.map((item : any, index : number) => (
                        <GridListTile key={`bookImage${index}`}>
                            <img src={`${imgHelper}${item.url}`} alt={`Book #${index}`}/>
                            <GridListTileBar
                                title={title}
                                classes={{ root: this.props.classes.titleBar, title: this.props.classes.title }}
                            />
                        </GridListTile>
                    ))}
                </GridList>
    
                <CardContent className={this.props.classes.content} onClick={() => this.props.openModal ? this.props.openModal(this.props.id) : this.handleClick()}>
                    <Typography
                        className={this.props.classes.title}
                        variant="h5"
                    >
                        {title}
                    </Typography>
    
                    <Typography className={this.props.classes.description} variant="body1">
                        {description}
                    </Typography>
    
                    <Typography
                        className={this.props.classes.info}
                        color="textSecondary"
                        variant="caption"
                    >
                        Location: {city}, {state}
                    </Typography>
    
                    <Typography
                        className={this.props.classes.info}
                        color="textSecondary"
                        variant="caption"
                    >
                        Condition: {condition}
                    </Typography>
    
                    <Typography
                        className={this.props.classes.info}
                        color="textSecondary"
                        variant="caption"
                    >
                        External Media: {eMedia ? eMedia : "None"}
                    </Typography>
    
                    <Typography
                        className={this.props.classes.info}
                        color="textSecondary"
                        variant="caption"
                    >
                        Price: {price ? `$${price}` : "Trade Only"}
                    </Typography>
    
                    {lfBooks.length > 0 ? <LFBooks lfBooks={lfBooks} /> : ""}
    
                </CardContent>
            </Card>
        );
    };
};

export default connect()(withStyles(styles, { withTheme: true })(withRouter(BookCards)));