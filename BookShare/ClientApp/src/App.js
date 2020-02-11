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

import './custom.css'

export default () => {

    const store = useSelector(state => state);
    const dispatch = useDispatch();

    useEffect(() => {
        if (store.loggedIn || !store.checking) return;

        const token = localStorage.getItem("token");

        if (token) {
            fetchValidation(token, dispatch);
            return;
        }

        dispatch({ type: "NO_TOKEN" });
    }, [store]);

    return (
        <>
            <Appbar />
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/books/:title/:state/:city" component={Search} />
                <Route path="/books/edit/:id" component={EditBook} />
                <Route path="/books/:id" component={BookView} />
                <Route exact path="/books" component={Books} />
                <Route exact path="/post" component={Post} />
                <Route exact path="/profile" component={Profile} />
                <Route exact path="/bookshelf" component={BookProfile} />
            </Switch>
        </>
    );
};
