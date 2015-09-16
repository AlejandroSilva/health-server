import React from 'react'
import {Link} from 'react-router'
import ServerInfo from './ServerInfo.jsx'
import * as Api from './../../client/apiV1.js'

export default class ServersInfo extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            servers: [],
            error: ''
        }
    }
    componentDidMount(){
        this._getServers();
    }
    componentWillReceiveProps(){
        this._getServers();
    }
    _getServers(){
        Api.server.getAll()
            .then((servers)=> this.setState({servers: servers} ) )
            .catch((err)=> this.setState({error: err}) )
    }
    render(){
        let content = <p></p>
        if(this.state.error){
            content = <h3>{this.state.error}</h3>

        }else{
            content = this.state.servers.map( (server)=> {
                return <ServerInfo key={server.id} params={{serverId: server.id}}/>
            })
        }
        return <div>{content}</div>
    }
}
