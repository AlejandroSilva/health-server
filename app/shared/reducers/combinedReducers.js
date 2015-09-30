import { combineReducers } from 'redux'
import counterReducer from './counterReducer'
import serversReducer from './serversReducer.js'
import { routerStateReducer } from 'redux-router'

const rootReducer = combineReducers({
    counter: counterReducer,
    servers: serversReducer,
    router: routerStateReducer
});

export default rootReducer;