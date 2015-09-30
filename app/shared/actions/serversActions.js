import * as API from '../../client/v1.js'
export const CREATE_SERVER = 'CREATE_SERVER';
export const UPDATE_SERVER = 'UPDATE_SERVER';
export const REMOVE_SERVER = 'REMOVE_SERVER';
export const GETALL_SERVER = 'GETALL_SERVER';

export function update(value) {
    return {
        type: UPDATE_SERVER,
        payload: value
    };
}

export function create() {
    return {
        type: CREATE_SERVER,
        nuevoServer: 99
    };
}

export function remove() {
    return {
        type: REMOVE_SERVER
    };
}

export function servers_getAll(callback){
    return (dispatch, getState)=>{
        API.server.getAll()
            .then((servers)=>{
                dispatch({
                    type: GETALL_SERVER,
                    servers: servers
                })
                callback(null)
            })
            .catch((err)=>{
                callback(err)
            })
    }

}
/*
export function incrementIfOdd() {
    return (dispatch, getState) => {
        const { counter } = getState();

        if (counter % 2 === 0) {
            return;
        }

        dispatch(increment());
    };
}

export function incrementAsync(delay = 1000) {
    return (dispatch)=>{
        setTimeout(()=>{
            dispatch(increment());
        }, delay);
    };
}
*/