import React from 'react';

import Image from '../Services/image.json';
import { makeStyles } from '@material-ui/styles';
import {
    TextField,
    GridList,
    GridListTile,
    GridListTileBar,
    IconButton,
    Icon,
    Button
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    image: {
        width: '100%',
        height: 150,
        marginBottom: 20,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: '50% 50%'
    },
    inputs: theme.inputs,
    button: theme.button,
    underline: theme.underline,
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
}));

export default ({ book, handleInput }) => {

    const classes = useStyles();
    const imgHelper = "data:image/jpeg;base64,";
    const tileData = book.image.length > 0 ? book.image : [{ url: Image.url }];

    return (
        <>
            <input
                style={{
                    width: '100%',
                    height: '100%',
                    display: 'none'
                }}
                value={book.value}
                onChange={(e) => handleInput("image", e)}
                accept="image/*"
                id="image-uploader"
                type="file"
                multiple
            />
            <label htmlFor="image-uploader" style={{ width: '60%' }}>
                <Button className={classes.button} component="span">
                    Upload
                </Button>
            </label>

            <GridList className={classes.gridList} cols={1.5}>
                {tileData.map((image, index) => (
                    <GridListTile key={`bookImage${index}`}>
                        <img src={`${imgHelper}${image.url}`} alt={`Book #${index}`}/>
                        <GridListTileBar
                            title={book.title.value}
                            classes={{ root: classes.titleBar, title: classes.title }}
                            actionIcon={
                                <IconButton
                                    onClick={() => handleInput("deleteImage", index)}
                                    disabled={book.image.length <= 0}
                                >
                                    <Icon style={{ color: 'white' }}>delete_outline</Icon>
                                </IconButton>
                            }
                        />
                    </GridListTile>
                ))}
            </GridList>

            <TextField
                className={classes.inputs}
                value={book.title.value}
                onChange={(e) => handleInput("title", e)}
                placeholder="Book Name"
                inputProps={{
                    style: { fontSize: "1.5rem", textAlign: 'center' }
                }}
                InputProps={{ classes: { underline: classes.underline }}}
                helperText="required"
                error={book.title.error}
            />

            <TextField
                className={classes.inputs}
                value={book.description.value}
                onChange={(e) => handleInput("description", e)}
                placeholder="Description"
                multiline={true}
                InputProps={{ classes: { underline: classes.underline }}}
                helperText="required"
                error={book.description.error}
            />
        </>
    );
};
