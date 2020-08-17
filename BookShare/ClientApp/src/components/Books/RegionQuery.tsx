// import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';

// import { states } from '../Resources/index';

// import { makeStyles } from '@material-ui/styles';
// import {
//     TextField,
//     Button,
//     Paper,
//     Select,
//     MenuItem,
//     Input
// } from '@material-ui/core';
// import { Autocomplete } from '@material-ui/lab';

// const useStyles = makeStyles(() => ({
//     container: {
//         display: 'flex',
//         alignContent: 'center',
//         alignItems: 'center',
//         justifyContent: 'center',
//         flexWrap: 'wrap',
//         padding: '10%',
//         backgroundColor: '#8860D0',
//         height: '100vh'
//     },
//     header: {
//         width: '100%',
//         color: '#5980E9',
//         marginBottom: 30,
//         textAlign: 'center'
//     },
//     paper: {
//         display: 'flex',
//         alignContent: 'center',
//         alignItems: 'center',
//         justifyContent: 'center',
//         flexWrap: 'wrap',
//         position: 'fixed',
//         top: '50%',
//         left: '50%',
//         transform: 'translate(-50%, -50%)',
//         padding: '10%',
//         width: '70%'
//     },
//     modal: {
//         position: 'fixed',
//         top: '50%',
//         left: '50%',
//         transform: 'translate(-50%, -50%)',
//         display: 'flex',
//         alignContent: 'center',
//         alignItems: 'center',
//         justifyContent: 'center',
//         flexWrap: 'wrap',
//         padding: '10%',
//         width: '95%'
//     },
//     input: {
//         width: '100%',
//         marginBottom: 20
//     },
//     search: {
//         width: '100%',
//         backgroundColor: '#E85A4F',
//         color: 'white',
//         padding: 10,
//         transition: 'background-color 0.4s ease',
//         '&:hover': {
//             backgroundColor: '#E98074',
//             color: 'white'
//         }
//     }
// }));

// const fields = ["Mathmatics", "History", "Medical", "Computer Science", "Psycology"];
// const initInfo = {
//     city: "",
//     state: "",
//     study: ""
// };

// export default ({ history }) => {

//     const classes = useStyles();
//     const dispatch = useDispatch();

//     const [info, setInfo] = useState({ ...initInfo });

//     const handleInput = (type) => event => {
//         try {
//             setInfo({ ...info, [type]: event.target.value });
//         } catch (error) {
//             dispatch({ type: "ERROR_NOTIFY", payload: "Something went wrong :(" });
//         }
//     };

//     const handleAutocomplete = (value, type) => {
//         try {
//             setInfo({ ...info, [type]: value.title });
//         } catch (error) {
//             dispatch({ type: "ERROR_NOTIFY", payload: "Something went wrong :(" });
//         }
//     };

//     const handleSearch = () => {
//         try {
//             const { city, state, study } = info;
//             history.push(`/books/${city}/${state}/${study}`);
//         } catch (error) {
//             dispatch({ type: "ERROR_NOTIFY", payload: "Something went wrong :(" });
//         }
//     };

//     const preSubmit = () => {
//         try {
//             switch (true) {
//                 case info.city.length <= 0:
//                     return dispatch({ type: "WARNING_NOTIFY", payload: "City field is blank" });
//                 case info.state.length <= 2:
//                     return dispatch({ type: "WARNING_NOTIFY", payload: "State name is too short" });
//                 default:
//                     return handleSearch();
//             }
//         } catch (error) {
//             dispatch({ type: "ERROR_NOTIFY", payload: "Something went wrong :(" });
//         }
//     };

//     return (
//         <Paper className={classes.paper}>
//             <TextField
//                 className={classes.input}
//                 value={info.city}
//                 onChange={handleInput("city")}
//                 label="City"
//                 color="secondary"
//             />

//             <Autocomplete
//                 options={states}
//                 getOptionLabel={option => option.title}
//                 className={classes.input}
//                 value={{ title: info.state }}
//                 onChange={(e, newValue) => handleAutocomplete(newValue, "state")}
//                 renderInput={params => <TextField {...params} label="State" />}
//             />

//             <TextField
//                 label="Study"
//                 value={info.study}
//                 onChange={handleInput("study")}
//                 className={classes.input}
//             />

//             <Button
//                 className={classes.search}
//                 onClick={preSubmit}
//             >
//                 Search
//             </Button>

//         </Paper>
//     );
// };
