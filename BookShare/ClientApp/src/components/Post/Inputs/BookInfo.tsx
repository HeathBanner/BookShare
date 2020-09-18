import React, { PureComponent } from 'react';

import * as services from '../Services/PostServices';
import { IBook } from '../../../components/Post/Services/interfaces';

import { createStyles, withStyles } from '@material-ui/styles';
import {
    TextField,
    InputLabel,
    FormControl,
    FormHelperText,
    Select,
    Input,
    MenuItem
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';

const styles = () => createStyles({
    inputs: {
        width: '100%',
        marginBottom: 20,
        '&:underline': {
            '&:before': {
                borderBottom: '1px solid #21ce99'
            },
            '&:after': {
                borderBottom: `2px solid #21ce99`
            },
            '&:hover:not($disabled):not($focused):not($error):before': {
                borderBottom: `2px solid #f50057`
            }
        }
    },
    inputContainers: {
        width: '100%',
        marginBottom: 20,
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'flex-end',
        alignItems: 'flex-end'
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
    label: {
        color: '#21ce99 !important',
    }
});

interface IProps {
    book: IBook
    handleInput: (type: string, event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
    handleSelectInput: (type: string, event: React.ChangeEvent<{ value: unknown }>) => void;
    handleAutocomplete: (value: any) => void;
    classes: any;
};

class BookInfo extends PureComponent<IProps> {
    render(): JSX.Element {
        return (
            <>
                <Autocomplete
                    options={services.states}
                    getOptionLabel={option => option.title}
                    className={this.props.classes.inputs}
                    classes={{ inputRoot: this.props.classes.underline }}
                    value={{ title: this.props.book.state.value }}
                    onChange={(e, newValue) => this.props.handleAutocomplete(newValue)}
                    renderInput={params => <TextField { ...params} label="State" InputLabelProps={{ classes: { focused: this.props.classes.label }}} />}
                />
    
                <TextField
                    className={this.props.classes.inputs}
                    InputProps={{ classes: { underline: this.props.classes.underline }}}
                    InputLabelProps={{ classes: { focused: this.props.classes.label }}}
                    value={this.props.book.city.value}
                    onChange={(e) => this.props.handleInput("city", e)}
                    label="City"
                    helperText="required"
                    error={this.props.book.city.error}
                />
                
                <div className={this.props.classes.inputContainers}>
                    <FormControl style={{ flexGrow: 1 }}>
                        <InputLabel
                            id="condition-label"
                            classes={{ focused: this.props.classes.label }}
                        >
                            Study
                        </InputLabel>
                        <Select
                            value={this.props.book.study.value}
                            onChange={(e) => this.props.handleSelectInput("study", e)}
                            labelId="condition-label"
                            input={<Input
                                classes={{ underline: this.props.classes.underline }}
                                error={this.props.book.study.error}
                            />}
                        >
                            {services.studies.map((item) => {
                                return <MenuItem value={item} key={item}>
                                    {item}
                                </MenuItem>;
                            })}
                        </Select>
                        <FormHelperText>required</FormHelperText>
                    </FormControl>
                </div>
    
    
                <div className={this.props.classes.inputContainers}>
                    <FormControl style={{ flexGrow: 1 }}>
                        <InputLabel
                            id="condition-label"
                            classes={{ focused: this.props.classes.label }}
                        >
                            Condition
                        </InputLabel>
                        <Select
                            value={this.props.book.condition.value}
                            onChange={(e) => this.props.handleSelectInput("condition", e)}
                            labelId="condition-label"
                            input={<Input
                                classes={{ underline: this.props.classes.underline }}
                                error={this.props.book.condition.error}
                            />}
                        >
                            {services.conditions.map((item) => {
                                return <MenuItem value={item} key={item}>
                                    {item}
                                </MenuItem>;
                            })}
                        </Select>
                        <FormHelperText>required</FormHelperText>
                    </FormControl>
                </div>
    
                <div className={this.props.classes.inputContainers}>
                    <TextField
                        style={{ flexGrow: 1 }}
                        InputProps={{ classes: { underline: this.props.classes.underline }}}
                        value={this.props.book.eMedia.value}
                        onChange={(e) => this.props.handleInput("eMedia", e)}
                        placeholder="External Media"
                        error={this.props.book.eMedia.error}
                    />
                </div>
    
                <div className={this.props.classes.inputContainers}>
                    <TextField
                        style={{ flexGrow: 1 }}
                        InputProps={{ classes: { underline: this.props.classes.underline }}}
                        value={this.props.book.price.value}
                        onChange={(e) => this.props.handleInput("price", e)}
                        placeholder="Price"
                        error={this.props.book.price.error}
                    />
                </div>
            </>
        );
    };
};

export default withStyles(styles)(BookInfo);