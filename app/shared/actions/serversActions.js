import * as API from '../../client/v1.js'
export const CREATE_SERVER = 'CREATE_SERVER'
export const UPDATE_SERVER = 'UPDATE_SERVER'
export const REMOVE_SERVER = 'REMOVE_SERVER'
export const GETALL_SERVER = 'GETALL_SERVER'
export const SELECT_SERVER = 'SELECT_SERVER'
export const UNSELECT_SERVER = 'UNSELECT_SERVER'

export const serverUpdate = (updatedServer)=>{
    return {
        type: UPDATE_SERVER,
        updatedServer
    };
}

export const create = ()=>{
    return {
        type: CREATE_SERVER,
        nuevoServer: {

        }
    };
}

export const remove = ()=>{
    return {
        type: REMOVE_SERVER
    };
}

export const serverGetAll = (callback)=>{
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