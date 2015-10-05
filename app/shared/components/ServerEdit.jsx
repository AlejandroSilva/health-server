// React, Redux, Router
import React from 'react'
import { Link } from 'react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

// Actions
import * as ServersActions from '../actions/serversActions.js'

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
    render() {
        return (
            <p>editar un server</p>
        )
    }
}
export default ServerEdit