import React, { PureComponent } from 'react';

import Image from './imgs/janko-ferlic.png';

import { withStyles, createStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { Grid, Typography, Divider } from '@material-ui/core';

const styles = ({ breakpoints } : Theme) => createStyles({
    container: {
        display: 'flex',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
        padding: '10%',
        backgroundImage: `url(${Image})`,
        backgroundSize: 'cover',
        minHeight: '100vh'
    },
    title: {
        textAlign: 'center',
        width: '100%',
        color: '#E98074',
        fontSize: 96,
        [breakpoints.down('xs')]: {
            fontSize: 60
        }
    },
    introBody: {
        marginTop: 40,
        color: 'white',
        textAlign: 'center',
        width: '100%',
        fontSize: 48,
        [breakpoints.down('xs')]: {
            fontSize: 24
        }
    },
    divider: {
        marginBlockStart: '0.5em',
        marginBottom: 20,
        width: '60%',
        backgroundColor: 'rgb(255, 255, 255, 1)'
    }
});

class Landing extends PureComponent<any> {
    render() {
        return (
            <Grid item xs={12} className={this.props.classes.container}>
                <Typography className={this.props.classes.title}>
                    Sothis
                </Typography>
    
                <Divider className={this.props.classes.divider} />
    
                <Typography className={this.props.classes.introBody}>
                    Re-inventing the library
                </Typography>
            </Grid>
        );
    }
};

export default withStyles(styles, { withTheme: true })(Landing);