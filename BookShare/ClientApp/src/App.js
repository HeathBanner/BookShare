import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';

import Appbar from './components/Navigation/Appbar';

import Home from './pages/Home/index';

import Books from './pages/Books/Index';
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
        if (store.loggedIn) return;

        const token = localStorage.getItem("token");

        if (token) {
            fetchValidation(token);
            return;
        }

        return console.log("No Token stored!");
    }, [store]);

    const fetchValidation = async (token) => {
        const options = {
            method: "POST",
            body: JSON.stringify({ access_token: token }),
            headers: { "Content-Type": "application/json" }
        };
        const result = await fetch("/api/token/validate", options);
        const json = await result.json();

        console.log(json);

        if (json.statusCode === 200) {
            return dispatch({
                type: "VALIDATED",
                payload: json.user
            });
        }
    };

    return (
        <>
            <Appbar />
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/books/:title/:state/:city" component={Search} />
                <Route path="/books/:id" component={BookView} />
                <Route exact path="/books" component={Books} />
                <Route exact path="/post" component={Post} />
                <Route exact path="/profile" component={Profile} />
                <Route exact path="/bookshelf" component={BookProfile} />
            </Switch>
        </>
);
}
