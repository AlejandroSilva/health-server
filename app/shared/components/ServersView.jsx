// React, Redux
import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

// Actions
import * as CounterActions from '../actions/counterActions.js'
import * as ServersActions from '../actions/serversActions.js'

@connect(
        state => ({
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
class ServersView extends React.Component {
    static propTypes = {
        children: React.PropTypes.node,
        servers: React.PropTypes.object
    }
    metodo(){
        let { servers_getAll } = this.props
        // lanza un action asincrono, tiene un callback para cambiar el estado de este componente
        servers_getAll((err)=>{
            if(err){
                console.log("error con los serves:", err)
            }else{
                console.log("peticion correcta")
            }
        })
    }
    render() {
        //let { store } = this.context
        //let servers = store.getState().servers

        return (
            <div>
                <h2>Servers view</h2>
                {/*servers.list.map((server, index)=> {
                 return <p key={index}><b>{server}</b></p>
                 })*/}
                <button onClick={this.metodo.bind(this)}>ServersView.metodo</button>
                {this.props.children}
            </div>
        );
    }
}
export default ServersView