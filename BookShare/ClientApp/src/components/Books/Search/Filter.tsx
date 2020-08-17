import React, { PureComponent } from 'react';

import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { withStyles, createStyles } from '@material-ui/styles';
import {
    Paper,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Switch,
    Typography,
    Button
} from '@material-ui/core';

const styles = (theme : Theme) => createStyles({
    paper: {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        flexWrap: 'wrap',
        width: '40%',
        padding: '5%',
        [theme.breakpoints.down('xs')]: {
            width: '70%',
            padding: '10%'
        }
    },
    header: {
        width: '100%',
        marginBottom: 20,
        color: '#E98074',
        textAlign: 'center'
    },
    switchContainer: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginBottom: 20
    },
    inputs: {
        flexGrow: 1,
    },
    apply: {
        width: '100%',
        padding: 10,
        backgroundColor: '#E85A4F',
        color: 'white',
        '&:hover': {
            backgroundColor: '#E98074',
            color: 'white'
        }
    }
});

const fields = ["Medical", "Mathmatics", "Engineering"];
const conditions = ["Mint", "Good", "Fair", "Rough"];

interface IProps {
    handleApply : () => Promise<void>;
    handleSwitch : (type : string) => (event : React.ChangeEvent<HTMLInputElement>) => void;
    handleChange : (type : string) => (event : React.ChangeEvent<{ value: unknown }>) => void;
    handleInput : (type : string) => (event : React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
    checked : any;
    classes : any;
};

class Filter extends PureComponent<IProps> {
    render() {
        return (
            <Paper className={this.props.classes.paper}>
                <Typography
                    className={this.props.classes.header}
                    variant="h5"
                >
                    Filter
                </Typography>
    
                <div className={this.props.classes.switchContainer}>
                    <Switch
                        checked={this.props.checked.Study.on}
                        onChange={this.props.handleSwitch("Study")}
                        value="Study"
                    />
                    <FormControl
                        style={{ width: '100%' }}
                    >
                        <InputLabel>Study</InputLabel>
                        <Select
                            className={this.props.classes.inputs}
                            onChange={this.props.handleChange("Study")}
                        >
                            {fields.map((item) => {
                                return <MenuItem key={item} value={item}>{item}</MenuItem>
                            })}
                        </Select>
                    </FormControl>
                </div>
    
                <div className={this.props.classes.switchContainer}>
                    <Switch
                        checked={this.props.checked.Condition.on}
                        onChange={this.props.handleSwitch("Condition")}
                        value="Condition"
                    />
                    <FormControl
                        style={{ width: '100%' }}
                    >
                        <InputLabel>Condition</InputLabel>
                        <Select
                            className={this.props.classes.inputs}
                            onChange={this.props.handleChange("Condition")}
                        >
                            {conditions.map((item) => {
                                return <MenuItem key={item} value={item}>{item}</MenuItem>
                            })}
                        </Select>
                    </FormControl>
                </div>
    
                <div className={this.props.classes.switchContainer}>
                    <Switch
                        checked={this.props.checked.ISBN.on}
                        onChange={this.props.handleSwitch("ISBN")}
                        value="ISBN"
                    />
                    <TextField
                        className={this.props.classes.inputs}
                        value={this.props.checked.ISBN.value}
                        onChange={this.props.handleInput("ISBN")}
                        label="ISBN"
                    />
                </div>
    
                <div className={this.props.classes.switchContainer}>
                    <Switch
                        checked={this.props.checked.CourseId.on}
                        onChange={this.props.handleSwitch("CourseId")}
                        value="CourseId"
                    />
                    <TextField
                        className={this.props.classes.inputs}
                        value={this.props.checked.CourseId.value}
                        onChange={this.props.handleInput("CourseId")}
                        label="Course ID"
                    />
                </div>
    
                <Button
                    className={this.props.classes.apply}
                    onClick={this.props.handleApply}
                >
                    Apply
                </Button>
            </Paper>
        );
    };
};

export default withStyles(styles, { withTheme: true })(Filter);
