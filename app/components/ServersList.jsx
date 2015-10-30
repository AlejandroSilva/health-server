// React, Router
import React from 'react'
import { Link } from 'react-router'

class ServersList extends React.Component {
    render() {
        let totalUnresolved = this.props.servers.reduce((total, server)=>{
            return total+server.unresolvedIncidents
        }, 0)

        return (
            <li className="treeview active">
                <a href="#">
                    <i className="fa fa-calendar"></i> <span>Servidores</span>
                    <small className="label pull-right bg-red">{totalUnresolved}</small>
                </a>
                <ul className="treeview-menu">
                    <li key='0' ><Link to={'/servers'}>
                        <i className="fa fa-circle-o text-yellow"></i>
                        Todos
                    </Link></li>
                    {this.props.servers.map((server, index)=> {
                        return (
                            <li key={index}>
                                <Link to={`/server/${server.id}/data`}>
                                    <i className="fa fa-circle-o"></i>
                                    {server.name}
                                    {server.unresolvedIncidents?
                                        <small className="label pull-right bg-red">{server.unresolvedIncidents}</small>
                                        :
                                        null
                                    }
                                </Link>
                            </li>
                        )
                     })}
                    <li key='100' ><Link to={'/server/estaidnoexiste/data'}>
                        <i className="fa fa-circle-o"></i>
                        servidor asfasdf (no existe en BD)
                    </Link></li>

                    <li key='999' ><Link to={'/add'}>
                        <i className="fa fa-circle-o text-aqua"></i>
                        Agregar nuevo
                    </Link></li>
                </ul>
            </li>
        );
    }
}
export default ServersList