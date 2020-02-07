import React from 'react';

import { makeStyles } from '@material-ui/styles';
import {
    Paper,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Switch,
    Icon,
    Typography,
    Button
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
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
        padding: '10%',
        width: '70%'
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
}));

const fields = ["Medical", "Mathmatics", "Engineering"];
const conditions = ["Mint", "Good", "Fair", "Rough"];

export default ({ handleApply, handleSwitch, handleChange, handleInput, checked }) => {

    const classes = useStyles();

    return (
        <Paper className={classes.paper}>
            <Typography
                className={classes.header}
                variant="h5"
            >
                Filter
            </Typography>

            <div className={classes.switchContainer}>
                <Switch
                    checked={checked.Study.on}
                    onChange={handleSwitch("Study")}
                    value="Study"
                />
                <FormControl
                    style={{ width: '100%' }}
                >
                    <InputLabel>Study</InputLabel>
                    <Select
                        className={classes.inputs}
                        onChange={handleChange("Study")}
                    >
                        {fields.map((item) => {
                            return <MenuItem key={item} value={item}>{item}</MenuItem>
                        })}
                    </Select>
                </FormControl>
            </div>

            <div className={classes.switchContainer}>
                <Switch
                    checked={checked.Condition.on}
                    onChange={handleSwitch("Condition")}
                    value="Condition"
                />
                <FormControl
                    style={{ width: '100%' }}
                >
                    <InputLabel>Condition</InputLabel>
                    <Select
                        className={classes.inputs}
                        onChange={handleChange("Condition")}
                    >
                        {conditions.map((item) => {
                            return <MenuItem key={item} value={item}>{item}</MenuItem>
                        })}
                    </Select>
                </FormControl>
            </div>

            <div className={classes.switchContainer}>
                <Switch
                    checked={checked.ISBN.on}
                    onChange={handleSwitch("ISBN")}
                    value="ISBN"
                />
                <TextField
                    className={classes.inputs}
                    value={checked.ISBN.value}
                    onChange={handleInput("ISBN")}
                    label="ISBN"
                />
            </div>

            <div className={classes.switchContainer}>
                <Switch
                    checked={checked.CourseId.on}
                    onChange={handleSwitch("CourseId")}
                    value="CourseId"
                />
                <TextField
                    className={classes.inputs}
                    value={checked.CourseId.value}
                    onChange={handleInput("CourseId")}
                    label="Course ID"
                />
            </div>

            <Button
                className={classes.apply}
                onClick={() => handleApply(checked)}
            >
                Apply
            </Button>
        </Paper>
    );
};
