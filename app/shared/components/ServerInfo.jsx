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
    constructor() {
        super();
        this.state = {}
    }
    componentDidMount(){
        this.fetchData(this.props.params.serverId);
    }
    componentWillReceiveProps(nextProps){
        // quitar el listener anterior
        socket.removeListener(`updated:${this.props.params.serverId}`)
        this.fetchData(nextProps.params.serverId)
    }
    componentWillUnmount(){
        socket.removeListener(`updated:${this.props.params.serverId}`)
    }

    fetchData(serverId){
        $.ajax({
            type: 'GET',
            url: `/v1/server/${serverId}`,
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

        let content = <h1>nada</h1>

        if(!this.state.server){
            // si el ajax no se ha resuelto, no hacer nada
            content = <h3>Cargando</h3>

        }else if(!this.state.server.currentData){
            // revisar si se han recibido datos
            content = <h3>Sin datos</h3>

        }else{
            content = (
                <div>
                    {Object.getOwnPropertyNames(this.state.server.currentData).map((module)=> {
                        {
                            if (module === 'cpu') {
                                return <Cpu key="cpu" data={this.state.server.currentData[module]}/>
                            } else if (module === 'discIO') {
                                return <DiscIO key="discIO" data={this.state.server.currentData[module]}/>
                            } else if (module === 'discMounted') {
                                return <DiscMounted key="discMounted" data={this.state.server.currentData[module]}/>
                            } else if (module === 'netIO') {
                                return <NetIO key="netIO" data={this.state.server.currentData[module]}/>
                            } else if (module === 'pingInternational') {
                                return <Ping key="pingInternational" data={this.state.server.currentData[module]}/>
                            } else if (module === 'pingNational') {
                                return <Ping key="pingNational" data={this.state.server.currentData[module]}/>
                            } else if (module === 'ram') {
                                return <Ram key="ram" data={this.state.server.currentData[module]}/>
                            } else {
                                return <h3>{module}</h3>
                            }
                        }
                    })}
                </div>
            )
        }


        return(
            <div>
                <h1>Datos del servidor   asd{ this.state.server? this.state.server.name: this.props.params.serverId }</h1>
                <button>Modificar</button>
                <button>Eliminar</button>
                {content}
            </div>
        )
    }
}
