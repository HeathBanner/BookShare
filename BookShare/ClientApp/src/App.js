import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';

import { fetchValidation } from './TokenServices';
import Appbar from './components/Navigation/Appbar';
import Notify from './components/Notifications/Notify';
import Home from './pages/Home/index.tsx';
import Books from './pages/Books/Index';
import EditBook from './pages/Profile/EditBook';
import Search from './pages/Books/Search/Index';
import BookView from './pages/Books/BookView/BookView';
import Post from './pages/Post';
import Profile from './pages/Profile/Profile';
import BookProfile from './pages/Profile/Books';
import Email from './pages/Email/index';
import PasswordRecovery from './pages/Email/PasswordRecovery';

import Theme from './store/Theme';
import { ThemeProvider } from '@material-ui/styles';
import './custom.css'
import { createMuiTheme, useMediaQuery } from '@material-ui/core';

export default ({ history }) => {

    const store = useSelector(state => state);
    const dispatch = useDispatch();
    const theme = createMuiTheme()

    useEffect(() => {
        if (store.loggedIn || !store.checking) return;

        const token = localStorage.getItem("token");

        if (token) {
            fetchValidation(token, dispatch);
            return;
        }

        dispatch({ type: "NO_TOKEN" });
    }, [store]);

    const xs = useMediaQuery(theme.breakpoints.down('xs'));
    const sm = useMediaQuery(theme.breakpoints.down('sm'));
    const md = useMediaQuery(theme.breakpoints.down('md'));
    const lg = useMediaQuery(theme.breakpoints.down('lg'));

    const widthSignal = () => {
        switch (true) {
            case xs:
                return console.log('XS');
            case sm:
                return console.log('SM');
            case md:
                return console.log('MD');
            case lg:
                return console.log('LG');
            default:
                console.log('XL');
        }
    };

    widthSignal();

    const closeNotify = () => dispatch({ type: "RESET_NOTIFY" });

    return (
        <Theme>
            <Appbar />
            <Notify
                notification={store.notification}
                handleClose={closeNotify}
            />
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/books/:page/:title/:state/:city/:sale/:trade" component={Search} />
                <Route path="/bookList/:page/:state/:city/:list/:sale/:trade" component={Search} />
                <Route path="/books/edit/:id" component={EditBook} />
                <Route path="/books/:id" component={BookView} />
                <Route path="/email/:token" component={Email} />
                <Route path="/passwordRecovery" exact component={PasswordRecovery} />
                <Route exact path="/books" component={Books} />
                <Route exact path="/post" component={Post} />
                <Route exact path="/profile" component={Profile} />
                <Route exact path="/bookshelf" component={BookProfile} />
            </Switch>
        </Theme>
    );
};
