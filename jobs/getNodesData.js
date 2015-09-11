import request from 'request';
import Server from '../db/Server.js';
import Data from '../db/Data.js';

function fetchData(server){
    return new Promise((resolve, reject)=>{
        request(`http://${server.host}:${server.port}/v1/info`, {timeout: 15000}, function (err, res, body) {
            if(err){
                // request no pudo hacer una peticion al servidor
                reject(`Error al obtener datos de '${server.name}' (${server.host}:${server.port}): ${err.code}`);
            }else{
                if(res.statusCode===200){
                    try{
                        let serverData = JSON.parse(body);
                        // resolve solo permite 1 argumento, entonces lo agrupamos
                        resolve([server, serverData]);
                    }catch(err){
                        reject(`Error parseando la respuesta de la estacion ${server.name}' (${server.host}:${server.port}).`);
                    }
                }else{
                    // el servidor respondio, pero no un 'OK'
                    reject(`Peticion correcta, pero '${server.name}' (${server.host}:${server.port}) respondio: ${res.statusCode}`);
                }
            }
        })
    })
}

function updateServer([server, serverData]){
    return new Promise((resolve, reject)=>{
        server.currentData = serverData;
        server.save();
        resolve([server, serverData])
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
                component: component,
                content: componentData
            });
            // referencia al modelo Server
            data.idServer = server.id;
            // guardamos la promesa
            //let saveDataPromise = data.saveAll({server: false});
            let saveDataPromise = data.save(({server: true}));
            componentPromises.push(saveDataPromise);
        }
        // esperamos a que se completen todas bien
        Promise.all(componentPromises)
            .then((results)=>{
                resolve(results);
            })
            .catch((err)=> {
                reject(`Error guardando datos de '${server.name}' (${server.host}): ${err.message}`);
            })
    });
}

export default function(){
    Server.run()
        .then((servers)=>{
            console.log(`Buscando la informacion de ${servers.length} servidores`);
            servers.forEach((server)=>{

                // buscamos la informacion de cada uno de los servidores
                fetchData(server)
                // actualizamos el modelo
                .then(updateServer) // updateServer(server_serverData)
                // guardar los datos recuperados
                .then(saveData)     // saveData(server_serverData)
                // terminamos mostrando los datos
                .then((result)=>{
                    console.log(`Datos de '${server.name}' (${server.host}:${server.port}) guardados correctamente`);
                })
                .catch((err)=>{
                    console.log(err);
                })
            })
        })
        .catch((err)=>{
            console.log(`Error al obtener la lista de servidores: ${err.message}`);
        })
}