// React, Redux, Router
import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router'

// Actions
import * as ServersActions from '../actions/serversActions.js'

// Modules
import Cpu from './modules/Cpu.jsx'
import DiscIO from './modules/DiscIO.jsx'
import DiscMounted from './modules/DiscMounted.jsx'
import NetIO from './modules/NetIO.jsx'
import Ping from './modules/Ping.jsx'
import Ram from './modules/Ram.jsx'

class ServerData extends React.Component {
    render() {
        let content
        if(!this.props.theServer.name){
            content = "[servidor no existe]"

        }else if(this.props.theServer.currentData){
            content = (
                Object.getOwnPropertyNames(this.props.theServer.currentData).map((module)=> {
                    {
                        if (module === 'cpu') {
                            return <Cpu key="cpu" data={this.props.theServer.currentData[module]}/>
                        } else if (module === 'discIO') {
                            return <DiscIO key="discIO" data={this.props.theServer.currentData[module]}/>
                        } else if (module === 'discMounted') {
                            return <DiscMounted key="discMounted" data={this.props.theServer.currentData[module]}/>
                        } else if (module === 'netIO') {
                            return <NetIO key="netIO" data={this.props.theServer.currentData[module]}/>
                        } else if (module === 'pingInternational') {
                            return <Ping key="pingInternational" data={this.props.theServer.currentData[module]}/>
                        } else if (module === 'pingNational') {
                            return <Ping key="pingNational" data={this.props.theServer.currentData[module]}/>
                        } else if (module === 'ram') {
                            return <Ram key="ram" data={this.props.theServer.currentData[module]}/>
                        } else {
                            return <h3>{module}</h3>
                        }
                    }
                })
            )

        }else{
            content = <h3>Todavia no se reciben datos de este servidor</h3>
        }

        return (
            <div>
                {content}
            </div>
        )
    }
}
export default ServerData