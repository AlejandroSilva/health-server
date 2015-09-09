import Sar from './lib/SAR.js';
import Dicom from './lib/Dicom.js';
import app from './app/server/app.js';
import config from './config/index.js';
import * as db from './db/db.js';

/**
 * Iniciar el server
 */
let server = app.listen(config.app.port, function() {
    console.log('Servicio iniciado en http://localhost:' + config.app.port + '/');
});

import schedule from 'node-schedule';
import getNodesData from './jobs/getNodesData.js';

//// every 20 second...
/*
let j0 = schedule.scheduleJob({second: 0}, getNodesData);
let j1 = schedule.scheduleJob({second: 10}, getNodesData);
let j2 = schedule.scheduleJob({second: 20}, getNodesData);
let j3 = schedule.scheduleJob({second: 30}, getNodesData);
let j4 = schedule.scheduleJob({second: 40}, getNodesData);
let j5 = schedule.scheduleJob({second: 50}, getNodesData);
*/


//import Server from './db/Server.js';
//Server
//    .changes()
//    .then((feed)=> {
//        feed.each((err, server)=> {
//            if (err) {
//                return console.log(err);
//            }
//            if (!server.isSaved()) {
//                // server eliminado
//                console.log("servidor eliminado", server.name)
//            }
//            else if (server.getOldValue() === null) {
//                // new server
//                console.log("nuevo servidor", server.name);
//            }else{
//                // server updated
//                console.log("server actualizado: ", server.name);
//            }
//        })
//    })
//    .catch((err)=>{
//        console.log(err);
//    });
