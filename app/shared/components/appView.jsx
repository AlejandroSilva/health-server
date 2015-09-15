import React from 'react'
import {Link, RouteHandler} from 'react-router'
import ServerList from './ServerList.jsx'

export default class AppView extends React.Component{
    constructor(){
        super();
    }
    render(){
        return (
            <div id="app-view">
                <Link to="addServer">Add Server</Link>
                <h3>Servers stats</h3>
                <ServerList />
                <hr />
                {this.props.children}
                <RouteHandler/>
            </div>
        );
    }
}