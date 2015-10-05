import config from '../../../config/index.js'

// React, Redux, Router
import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router'

// Actions
import * as CounterActions from '../actions/counterActions.js'
import * as ServersActions from '../actions/serversActions.js'

// Socket IO
import io from 'socket.io-client'
let socket = io.connect(`http://localhost:${config.app.port}`)

// Components
import ServersList from './ServersList.jsx'

@connect(
    (state)=> ({
        routerState: state.router,
        servers: state.servers,
    }),
    (dispatch)=>{
        // http://rackt.github.io/redux/docs/api/bindActionCreators.html
        return bindActionCreators(
            //CounterActions: CounterActions,
            //ServersActions: ServersActions
            Object.assign({}, CounterActions, ServersActions),
            dispatch
        )
    }
)
class App extends React.Component {
    static propTypes = {
        children: React.PropTypes.node,
        servers: React.PropTypes.object,
    }
    componentDidMount(){
        // Obtener la lista de servidores
        this.props.serverGetAll(()=>{})
        // realizar la conexion por sockets para recibir los cambios
        socket.on('serverCreated', (server)=>{
            console.log("created:", server)
        })
        socket.on('serverUpdated', (server)=>{
            this.props.serverUpdate(server)
            //console.log("from socket: ", server.updatedAt)
        })
        socket.on('serverDeleted', (server)=>{
            console.log("deleted: ", server)
        })
    }
    metodo(){
        console.log("------------------------")
        console.log("App.this")
        console.log(this)
        console.log("App.props")
        console.log(this.props)
        console.log("------------------------")
    }
    render() {
        return (
                <div>
                    {/* Cabecera de la pagina */}
                    <header className="main-header">
                        <a href="index2.html" className="logo">
                            <span className="logo-mini"><b>T</b>H</span>
                            <span className="logo-lg"><b>Toth</b>Health <small>v0.1</small></span>
                        </a>

                        <nav className="navbar navbar-static-top" role="navigation">
                            <a href="#" className="sidebar-toggle" data-toggle="offcanvas" role="button">
                                <span className="sr-only">Toggle navigation</span>
                            </a>
                            <div className="navbar-custom-menu">
                                <ul className="nav navbar-nav">
                                    <li className="dropdown messages-menu">
                                        <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                                            <i className="fa fa-envelope-o"></i>
                                            <span className="label label-success">4</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </nav>
                    </header>

                    {/* Menu de navegacion lateral */}
                    <aside className="main-sidebar">
                        <section className="sidebar">
                            <ul className="sidebar-menu">

                                <li className="header">SERVIDORES</li>

                                <li className="treeview active">
                                    <a href="#">
                                        <i className="fa fa-calendar"></i> <span>Menu</span>
                                        <small className="label pull-right bg-red">3</small>
                                    </a>
                                    <ul className="treeview-menu">
                                        <li><a href="#">item1</a></li>
                                        <li><a href="#">item2</a></li>
                                    </ul>
                                </li>

                                <ServersList className="treeview active" servers={this.props.servers.list}/>

                                <button type="button" className="btn btn-info">Action</button>
                                <i className="fa fa-cogs">XXX</i>

                            </ul>
                            {/*<button onClick={this.metodo.bind(this)}>App.metodo</button>*/}
                            <button onClick={ this.props.create }>App.CREATE_SERVER</button>
                        </section>
                    </aside>

                    {/* Cuerpo de la pagina */}
                    <div className="content-wrapper" style={{minHeight: 901+'px', maxWidth: 800+'px'}}>
                        {this.props.children || "Seleccione un servidor desde el menu lateral"}
                    </div>
                </div>
        );
    }
}

export default App