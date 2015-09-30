// React, Redux, Router
import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router'

// Actions
import * as CounterActions from '../actions/counterActions.js'
import * as ServersActions from '../actions/serversActions.js'

@connect(
    (state)=> ({
        routerState: state.router,
        servers: state.servers,
        allState: state
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
    metodo(){
        console.log("------------------------")
        console.log("App.this")
        console.log(this)
        console.log("App.props")
        console.log(this.props)
        console.log("------------------------")
        this.props.create()
    }
    render() {
        return (
            <div>
                <h1>Health server</h1>
                <div>
                    <p><Link to={'/'}>{'/'}</Link></p>
                    <p><Link to={'/servers?foo=bar'}>{'/serves?foo=bar'}</Link></p>
                    <p><Link to={'/server/3?bar=baz'}>{'/server/3?bar=baz'}</Link></p>
                    <p><Link to={'/server/123?baz=foo'}>{'/server/123?baz=foo'}</Link></p>
                </div>
                {/*<Lista servers={this.props.servers} />*/}
                <button onClick={this.metodo.bind(this)}>App.metodo</button>
                <button onClick={ this.props.create }>App.CREATE_SERVER</button>

                {this.props.children}
            </div>
        );
    }
}
export default App