import React from 'react'
import {RouteHandler} from 'react-router'
import ServerList from './ServerList.jsx'

export default class AppView extends React.Component{
    render(){
        return (
            <div id="app-view">
                <h1>Servers stats</h1>
                <ServerList />
                <hr />
                {this.props.children}
                <RouteHandler/>
            </div>
        );
    }
}