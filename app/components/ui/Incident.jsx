import React, { PropTypes } from 'react'
import moment from 'moment'

class Incident extends React.Component {
    render(){
        let data = this.props.data
        let badgeSpan
        if(data.resolved==true){
            badgeSpan = <span className="label label-success" style={{paddingTop:0, paddingBottom:0}}>Resuelto</span>
        }else{
            badgeSpan = <span className="label label-danger" style={{paddingTop:0, paddingBottom:0}}>No resuelto</span>
        }

        return(
            <div className="box box-solid">
                <div className="box-header with-border">
                    <h3>{badgeSpan} {data.title}   <small>creado {moment(data.createdAt).locale('es').fromNow()}</small>
                        <span className="pull-right">
                            {data.resolved?
                                <button className="btn btn-default" disabled>
                                    Resuelto
                                </button>
                                :
                                <button className="btn btn-success"
                                        onClick={()=>this.props.resolveIncident(this.props.data.id)}>
                                    Resolver
                                </button>
                            }
                        </span>
                    </h3>
                </div>
                <div className="box-body">
                    <table className="table table-condensed">
                        <thead>
                            <tr>
                                <th>Fecha/Hora</th>
                                <th>Descripcion del evento</th>
                            </tr>
                        </thead>
                        <tbody>
                        {data.events.map((event, index)=>
                                <tr key={index}>
                                    <td>{moment(event.timestamp).locale('es').fromNow()}</td>
                                    <td>{event.message}</td>
                                </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}
Incident.propTypes = {
    data: PropTypes.shape({
        component: PropTypes.string.isRequired,
        createdAt: PropTypes.string.isRequired,
        id: PropTypes.string,
        idServer: PropTypes.string,
        resolved: PropTypes.bool.isRequired,
        title: PropTypes.string.isRequired,
        events: PropTypes.arrayOf(
            PropTypes.shape({
                message: PropTypes.string,
                timestamp: PropTypes.string,
                extra: PropTypes.object
            })
        )
    }).isRequired,
    resolveIncident: PropTypes.func.isRequired
}
export default Incident
