import React from 'react'
import Router from 'react-router'

import {Route, NotFoundRoute, DefaultRoute} from 'react-router'

// Components
import App   from './components/appView.jsx'
import Home  from './components/home.jsx'
import ServerInfo  from './components/ServerInfo.jsx'
import ServersInfo from './components/ServersInfo.jsx'
import AddServer from './components/addServer.jsx'

import NotFound from './components/notFound.jsx'

export default (
    <Route handler={App}>
        <Route name="home"       handler={Home}        path="home"/>
        <Route name="servers"    handler={ServersInfo} path="servers"/>
        <Route name="addServer"  handler={AddServer}   path="add"/>
        <Route name="serverInfo" handler={ServerInfo}  path="server/:serverId" params="{{serverId: serverId}}"/>
        <NotFoundRoute handler={NotFound}/>
    </Route>
);