import { combineReducers } from 'redux'
import counterReducer from './counterReducer'
import serversReducer from './serversReducer.js'

const rootReducer = combineReducers({
    counter: counterReducer,
    servers: serversReducer
});

export default rootReducer;