/*
 * por el momento este codigo no es necesario, el render se esta haciendo solo en el lado del cliente.
 * Se va a utilizar cuando se convierta el codigo a "universal javascript".
 *

import { compose, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { ReduxRouter, routerStateReducer, reduxReactRouter } from 'redux-router'
import combinedReducer from '../reducers/combinedReducers.js';
import createHistory from 'history/lib/createBrowserHistory';

// Middleware: "For example, redux-thunk lets the action creators invert control by dispatching functions.
// They would receive dispatch as an argument and may call it asynchronously.
// Such functions are called thunks.
const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

export default function configureStore(initialState) {
    const store = createStoreWithMiddleware(combinedReducer, initialState);

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('../reducers/combinedReducers.js', () => {
            const nextRootReducer = require('../reducers/combinedReducers.js');
            store.replaceReducer(nextRootReducer);
        });
    }

    // entrega un store, con todos los reducers combinados, y un middleware para realiazar acciones asincronas
    return store;
}
*/

// ##  Store
// entrega los valores iniciales a la store (store tiene varios reducers asociados)
// const initialState = window.__INITIAL_STATE__ || 666
// const store = configureStore(initialState)

// Redux
import { compose, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';

// Redux devTools
import { devTools } from 'redux-devtools'

// Router
import { ReduxRouter, reduxReactRouter } from 'redux-router'
import createHistory from 'history/lib/createBrowserHistory'

// Reducers
import { combinedReducers, combinedInitialStates } from '../reducers/combinedReducers.js'

export default function configureStore(initialState){
    let store = compose(
        applyMiddleware(thunk),
        reduxReactRouter({
            createHistory
        }),
        // Todo: Only on development
        devTools()
    )(createStore)(combinedReducers, combinedInitialStates)

    if (module.hot) {
        console.log("actualizando reducer")
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('../reducers/combinedReducers.js', () => {
            const nextRootReducer = require('../reducers/combinedReducers.js').combinedReducers;
            store.replaceReducer(nextRootReducer);
        });
    }

    return store
}
