import React from 'react'
import {Link} from 'react-router'

export default class ServerList extends React.Component{
    constructor(){
        super();
        this.state = {
            servers: [
                'server1', 'server2', 'server3'
            ]
        }
    }
    render(){
        return(
            <ul>
                <li><Link to="servers">All</Link></li>
                {this.state.servers.map((server)=>{
                    return(
                        <li><Link to="serverInfo" params={{serverId: server}}>{server}</Link></li>
                    )
                })}
            </ul>
        )
    }
}


