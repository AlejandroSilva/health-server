import React from 'react'
import {Link} from 'react-router'
import ServerInfo from './ServerInfo.jsx'


export default class ServersInfo extends React.Component{
    constructor(){
        super();
        this.state = {
            servers: []
        }
    }
    componentDidMount(){
        this.fetchList();
    }
    componentWillReceiveProps(){
        this.fetchList();
    }
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
            <div>
                { this.state.servers.map( (server)=>{
                    return(
                        <div>
                            <ServerInfo params={{serverId: server.id}} />
                        </div>
                    )
                }) }
            </div>
        )
    }
}
