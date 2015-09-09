import React from 'react'
import Router from 'react-router'

import {Route, NotFoundRoute, DefaultRoute} from 'react-router'

// Components
import App from './components/appView.jsx'
import Home from './components/home.jsx'
import NotFound from './components/notFound.jsx'

export default (
    <Route handler={App} path="/">
        <DefaultRoute handler={Home} />
        <NotFoundRoute handler={NotFound}/>
    </Route>
)