import React, { Component } from 'react';
import { Route, Switch } from 'react-router';

import Appbar from './components/Navigation/Appbar';

import Home from './pages/Home/index';

import Books from './pages/Books/Index';
import Search from './pages/Books/Search/Index';
import BookView from './pages/Books/BookView/BookView';
import Post from './pages/Post';
import Profile from './pages/Profile/Profile';
import BookProfile from './pages/Profile/Books';

import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
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
}
