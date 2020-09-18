import React, { PureComponent } from 'react';

import { IBook } from '../Services/interfaces';
import Image from '../Services/image.json';
import { createStyles, withStyles } from '@material-ui/styles';
import {
    TextField,
    GridList,
    GridListTile,
    GridListTileBar,
    IconButton,
    Icon,
    Button
} from '@material-ui/core';

const styles = () => createStyles({
    image: {
        width: '100%',
        height: 150,
        marginBottom: 20,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: '50% 50%'
    },
    inputs: {
        width: '100%',
        marginBottom: 20
    },
    button: {
        width: '100%',
        padding: 10,
        backgroundColor: '#21ce99',
        color: 'white',
        transition: 'background-color 0.4s ease',
        '&:hover': {
            backgroundColor: '#13ab7d',
            color: 'white'
        }    
    },
    underline: {
        '&:before': {
            borderBottom: '1px solid #21ce99'
        },
        '&:after': {
            borderBottom: `2px solid #21ce99`
        },
        '&:hover:not($disabled):not($focused):not($error):before': {
            borderBottom: `2px solid #f50057`
        },
        '&.MuiFormLabel-root': {
            color: '#21ce99'
        },
        '&.MuiFormLabel-root .Mui-focused': {
            color: '#21ce99'
        }    
    },
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
    },
    gridList: {
        flexWrap: 'nowrap',
        transform: 'translateZ(0)',
        width: '100%',
        marginBottom: '20px !important'
    },
    titleBar: {
        background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
});

interface IProps {
    book: IBook;
    handleInput: (type: string, event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
    saveImage: (event: React.ChangeEvent<HTMLInputElement>) => void;
    deleteImage: (index: number, event: React.MouseEvent<HTMLButtonElement>) => void;
    classes: any;
};

class BookIntro extends PureComponent<IProps> {

    readonly imgHelper = "data:image/jpeg;base64,";

    render(): JSX.Element {
        const tileData = this.props.book.image.value.length >= 1 ? this.props.book.image.value : [{ url: Image.url }];
        return (
            <>
                <input
                    style={{
                        width: '100%',
                        height: '100%',
                        display: 'none'
                    }}
                    onChange={this.props.saveImage}
                    accept="image/*"
                    id="image-uploader"
                    type="file"
                    multiple
                />
                <label htmlFor="image-uploader" style={{ width: '60%' }}>
                    <Button className={this.props.classes.button} component="span">
                        Upload
                    </Button>
                </label>
    
                <GridList className={this.props.classes.gridList} cols={1.5}>
                    {tileData.map((image, index) => (
                        <GridListTile key={`bookImage${index}`}>
                            <img src={`${this.imgHelper}${image.url}`} alt={`Book #${index}`}/>
                            <GridListTileBar
                                title={this.props.book.title.value}
                                classes={{ root: this.props.classes.titleBar, title: this.props.classes.title }}
                                actionIcon={
                                    <IconButton
                                        onClick={(e) => this.props.deleteImage(index, e)}
                                        disabled={this.props.book.image.value.length <= 0}
                                    >
                                        <Icon style={{ color: 'white' }}>delete_outline</Icon>
                                    </IconButton>
                                }
                            />
                        </GridListTile>
                    ))}
                </GridList>
    
                <TextField
                    className={this.props.classes.inputs}
                    value={this.props.book.title.value}
                    onChange={(e) => this.props.handleInput("title", e)}
                    placeholder="Book Name"
                    inputProps={{
                        style: { fontSize: "1.5rem", textAlign: 'center' }
                    }}
                    InputProps={{ classes: { underline: this.props.classes.underline }}}
                    helperText="required"
                    error={this.props.book.title.error}
                />
    
                <TextField
                    className={this.props.classes.inputs}
                    value={this.props.book.description.value}
                    onChange={(e) => this.props.handleInput("description", e)}
                    placeholder="Description"
                    multiline={true}
                    InputProps={{ classes: { underline: this.props.classes.underline }}}
                    helperText="required"
                    error={this.props.book.description.error}
                />
            </>
        );
    };
};

export default withStyles(styles)(BookIntro);