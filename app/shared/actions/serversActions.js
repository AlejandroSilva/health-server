import * as API from '../../client/v1.js'
export const CREATE_SERVER = 'CREATE_SERVER'
export const UPDATE_SERVER = 'UPDATE_SERVER'
export const UPDATE_SERVER_DATA = 'UPDATE_SERVER_DATA'
export const REMOVE_SERVER = 'REMOVE_SERVER'
export const GETALL_SERVER = 'GETALL_SERVER'

export const serverUpdateData = (newData)=>{
    return {
        type: UPDATE_SERVER_DATA,
        newData
    };
}

export const create = ()=>{
    return {
        type: CREATE_SERVER,
        nuevoServer: {

        }
    };
}

export const serverUpdate = (updatedServer, callback)=>{
    return (dispatch, getState)=>{
        API.server.update(updatedServer)
            .then((newServerData)=>{
                callback(null, newServerData)
                dispatch({
                    type: UPDATE_SERVER,
                    updatedServer
                })
            })
            .catch(callback)
    }
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
            .catch(callback)
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