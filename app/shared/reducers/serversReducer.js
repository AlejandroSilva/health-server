import * as serverAction from '../actions/serversActions.js';
import Immutable from 'immutable'

// El reducer recibe el estado anterior/actual, y la ACCION que fue lanzada con DISPATCH, retorna un nuevo STATE
export default function counter(state={}, action={}) {
    switch (action.type) {
        case serverAction.CREATE_SERVER:
            let list = Immutable.fromJS(state.list)
            return Immutable
                .fromJS(state)
                .set('list', list.push(33))
                .toJS()

        case serverAction.UPDATE_SERVER:
            return state + 2

        case serverAction.REMOVE_SERVER:
            return state - 1

        case serverAction.GETALL_SERVER:
            // reemplazar la lista de servidores
            return Immutable
                .fromJS(state)
                .set('list', action.servers)
                .toJS()

        default:
            return state;
    }
}