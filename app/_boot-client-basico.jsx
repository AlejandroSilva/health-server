/*
 * Ejemplo de integracion de react + redux + react-router
 * https://github.com/rackt/redux-router/tree/master/examples/basic
 */
import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createStore, compose, combineReducers } from 'redux';

import {
    ReduxRouter,
    routerStateReducer,
    reduxReactRouter
} from 'redux-router';

import { Route, Link } from 'react-router';
import { Provider, connect } from 'react-redux';
import { devTools } from 'redux-devtools';
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';
import createHistory from 'history/lib/createBrowserHistory';

@connect(state => ({ routerState: state.router }))
class App extends Component {
    static propTypes = {
        children: PropTypes.node
    }

    render() {
        return (
            <div>
                <h1>App Container 2 </h1>
                <p><Link to={'/'}>{'/'}</Link></p>
                <p><Link to={'/parent?foo=bar'}>{'/parent?foo=bar'}</Link></p>
                <p><Link to={'/parent/child?bar=baz'}>{'/parent/child?bar=baz'}</Link></p>
                <p><Link to={'/parent/child/123?baz=foo'}>{'/parent/child/123?baz=foo'}</Link></p>
                {this.props.children}
            </div>
        );
    }
}

class Parent extends Component {
    static propTypes = {
        children: PropTypes.node
    }

    render() {
        return (
            <div>
                <h2>Parent</h2>
                {this.props.children}
            </div>
        );
    }
}

class Child extends Component {
    render() {
        return (
            <div>
                <h2>Child asd</h2>
            </div>
        );
    }
}

const reducer = combineReducers({
    router: routerStateReducer
});

const store = compose(
    reduxReactRouter({ createHistory }),
    devTools()
)(createStore)(reducer);

class Root extends Component {
    render() {
        return (
            <div>
                <Provider store={store}>
                    <ReduxRouter>
                        <Route path="/" component={App}>
                            <Route path="parent" component={Parent}>
                                <Route path="child" component={Child} />
                                <Route path="child/:id" component={Child} />
                            </Route>
                        </Route>
                    </ReduxRouter>
                </Provider>
                {/*
                <DebugPanel top right bottom>
                    <DevTools store={store} monitor={LogMonitor} />
                </DebugPanel>
                 */}
            </div>
        );
    }
}

ReactDOM.render(<Root />, document.getElementById('appRoot'));
