// fetch remote data
import axios from 'axios';
// Models
import { Server, Data, Incident } from '../db/index.js'

function fetchData(server){
    return new Promise((resolve, reject)=>{
        axios.get(`http://${server.host}:${server.port}/v1`, {timeout: 15000})
            .then((response)=> {
                if(response.status===200){
                    // resolve solo permite 1 argumento, entonces lo agrupamos
                    resolve([server, response.data]);
                }else{
                    // el servidor respondio, pero no un 'OK'
                    reject({
                        title: 'respuesta inesperada',
                        message: `Peticion correcta, pero '${server.name}' (${server.host}:${server.port}) respondio: ${response.status}`,
                        component: 'CLIENT',
                        extra: {
                            status: response.status,
                            data: response.data
                        }
                    });
                }
            })
            .catch((response)=>{
                let errorMessage
                if(response instanceof Error){
                    errorMessage = response.message
                }else{
                    errorMessage = `statusCode=${response.status}`
                }
                // request no pudo hacer una peticion al servidor
                reject({
                    title: 'Error de conexion',
                    message: `No se pueden obtener datos de '${server.name}' (${server.host}:${server.port}): ${errorMessage}`,
                    component: 'CLIENT',
                    extra: {
                        errorMessage
                    }
                });
            })
    })
}

function updateServer([server, serverData]){
    return new Promise((resolve, reject)=>{
        // se debe volver a recuperar los datos del server antes de actualizarlo, para evitar 'race conditions'
        Server.get(server.id).run()
            .then(server=>{
                server.currentData = serverData;
                server.save();
                resolve([server, serverData])
            })
            .catch(reject)
    });
}

function saveData([server, serverData]){
    // ES6 deconstructing (https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Operadores/Destructuring_assignment)
    // let server = server_serverData[0]; let serverData=server_serverData[1];
    // let [server, serverData] = server_serverData;
    return new Promise((resolve, reject)=>{
        // arreglo con las promesas, de los intentos para guardar datos
        let componentPromises = [];
        for(let component in serverData){
            // se guardan individualmente cada uno de los campos de la respuesta
            let componentData = serverData[component];
            let data = new Data({
                idServer: server.id,    // referencia al modelo Server
                component: component,
                content: componentData
            });
            // guardamos la promesa
            //let saveDataPromise = data.saveAll({server: false});
            let saveDataPromise = data.save({server: true});
            componentPromises.push(saveDataPromise);
        }
        // esperamos a que se completen todas bien
        Promise.all(componentPromises)
            .then((savedData)=>{
                resolve([server, savedData]);
            })
            .catch((err)=> {
                reject({
                    title: 'Error guardando datos',
                    message: `No se pueden guardar datos de '${server.name}' (${server.host}): ${err.message}`,
                    component: 'DB',
                    extra: {
                        error: err.message
                    }
                });
            })
    });
}

function checkForAlerts([server, savedData]){
    return new Promise((resolve, reject)=>{
        //console.log('se revisaron las alertas....')
        resolve(savedData);
    })
}

export default function(){
    Server.run()
        .then((servers)=>{
            console.log(`[Job] Buscando la informacion de ${servers.length} servidores`);
            servers.forEach((server)=>{

                // buscamos la informacion de cada uno de los servidores
                fetchData(server)
                // actualizamos el modelo
                .then(updateServer) // updateServer(server_serverData)
                // guardar los datos recuperados
                .then(saveData)     // saveData(server_serverData)
                // revisar si los datos generan alguna alerta
                .then(checkForAlerts)
                // terminamos mostrando los datos
                .then((savedData)=>{
                    console.log(`[Job] Datos de '${server.name}' (${server.host}:${server.port}) guardados correctamente`);
                })
                .catch((errorEvent)=>{
                    if(errorEvent instanceof Object){
                        console.log(`[Incident] ${errorEvent.message}`);

                        Incident.createOrAppendEvent({
                            idServer: server.id,
                            title: errorEvent.title,
                            component: errorEvent.component,
                            message: errorEvent.message,
                            extra: errorEvent.extra
                        })

                    }else{
                        console.log('[Incident] error no capturado: errorEvent');

                        //let incident = new Event({
                        //    idServer: server.id,
                        //    title: 'errorEvent',
                        //    component: 'NOT_HANDLED',
                        //    events: [{
                        //        message: errorEvent.message,
                        //        extra:{
                        //            error: errorEvent
                        //        }
                        //    }]
                        //})
                        //incident.save(({server: true}))
                    }
                })
            })
        })
        .catch((err)=>{
            console.log(`[Job] Error al obtener la lista de servidores: ${err.message}`);
        })
}