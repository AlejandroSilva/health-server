import * as serverAction from '../actions/serversActions.js';

// El reducer recibe el estado anterior/actual, y la ACCION que fue lanzada con DISPATCH, retorna un nuevo STATE
export default function counter(state = 0, action) {
    switch (action.type) {
        case serverAction.CREATE_SERVER:
            return action.payload

        case serverAction.UPDATE_SERVER:
            return state + 2

        case serverAction.REMOVE_SERVER:
            return state - 1

        default:
            return state;
    }
}