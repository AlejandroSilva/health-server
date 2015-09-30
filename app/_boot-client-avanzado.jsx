import React from 'react'
import ReactDOM from 'react-dom';
import { compose, createStore, applyMiddleware, bindActionCreators } from 'redux';
import { Provider, connect } from 'react-redux'
import { Route, Link } from 'react-router'
import { ReduxRouter, routerStateReducer, reduxReactRouter } from 'redux-router'
import Immutable from 'immutable'

//## ACTIONS
import * as CounterActions from './shared/actions/counterActions.js'
import * as ServersActions from './shared/actions/serversActions.js'
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
                <h1>App Container</h1>
                <div>
                    <p><Link to={'/'}>{'/'}</Link></p>
                    <p><Link to={'/parent?foo=bar'}>{'/parent?foo=bar'}</Link></p>
                    <p><Link to={'/parent/child?bar=baz'}>{'/parent/child?bar=baz'}</Link></p>
                    <p><Link to={'/parent/child/123?baz=foo'}>{'/parent/child/123?baz=foo'}</Link></p>
                </div>
                <Lista servers={this.props.servers} />
                <button onClick={this.metodo.bind(this)}>App.metodo</button>
                <button onClick={ this.props.create }>App.CREATE_SERVER</button>

                {this.props.children}
            </div>
        );
    }
}
class Lista extends React.Component {
    render() {
        return (
            <div>
                <h4>Server list</h4>
                {this.props.servers.list.map((server, index)=> {
                    return <p key={index}>{server.host}</p>
                })}
            </div>
        );
    }
}

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
class Parent extends React.Component {
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
                <h2>Parent</h2>
                <h4>Server list</h4>
                {/*servers.list.map((server, index)=> {
                    return <p key={index}><b>{server}</b></p>
                })*/}
                <button onClick={this.metodo.bind(this)}>Parent.metodo</button>
                {this.props.children}
            </div>
        );
    }
}
class Child extends React.Component {
    render() {
        return (
            <div>
                <h2>Child</h2>
            </div>
        );
    }
}

import { devTools, persistState } from 'redux-devtools';
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';
// ##  Store
// entrega los valores iniciales a la store (store tiene varios reducers asociados)
// const initialState = window.__INITIAL_STATE__ || 666
// const store = configureStore(initialState)
import createHistory from 'history/lib/createBrowserHistory';
import combinedReducer from './shared/reducers/combinedReducers.js';
import thunk from 'redux-thunk';
let store = compose(
    applyMiddleware(thunk),
    reduxReactRouter({
        createHistory
    }),
    devTools()
)(createStore)(combinedReducer, {
    counter: 33,
    servers: {
        //list: [33, 23, 43, 53, 64]
        list: []
    }
})

//if (module.hot) {
//    console.log("IS CLIENTE!!!")
//    // Enable Webpack hot module replacement for reducers
//    module.hot.accept('./shared/reducers/combinedReducers.js', () => {
//        const nextRootReducer = require('./shared/reducers/combinedReducers.js');
//        store.replaceReducer(nextRootReducer);
//    });
//}
function entrarAHijos(){
    console.log("entrando a hijos")
}

class Root extends React.Component {
    render() {
        // las rutas (Route) pueden tener un metodo onEnter y onLeave
        return (
            <div>
                <Provider store={store}>
                    <ReduxRouter>
                        <Route path="/" component={App}>
                            <Route path="parent" component={Parent} onEnter={entrarAHijos}>
                                <Route path="child" component={ Child } />
                                <Route path="child/:id" component={ Child } />
                            </Route>
                        </Route>
                    </ReduxRouter>
                </Provider>
                <DebugPanel top right bottom>
                    <DevTools store={store} monitor={LogMonitor} />
                </DebugPanel>
            </div>
        );
    }
}

ReactDOM.render(
    <Root />,
    document.getElementById('appRoot')
);