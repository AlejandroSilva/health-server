// React, Redux, Router
import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

// Actions
import * as ServersActions from '../actions/serversActions.js'
// API V1
import * as API from '../apiClient/v1.js'
// Components
import { Incident } from './ui'

@connect(
    (state)=> ({
        servers: state.servers
    }),
    (dispatch)=>{
        // http://rackt.github.io/redux/docs/api/bindActionCreators.html
        return bindActionCreators(
            ServersActions,
            dispatch
        )
    }
)
class ServerEvents extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            loading: true,
            incidents: []
        }
    }
    componentDidMount(){
        API.server.incidents(this.props.theServer.id)
        .then(incidents=>{
            this.setState({
                incidents,
                loading: false
            })
        })
        .catch(err=>console.log(err))
    }
    resolveIncident(incidentId){
        // se retorna la promsea, para que Incident.jsx sepa como termino
        let resolvePromise = API.incident.resolve(incidentId)
        resolvePromise
            .then(updatedIncident=>{
                this.setState({
                    incidents: this.state.incidents.map(incident=>incident.id===updatedIncident.id? updatedIncident:incident)
                })
            })
            //.catch(err=>console.log(err))
        return resolvePromise
    }
    loadEvents(incidentId){
        // se retorna la promsea, para que Incident.jsx sepa como termino
        API.incident.get(incidentId)
            .then(updatedIncident=>{
                this.setState({
                    incidents: this.state.incidents.map(incident=>incident.id===updatedIncident.id? updatedIncident:incident)
                })
            })
            .catch(err=>console.log(err))
    }
    render() {
        if(this.state.loading){
            return (
                <h1>Cargando...</h1>
            )

        } else if(this.state.incidents.length===0) {
            return (
                <h1>Sin incidentes registrados</h1>
            )

        }else{
            return (
                <div>
                    {this.state.incidents.map((incident, index)=>
                        <div className="row" key={index}>
                            <div className="col-md-12">
                                <Incident
                                    data={incident}
                                    resolveIncident={this.resolveIncident.bind(this)}
                                    loadEvents={this.loadEvents.bind(this)}
                                />
                            </div>
                        </div>
                    )}
                </div>
            )
        }
    }
}
//ServerEvents.propTypes = {
//    theServer: PropTypes.object.isRequired
//}
export default ServerEvents