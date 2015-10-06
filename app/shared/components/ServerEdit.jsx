// React, Redux, Router
import React, { PropTypes} from 'react'
import { Link } from 'react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

// Actions
import * as ServersActions from '../actions/serversActions.js'

// Components
import { Alert } from './index.js'

@connect(
    (state)=> ({
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
class ServerEdit extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            error: '',
            server: {
                id: this.props.theServer.id,
                name: this.props.theServer.name,
                host: this.props.theServer.host,
                port: this.props.theServer.port,
                project: this.props.theServer.project
            }
        }
    }
    handleChange(element, e){
        let server = this.state.server
        server[element] = e.target.value
        this.setState({
            error: '',
            server: server
        })
    }
    editForm(evt){
        evt.preventDefault()
        this.props.serverUpdate(this.state.server, (err, newData)=>{
            this.setState({
                error: err? err.data.error : ''
            })
        })
    }
    render() {
        return (
            <div className="box box-info">
                <div className="box-header with-border">
                    <h3 className="box-title">Actualizar datos del servidor</h3>
                </div>
                <form className="form-horizontal" onSubmit={this.editForm.bind(this)}>
                    <div className="box-body">
                        <div className="form-group">
                            <label htmlFor="inputEmail3" className="col-sm-2 control-label">ID</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control"
                                       value={this.state.server.id}
                                       disabled/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="inputPassword3" className="col-sm-2 control-label">Nombre</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control"
                                       defaultValue={this.state.server.name}
                                       onChange={this.handleChange.bind(this, 'name')}
                                       required placeholder="Nombre. Ej. CAO Biopacs"
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="inputPassword3" className="col-sm-2 control-label">Host</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control"
                                       defaultValue={this.state.server.host}
                                       onChange={this.handleChange.bind(this, 'host')}
                                       required placeholder="Host. Ej. cao.biopacs.com"
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="inputPassword3" className="col-sm-2 control-label">Port</label>
                            <div className="col-sm-10">
                                <input type="number" className="form-control"
                                       defaultValue={this.state.server.port}
                                       onChange={this.handleChange.bind(this, 'port')}
                                       min="0" max="9999" required placeholder="Port. Ej. 8081"
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="inputPassword3" className="col-sm-2 control-label">Proyecto</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control"
                                       defaultValue={this.state.server.project}
                                       onChange={this.handleChange.bind(this, 'project')}
                                       required placeholder="Proyecto. Ej. Clinica Alemana Osorno"
                                />
                            </div>
                        </div>
                        <div className="col-sm-offset-2 col-sm-10">
                            <Alert title="Ocurrio un problema" message={this.state.error} show={this.state.error!==''}/>
                        </div>
                    </div>

                    <div className="box-footer">
                        <button type="submit" className="btn btn-info pull-right">Actualizar</button>
                    </div>
                </form>
            </div>
        )
    }
}
//ServerEdit.propTypes = {
//    theServer: PropTypes.object.isRequired
//}
export default ServerEdit