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

@connect(
    (state)=> ({
        routerState: state.router,
        servers: state.servers,
    }),
    (dispatch)=>{
        // http://rackt.github.io/redux/docs/api/bindActionCreators.html
        return bindActionCreators(
            ServersActions,
            dispatch
        )
    }
)
class ServerContainer extends React.Component {
    render() {
        //console.log(this.props)
        const pathname = this.props.location.pathname
        const paths = pathname.split('/')
        const activePath = paths[paths.length-1]

        // busca el servidor con el id que nos interesa
        let theServer = this.props.servers.list.find((server)=>this.props.params.id===server.id) || {}
        let content, header
        if(!theServer.name){
            header = <h1>Error 1</h1>
            content = <h3>El servidor indicado no existe</h3>

        }else if(!theServer.currentData){
            header = <h1>
                <b>{theServer.name}</b> ({theServer.host})
                <small>{theServer.project}</small>
            </h1>
            content = <h3>Todavia no se reciben datos de este servidor</h3>

        }else {
            header = <h1>
                <b>{theServer.name}</b> ({theServer.host})
                <small>{theServer.project}</small>
            </h1>
            content = (
                this.props.children && React.cloneElement(this.props.children, {
                    theServer
                })
            )
        }

        return (
            <div>
                <section className="content">
                    <div className="row">
                        <div className="nav-tabs-custom col-12-md">
                            {header}
                            <ul className="nav nav-tabs">
                                <li className={activePath==='data'? 'active':''}>
                                    <Link to={`/server/${this.props.params.id}/data`} data-toggle="tab">
                                        Datos
                                    </Link>
                                </li>
                                <li className={activePath==='edit'? 'active':''}>
                                    <Link to={`/server/${this.props.params.id}/edit`} data-toggle="tab">
                                        Configuración
                                    </Link>
                                </li>
                                <li className={activePath==='events'? 'active':''}>
                                    <Link to={`/server/${this.props.params.id}/events`} data-toggle="tab">
                                        Eventos
                                    </Link>
                                </li>
                            </ul>

                            <div className="tab-content">
                                {content || <h3>Seleccione una opcion</h3>}
                            </div>
                        </div>

                    </div>
                </section>
            </div>
        );
    }
}
export default ServerContainer