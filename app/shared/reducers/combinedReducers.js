import { combineReducers } from 'redux'
import counterReducer from './counterReducer'
import { serversReducer, serversDefaultState } from './serversReducer.js'
import { routerStateReducer } from 'redux-router'

const rootReducer = combineReducers({
    counter: counterReducer,
    servers: serversReducer,
    router: routerStateReducer
});

const rootStates = {
    counter: 33,
    servers: serversDefaultState
}

export let combinedReducers = rootReducer
export let combinedInitialStates = rootStates