import React, { PropTypes } from 'react'
import moment from 'moment'
// Components
import Alert from './Alert.jsx'

class Incident extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            error: null
        }
    }
    resolveIncident(){
        this.props.resolveIncident(this.props.data.id)
        .then(updatedIncident=>{
            this.setState({error: null})
        })
        .catch(err=>{
            this.setState({error: err.message})
        })
    }
    loadEvents(){
        this.props.loadEvents(this.props.data.id)
    }
    render(){
        let data = this.props.data
        let badgeSpan
        if(data.resolved==true){
            badgeSpan = <span className="label label-success" style={{paddingTop:0, paddingBottom:0}}>Resuelto</span>
        }else{
            badgeSpan = <span className="label label-danger" style={{paddingTop:0, paddingBottom:0}}>No resuelto</span>
        }

        // Si tiene eventos cargados, mostrarlos, si no, mostrar el boton para hacerlo
        let boxBody
        if(data.events.length===0){
            boxBody = (
                <button type="button" className="btn btn-primary btn-sm" onClick={this.loadEvents.bind(this)}>
                    Cargar eventos
                </button>
            )
        }else{
            boxBody = <table className="table table-condensed">
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
        }

        return(
            <div className="box box-solid">
                <div className="box-header with-border" style={{paddingBottom:0}}>
                    <h3>{badgeSpan} {data.title}   <small>creado {moment(data.createdAt).locale('es').fromNow()}</small>
                        <span className="pull-right">
                            {data.resolved?
                                <button className="btn btn-default btn-sm" disabled>
                                    Resuelto
                                </button>
                                :
                                <button className="btn btn-success btn-sm"
                                        onClick={this.resolveIncident.bind(this)}>
                                    Resolver
                                </button>
                            }
                        </span>
                    </h3>
                    {this.state.error?
                        <Alert title="Error al resolver el Incidente" message={this.state.error} show={this.state.error}/>
                        :
                        null
                    }
                </div>
                <div className="box-body">
                    {boxBody}
                </div>
            </div>
        )
    }
}
Incident.propTypes = {
    data: PropTypes.shape({
        component: PropTypes.string.isRequired,
        createdAt: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
        idServer: PropTypes.string.isRequired,
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
    resolveIncident: PropTypes.func.isRequired,
    loadEvents: PropTypes.func.isRequired
}
export default Incident
