import * as serverAction from '../actions/serversActions.js';
import Immutable from 'immutable'

let defaultState = {
    list: []
}

// El reducer recibe el estado anterior/actual, y la ACCION que fue lanzada con DISPATCH, retorna un nuevo STATE
export let serversReducer = (state=defaultState, action={})=>{
    switch (action.type) {
        case serverAction.CREATE_SERVER:
            let list__create = Immutable.fromJS(state.list)
            return Immutable
                .fromJS(state)
                .set('list', list__create.push(33))
                .toJS()
        break

        case serverAction.UPDATE_SERVER:
            let list_update_server = state.list.map((server)=>{
                if(server.id===action.updatedServer.id){
                    return action.updatedServer
                }else{
                    return server
                }
            })
            return Object.assign({}, state, {
                list: list_update_server
            })
        break;

        case serverAction.UPDATE_SERVER_DATA:
            // buscar el servidor y reemplazar sus datos
            let list__update_server_data = state.list.map((server)=>{
                if(server.id===action.newData.id){
                    return action.newData
                }else{
                    return server
                }
            })
            return Object.assign({}, state, {
                list: list__update_server_data
            })
        break

        case serverAction.REMOVE_SERVER:
            return state - 1
        break

        case serverAction.GETALL_SERVER:
            return Object.assign({}, state, {
                list: action.servers
            })
        break

        //case serverAction.SELECT_SERVER:
            // buscar si existe informacion del servidor
            //let selectedData__select = state.list.find((server)=> server.id===action.serverID)

            //return Immutable
            //    .fromJS(state)
            //    .set('selectedID', action.serverID)
            //    .set('selectedData', Immutable.fromJS(selectedData__select || {}) )
            //    .toJS()
        //break

        //case serverAction.UNSELECT_SERVER:
        //    return Immutable
        //        .fromJS(state)
        //        .set('selectedID','')
        //        .set('selectedData', {})
        //        .toJS()
        //break

        default:
            return state;
    }
}

export let serversDefaultState = defaultState