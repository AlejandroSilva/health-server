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
            let state__update = Immutable.fromJS(state)
            // buscar el servidor y reemplazar sus datos
            let list__update = state.list.map((server)=>{
                if(server.id===action.updatedServer.id){
                    return action.updatedServer
                }else{
                    return server
                }
            })
            state__update = state__update.set('list', list__update)
            // si el servidor es tambien el selected, tambien actualizar sus datos
            //if(state.selectedID===action.updatedServer.id){
            //    state__update = state__update.set('selectedData', Immutable.fromJS(action.updatedServer))
            //}
            return state__update.toJS()
        break

        case serverAction.REMOVE_SERVER:
            return state - 1
        break

        case serverAction.GETALL_SERVER:
            // actualizar los datos del "selected server"
            //let selectedData__getAll = action.servers.find((server)=> server.id===state.selectedID)

            return Immutable
                .fromJS(state)
                .set('list', Immutable.fromJS(action.servers))
                //.set('selectedData', Immutable.fromJS(selectedData__getAll || {}))
                .toJS()
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