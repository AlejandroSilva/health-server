import React from 'react'
import {Link} from 'react-router'

export default class ServerInfo extends React.Component{
    constructor(){
        super();
        this.state = {}
    }
    render(){
        return(
            <div>
                <h1>this is the information of { this.props.params }</h1>
            </div>
        )
    }
}
