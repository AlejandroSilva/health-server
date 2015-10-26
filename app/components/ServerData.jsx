// React, Redux, Router
import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router'

// Actions
import * as ServersActions from '../actions/serversActions.js'

// Modules
// Modules
import {
    CPU,
    DiscIO,
    DiscMounted,
    NetIO,
    Ping,
    Memory
} from './modules/index.js'

class ServerData extends React.Component {
    render() {
        const currentData = this.props.theServer.currentData
        let content
        if(!this.props.theServer.name){
            content = "[servidor no existe]"

        }else if(this.props.theServer.currentData){
            content = (
                Object.getOwnPropertyNames(currentData).map((module)=> {
                    {
                        if (module === 'cpu') {
                            return <CPU key="cpu" data={currentData[module]}/>
                        } else if (module === 'discIO') {
                            return <DiscIO key="discIO" data={currentData[module]}/>
                        } else if (module === 'discMounted') {
                            return <DiscMounted key="discMounted" data={currentData[module]}/>
                        } else if (module === 'netIO') {
                            return <NetIO key="netIO" data={currentData[module]}/>
                        } else if (module === 'pingInternational') {
                            return <Ping key="pingInternational" data={currentData[module]}/>
                        } else if (module === 'pingNational') {
                            return <Ping key="pingNational" data={currentData[module]}/>
                        } else if (module === 'ram') {
                            return <Memory key="ram" data={currentData[module]}/>
                        } else {
                            return <h3 key='otherModule'>{module}</h3>
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
//ServerData.propTypes = {
//    theServer: PropTypes.object.isRequired
//}
export default ServerData