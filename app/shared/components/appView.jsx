import React from 'react'
import {RouteHandler, Link} from 'react-router'

export default class AppView extends React.Component{
    render(){
        return (
            <div id="app-view">
                <h1>Todos List asd as</h1>
                <ul>
                    <li><Link to="home">home</Link></li>
                    <li><Link to="about">about</Link></li>
                </ul>
                <hr />
                {this.props.children}
                <RouteHandler/>
            </div>
        );
    }
}