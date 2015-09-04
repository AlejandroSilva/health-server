import request from 'request';
import Server from '../db/Server.js';
import Data from '../db/Data.js';

function fetchData(server){
    return new Promise((resolve, reject)=>{
        request(`http://${server.host}:${server.port}/v1/info`, {timeout: 5000}, function (err, res, body) {
            if(err){
                // request no pudo hacer una peticion al servidor
                reject(err.code);
            }else{
                if(res.statusCode===200){
                    try{
                        let data = JSON.parse(body);
                        // resolve solo permite 1 argumento, entonces lo agrupamos
                        resolve(data);
                    }catch(err){
                        reject('error parseando la respuesta del nodo.');
                    }
                }else{
                    // el servidor respondio, pero no un 'OK'
                    reject('servir respondio con status '+res.statusCode);
                }
            }
        })
    })
}

function saveData(args){
    // ES6 deconstructing (https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Operadores/Destructuring_assignment)
    // let server = args[0]; let serverData=args[1];
    let [server, serverData] = args;
    return new Promise((resolve, reject)=>{

        let componentPromises = [];
        for(let component in serverData){
            // se guardan individualmente cada uno de los campos de la respuesta
            let componentData = serverData[component];
            let data = new Data({
                component: component,
                content: componentData
            });
            // referencia al modelo Server
            data.server = server;
            // guardamos la promesa
            let saveDataPromise = data.saveAll({server: true});
            componentPromises.push(saveDataPromise);
        }
        // esperamos que se completen todas bien
        Promise.all(componentPromises)
            .then((results)=>{
                resolve(results);
            })
            .catch((err)=> {
                reject(err.message);
            })
    });
}

export default function(){
    Server.run()
        .then((servers)=>{
            servers.forEach((server)=>{
                // buscamos la informacion de cada uno de los servidores
                fetchData(server)
                .then((data)=>{
                    // guardar los datos recuperados
                    saveData([server, data])
                        .then((result)=>{
                            console.log('guardado correctamente');
                        })
                        .catch((err)=>{
                            console.log(err);
                        })
                })
                .catch((message)=>{
                    console.log(`error con ${server.host}: ${message}`);
                })
            })
        })
        .catch((err)=>{
            console.log("ERROR:", err);
        })
}