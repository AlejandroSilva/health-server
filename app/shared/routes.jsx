import React from 'react'
import Router from 'react-router'

import {Route, NotFoundRoute, DefaultRoute} from 'react-router'

// Components
import App from './components/appView.jsx'
import Home from './components/home.jsx'
import NotFound from './components/notFound.jsx'


var About = React.createClass({render: function () {return <h2>About</h2>;}});
var Inbox = React.createClass({render: function () {return <h2>Inbox</h2>;}});

export default (
    <Route handler={App}>
        <Route path="home" handler={Home}/>
        <Route path="about" handler={About}/>
        <Route path="inbox" handler={Inbox}/>
        <NotFoundRoute handler={NotFound}/>
    </Route>
);