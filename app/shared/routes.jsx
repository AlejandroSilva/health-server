import React from 'react'
import Router from 'react-router'

import {Route, NotFoundRoute, DefaultRoute} from 'react-router'

// Components
import App from './components/appView.jsx'
import Home from './components/home.jsx'
import About from './components/about.jsx'
import NotFound from './components/notFound.jsx'



export default (
    <Route handler={App}>
        <Route path="home" name="home" handler={Home}/>
        <Route path="about" name="about" handler={About}/>
        <NotFoundRoute handler={NotFound}/>
    </Route>
);