import React from 'react'
import {Link} from 'react-router'

export default class ServersInfo extends React.Component{
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
            <div>
                { this.state.servers.map( (server)=>{
                    return(
                        <div>
                            <h1>{server}</h1>
                            <p>here is some information</p>
                        </div>
                    )
                }) }
            </div>
        )
    }
}
