import React, { PureComponent } from 'react';
import { Route, Switch, withRouter } from 'react-router';
import { RouteComponentProps } from 'react-router-dom';
import { History, LocationState } from 'history';
import { connect } from 'react-redux';

import { fetchValidation } from './TokenServices';
import Appbar from './components/Navigation/Appbar';
import Notify from './components/Notifications/Notify';
import Home from './pages/Home/index';
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

interface IProps extends RouteComponentProps {
    history: History<LocationState>;
    dispatch: any;
};

class App extends PureComponent<IProps> {

    componentDidMount(): void {
        const token = localStorage.getItem("token");
    
        if (token) {
            fetchValidation(token, this.props.dispatch);
            return;
        }
    
        this.props.dispatch({ type: "NO_TOKEN" });
    };

    // const xs = useMediaQuery(theme.breakpoints.down('xs'));
    // const sm = useMediaQuery(theme.breakpoints.down('sm'));
    // const md = useMediaQuery(theme.breakpoints.down('md'));
    // const lg = useMediaQuery(theme.breakpoints.down('lg'));

    // const widthSignal = () => {
    //     switch (true) {
    //         case xs:
    //             return console.log('XS');
    //         case sm:
    //             return console.log('SM');
    //         case md:
    //             return console.log('MD');
    //         case lg:
    //             return console.log('LG');
    //         default:
    //             console.log('XL');
    //     }
    // };

    // widthSignal();

    render(): JSX.Element {
        return (
            <Theme>
                <Appbar />
                <Notify />
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/books/:page/:title/:state/:city/:sale/:trade" component={Search} />
                    <Route exact path="/bookList/:page/:state/:city/:list/:sale/:trade" component={Search} />
                    <Route exact path="/books/edit/:id" component={EditBook} />
                    <Route exact path="/books/:id" component={BookView} />
                    <Route exact path="/email/:token" component={Email} />
                    <Route exact path="/passwordRecovery" component={PasswordRecovery} />
                    <Route exact path="/books" component={Books} />
                    <Route exact path="/post" component={Post} />
                    <Route exact path="/profile" component={Profile} />
                    <Route exact path="/bookshelf" component={BookProfile} />
                </Switch>
            </Theme>
        );
    };
};

export default withRouter(connect()(App));