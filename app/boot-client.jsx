// React
import React from 'react'
import ReactDOM from 'react-dom';

// Router
import { Provider, connect } from 'react-redux'
import { Route } from 'react-router'
import { ReduxRouter } from 'redux-router'

// Dev Tools
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';

// Components
import App from './shared/components/App.jsx'
import ServersView from './shared/components/ServersView.jsx'
import ServerView from './shared/components/ServerView.jsx'

// Store
import configureStore from './shared/store/configureStore.js'
let store = configureStore({})

class Root extends React.Component {
    render() {
        // las rutas (Route) pueden tener un metodo onEnter y onLeave
        return (
            <div>
                <Provider store={store}>
                    <ReduxRouter>
                        <Route path="/" component={ App }>
                            <Route path="servers" component={ ServersView } />
                            <Route path="server/:id" component={ ServerView } />
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

//if (module.hot) {
//    console.log("IS CLIENTE!!!")
//    // Enable Webpack hot module replacement for reducers
//    module.hot.accept('./shared/reducers/combinedReducers.js', () => {
//        const nextRootReducer = require('./shared/reducers/combinedReducers.js');
//        store.replaceReducer(nextRootReducer);
//    });
//}