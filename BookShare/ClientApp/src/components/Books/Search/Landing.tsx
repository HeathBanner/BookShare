// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { RouteComponentProps } from 'react-router';
// import { History, LocationState } from 'history';

// import RegionQuery from '../RegionQuery';
// import BookCards from './BookCards';
// import InfoScreen from '../../ScreenCatchers/InfoScreen';
// import Filter from './Filter';
// import ImageViewer from '../../Utils/ImageViewer';
// import * as services from '../Services/QueryServices';

// import { makeStyles } from '@material-ui/styles';
// import {
//     Grid,
//     Modal,
//     Button,
//     Icon,
//     IconButton,
//     Typography,
//     CircularProgress
// } from '@material-ui/core';

// const useStyles = makeStyles(() => ({
//     container: {
//         display: 'flex',
//         alignContent: 'center',
//         alignItems: 'center',
//         justifyContent: 'center',
//         flexWrap: 'wrap',
//         padding: '5%',
//         backgroundColor: '#EAE7DC',
//         minHeight: '100vh',
//         paddingTop: 80
//     },
//     button: {
//         width: '100%',
//         marginBottom: 10,
//         padding: 10,
//         backgroundColor: '#E98074',
//         color: 'white'
//     },
//     pageBox: {
//         marginTop: 20,
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     arrows: {
//         padding: 10,
//         backgroundColor: '#E98074',
//         color: 'white'
//     },
//     circularProgress: {
//         position: 'fixed',
//         top: '50%',
//         left: '50%',
//     }
// }));

// const Landing = ({ params, history }) => {

//     const classes = useStyles();
//     const store = useSelector(state => state);
//     const dispatch = useDispatch();
//     const errorMsg = { error: true, message: "Something went wrong :(" };

//     const [modal, setModal] = useState({ ...services.initModal });
//     const [viewer, setViewer] = useState(false);
//     const [books, setBooks] = useState({ list: null, loaded: false, page: 1 });
//     const [checked, setChecked] = useState({ ...services.initFilter });

//     useEffect(() => {
//         try {
//             if (!books.loaded && store.user || params.page !== books.page) {
//                 fetchSwitch();
//             }
//         } catch (error) {
//             dispatch({ type: "ERROR_NOTIFY", payload: "Something went wrong :(" });
//         }

//     }, [store, books, params]);

//     const handleOpen = (type) => event => {
//         try {
//             setModal({ ...modal, [type]: true });
//         } catch (error) {
//             dispatch({ type: "ERROR_NOTIFY", payload: "Something went wrong :(" });
//         }
//     };
//     const handleClose = (type) => event => {
//         try {
//             setModal({ ...modal, [type]: false });
//         } catch (error) {
//             dispatch({ type: "ERROR_NOTIFY", payload: "Something went wrong :(" });
//         }
//     };

//     const handleBack = () => {
//         try {
//             const newPage = parseInt(params.page) - 1;
//             history.push(`/bookList/${newPage}/${params.state}/${params.city}/${params.list}`);
//         } catch (error) {
//             dispatch({ type: "ERROR_NOTIFY", payload: "Something went wrong :(" });
//         }
//     };

//     const handleNext = () => {
//         try {
//             const newPage = parseInt(params.page) + 1;
//             history.push(`/bookList/${newPage}/${params.state}/${params.city}/${params.list}`);
//         } catch (error) {
//             dispatch({ type: "ERROR_NOTIFY", payload: "Something went wrong :(" });
//         }
//     };

//     const handleSwitch = (type) => event => {
//         try {
//             const value = !checked[type].on;
//             setChecked({ ...checked, [type]: { ...checked[type], on: value } });
//         } catch (error) {
//             dispatch({ type: "ERROR_NOTIFY", payload: "Something went wrong :(" });
//         }
//     };

//     const handleChange = (type) => event => {
//         try {
//             setChecked({ ...checked, [type]: { ...checked[type], value: event.target.value } });
//         } catch (error) {
//             dispatch({ type: "ERROR_NOTIFY", payload: "Something went wrong :(" });
//         }
//     };

//     const handleInput = (type) => event => {
//         try {
//             setChecked({ ...checked, [type]: { ...checked[type], value: event.target.value } });
//         } catch (error) {
//             dispatch({ type: "ERROR_NOTIFY", payload: "Something went wrong :(" });
//         }
//     };

//     const fetchSwitch = async () => {
//         try {
//             let result;
//             if (params.title) result = await services.fetchByBook(params, store.user.lfBooks);
//             if (params.list) result = await services.fetchByList(params);
        
//             setBooks({ ...result });
//         } catch (error) {
//             dispatch({ type: "ERROR_NOTIFY", payload: "Something went wrong :(" });
//         }
//     };

//     const handleApply = async (checked) => {
//         try {
//             const newBooks = await services.genFilter(checked, params);
    
//             setBooks({ ...books, list: newBooks });
//             setModal({ ...modal, filter: false });
//         } catch (error) {
//             dispatch({ type: "ERROR_NOTIFY", payload: "Something went wrong :(" });
//         }
//     };

//     const openViewer = () => setViewer(true);
//     const closeViewer = () => setViewer(false);

//     if (!store.user) return (
//         <InfoScreen
//             message="You must be logged in to view this"
//             action={false}
//         />
//     );
//     if (!books.loaded) return <CircularProgress className={classes.circularProgress} />;
//     return (
//         <Grid className={classes.container} item xs={12}>

//             <Button
//                 className={classes.button}
//                 onClick={handleOpen("query")}
//             >
//                 Search
//             </Button>

//             <Button
//                 className={classes.button}
//                 onClick={handleOpen("filter")}
//             >
//                 Filter
//             </Button>

//             <Modal
//                 aria-labelledby="simple-modal-title"
//                 aria-describedby="simple-modal-description"
//                 open={modal.query}
//                 onClose={handleClose("query")}
//             >
//                 <RegionQuery isModal={true} />
//             </Modal>

//             <Modal
//                 open={modal.filter}
//                 onClose={handleClose("filter")}
//             >
//                 <Filter
//                     handleApply={handleApply}
//                     handleSwitch={handleSwitch}
//                     handleChange={handleChange}
//                     handleInput={handleInput}
//                     checked={checked}
//                 />
//             </Modal>

//             {books.list.map((item) => <BookCards
//                     book={item}
//                     id={item.id}
//                     openViewer={openViewer}
//                 />
//             )}

//             <div className={classes.pageBox}>
//                 <IconButton
//                     className={classes.arrows}
//                     disabled={parseInt(books.page) === 1}
//                     onClick={handleBack}
//                 >
//                     <Icon>arrow_back_ios</Icon>
//                 </IconButton>

//                 <Typography
//                     style={{ margin: "0px 10px" }}
//                 >
//                     {books.page}
//                 </Typography>

//                 <IconButton
//                     className={classes.arrows}
//                     onClick={handleNext}
//                     disabled={books.list.length < 3}
//                 >
//                     <Icon>arrow_forward_ios</Icon>
//                 </IconButton>
//             </div>

//             <ImageViewer
//                 images={books.image}
//                 open={viewer}
//                 handleClose={closeViewer}
//             />

//         </Grid>
//     );
// };

// export default withRouter(Landing);
