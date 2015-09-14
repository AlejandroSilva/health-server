import React from 'react'
import {Link} from 'react-router'
import io from 'socket.io-client'
let socket = io.connect('http://localhost:8888')

// Modules
import Cpu from './modules/Cpu.jsx'
import DiscIO from './modules/DiscIO.jsx'
import DiscMounted from './modules/DiscMounted.jsx'
import NetIO from './modules/NetIO.jsx'
import Ping from './modules/Ping.jsx'
import Ram from './modules/Ram.jsx'


export default class ServerInfo extends React.Component{
    constructor(){
        super();
        this.state = {}
    }
    componentDidMount(){
        this.fetchData();
    }
    componentWillReceiveProps(){
        this.fetchData();
    }
    componentWillUnmount(){
        socket.removeAllListeners();
    }
    fetchData(){
        $.ajax({
            type: 'GET',
            url: `/v1/server/${this.props.params.serverId}`,
            success: (server)=>{
                this.setState({
                    server: server
                })
                // actualizar el state a medida que lleguen los datos
                socket.on(`updated:${server.id}`, (server)=>{
                    console.log(`Event: 'updated:${server.id}' received`)
                    this.setState({
                        server: server
                    })
                })
            },
            error: (xhr, type, err)=>{
                console.error("ajax error")
            }
        })
    }
    render(){
        if(!this.state.server){
            return <h1>loading</h1>
        }
        return(
            <div>
                <h1>this is the information of { this.state.server.name }</h1>
                {Object.getOwnPropertyNames(this.state.server.currentData).map((module)=>{
                    {if(module==='cpu'){
                        return <Cpu data={this.state.server.currentData[module]} />
                    }else if(module==='discIO'){
                        return <DiscIO data={this.state.server.currentData[module]} />
                    }else if(module==='discMounted'){
                        return <DiscMounted data={this.state.server.currentData[module]} />
                    }else if(module==='netIO'){
                        return <NetIO data={this.state.server.currentData[module]} />
                    }else if(module==='pingInternational'){
                        return <Ping data={this.state.server.currentData[module]} />
                    }else if(module==='pingNational'){
                        return <Ping data={this.state.server.currentData[module]} />
                    }else if(module==='ram'){
                        return <Ram data={this.state.server.currentData[module]} />
                    }else{
                        return <h3>{module}</h3>
                    }}
                })}
            </div>
        )
    }
}
