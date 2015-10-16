// React, Redux
import React, { propTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

// Actions
import * as CounterActions from '../actions/counterActions.js'
import * as ServersActions from '../actions/serversActions.js'

// Modules
import { ServerDataAsRow } from './index.js'

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
class ServersView extends React.Component {
    render() {
        return (
            <section className="content">
                {this.props.servers.list.map((server, index)=> {
                    return <ServerDataAsRow key={index} server={server}/>
                 })}
                {this.props.children}
            </section>
        );
    }
}
ServersView.propTypes = {
    children: React.PropTypes.node
    //servers: React.PropTypes.object.isRequired
}
export default ServersView