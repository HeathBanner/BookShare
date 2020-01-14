import React, { Component } from 'react';
import { Route, Switch } from 'react-router';

import Appbar from './components/Navigation/Appbar';

import Home from './pages/Home/index';

import Books from './pages/Books/Index';
import Search from './pages/Books/Search/Index';
import BookView from './pages/Books/BookView/BookView';
import Post from './pages/Post';

import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
      return (
          <>
            <Appbar />
            <Switch>
                <Route exact path="/" component={Home} />
                  <Route path="/books/:city/:state/:study" component={Search} />
                  <Route path="/books/:title/:study" component={Search} />
                <Route path="/books/:id" component={BookView} />
                <Route exact path="/books" component={Books} />
                <Route exact path="/post" component={Post} />
            </Switch>
        </>
    );
  }
}
