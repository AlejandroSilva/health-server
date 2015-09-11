import React from 'react'
import {Link} from 'react-router'
import request from 'request'

export default class ServerInfo extends React.Component{
    constructor(){
        super();
        this.state = {}
    }
    componentDidMount(){
        console.log("mount", this.props.params)
    }
    componentWillReceiveProps(){
        console.log("receive props", this.props.params)

    }
    getData(){
        request.get('')
    }
    render(){
        return(
            <div>
                <h1>this is the information of { this.props.params }</h1>
            </div>
        )
    }
}
