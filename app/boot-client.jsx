// React
import React from 'react'
import ReactDOM from 'react-dom';

// Router
import { Provider, connect } from 'react-redux'
import { Route, IndexRoute, Redirect } from 'react-router'
import { ReduxRouter } from 'redux-router'

// Dev Tools
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';

// Components
import {
    App,
    ServersView,
    ServerContainer,
    ServerData,
    ServerEdit,
    ServerEvents,
    NotFound
} from './shared/components/index.js'

// Store
import configureStore from './shared/store/configureStore.js'
let store = configureStore({})

class Root extends React.Component {
    //selectServer(nextState, transition, callback){
    //    console.log("selected new server")
    //    let paramId = nextState.params.id
    //    store.dispatch({
    //        type: "SELECT_SERVER",
    //        serverID: paramId
    //    })
    //    //console.log({nextState,transition,callback})
    //    //console.log(paramId)
    //    //console.log(store.getState().servers.list)
    //}
    render() {
        // las rutas (Route) pueden tener un metodo onEnter y onLeave
        return (
            <div>
                <Provider store={store}>
                    <ReduxRouter>
                        <Route path="/" component={ App }>
                            <Route path="servers" component={ ServersView } />
                            <Route path="server/:id" component={ ServerContainer }>
                                {/*<IndexRoute component={ ServerData }/>*/}

                                <Route path="data"   component={ ServerData } />
                                <Route path="edit"   component={ ServerEdit } />
                                <Route path="events" component={ ServerEvents }/>
                            </Route>
                            <Route path="*" component={ NotFound }></Route>
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