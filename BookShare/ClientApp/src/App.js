import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';

import { fetchValidation } from './TokenServices';
import Appbar from './components/Navigation/Appbar';

import Home from './pages/Home/index';

import Books from './pages/Books/Index';
import EditBook from './pages/Profile/EditBook';
import Search from './pages/Books/Search/Index';
import BookView from './pages/Books/BookView/BookView';
import Post from './pages/Post';
import Profile from './pages/Profile/Profile';
import BookProfile from './pages/Profile/Books';

import { ThemeProvider } from '@material-ui/styles';
import './custom.css'
import { createMuiTheme, useMediaQuery } from '@material-ui/core';

export default () => {

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

    return (
        <ThemeProvider theme={theme}>
            <Appbar />
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/books/:page/:title/:state/:city" component={Search} />
                <Route path="/bookList/:page/:state/:city/:list" component={Search} />
                <Route path="/books/edit/:id" component={EditBook} />
                <Route path="/books/:id" component={BookView} />
                <Route exact path="/books" component={Books} />
                <Route exact path="/post" component={Post} />
                <Route exact path="/profile" component={Profile} />
                <Route exact path="/bookshelf" component={BookProfile} />
            </Switch>
        </ThemeProvider>
    );
};
