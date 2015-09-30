import React from 'react'
import {Link} from 'react-router'
import * as Api from './../../client/v1.js'

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
        return (
            <div>
                <h2>Servidores</h2>
                <ul>
                    <li><Link to="servers">Todos</Link></li>
                    {this.state.servers.map((server)=> {
                        return (
                            <li key={server.id}>
                                <Link to="serverInfo" params={{serverId: server.id }}>{server.name}</Link>
                            </li>
                        )
                    })}
                </ul>
                { this.state.error? <h3>Error this.state.error</h3> : null }
                <Link to="addServer">Add Server</Link>
            </div>
        )

    }
}


