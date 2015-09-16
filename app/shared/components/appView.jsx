import React from 'react'
import {Link, RouteHandler} from 'react-router'
import ServerList from './ServerList.jsx'

export default class AppView extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div id="app-view">
                <ServerList />
                <hr />
                {this.props.children}
                <RouteHandler/>
            </div>
        );
    }
}