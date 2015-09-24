import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import combinedReducer from '../reducers/combinedReducers.js';

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