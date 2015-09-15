import React from 'react'
import {Link} from 'react-router'

export default class ServerList extends React.Component{
    constructor(){
        super();
        this.state = {
            servers: []
        }
    }
    componentDidMount(){
        this.fetchList();
    }
    //componentWillReceiveProps(){}

    fetchList(){
        $.ajax({
            type: 'GET',
            url: '/v1/server',
            success: (servers)=>{
                this.setState({
                    servers: servers
                })
            },
            error: (xhr, type, err)=>{
                console.error("ajax error")
            }
        })
    }
    render(){
        return(
            <ul>
                <li><Link to="servers">Todos</Link></li>
                {this.state.servers.map((server)=>{
                    return(
                        <li key={server.id}><Link to="serverInfo" params={{serverId: server.id }}>{server.name}</Link></li>
                    )
                })}
            </ul>
        )
    }
}


