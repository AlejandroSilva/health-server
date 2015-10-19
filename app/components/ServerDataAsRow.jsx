// React, Redux, Router
import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router'

// Modules
import {
    CPU,
    DICOM,
    DiscIO,
    DiscMounted,
    NetIO,
    Ping,
    Memory
} from './modules/index.js'

class ServerDataAsRow extends React.Component {
    render() {
        if(!this.props.server.name) {
            return (
                <div className="row">
                    <h3>servidor no existe</h3>
                </div>
            )
        }
        const currentData = this.props.server.currentData
        if(!currentData){
            return (
                <div className="row">
                    <h3>Todavia no se reciben datos de este servidor</h3>
                </div>
            )
        }

        return (
            <div className="row">
                <div className="col-md-3">
                    <DiscMounted data={currentData.discMounted} isRow={true} boxHeader={this.props.server.name}/>
                </div>
                <div className="col-md-3">
                    <Ping data={currentData.pingNational} isRow={true} title='Nacional'/>
                    <Ping data={currentData.pingInternational} isRow={true} title='Internacional'/>
                </div>
                <div className="col-md-3">
                    <Memory data={currentData.mem} isRow={true}/>
                    <CPU data={currentData.cpu} isRow={true}/>
                </div>
                <div className="col-md-3">
                    <DICOM data={{}} isRow={true}/>
                    <NetIO data={currentData.netIO} isRow={true}/>
                    <p>DISC IO?</p>
                </div>
            </div>
        )
    }
}
ServerDataAsRow.propTypes = {
    server: PropTypes.object.isRequired
}
export default ServerDataAsRow