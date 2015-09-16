import React from 'react'
import {Link} from 'react-router'
import * as Api from './../../client/apiV1.js'

export default class ServerList extends React.Component{
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
    //componentWillReceiveProps(){}

    _getServers(){
        Api.server.getAll()
            .then((servers)=> this.setState({servers: servers} ) )
            .catch((err)=> this.setState({error: err}) )
    }
    render(){
        if(this.state.error){
            return <h3>Error: {this.state.error}</h3>

        }else {
            return (
                <ul>
                    <li><Link to="servers">Todos</Link></li>
                    {this.state.servers.map((server)=> {
                        return (
                            <li key={server.id}><Link to="serverInfo"
                                                      params={{serverId: server.id }}>{server.name}</Link></li>
                        )
                    })}
                </ul>
            )
        }
    }
}


