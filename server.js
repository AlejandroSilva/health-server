import Sar from './lib/SAR.js';
import Dicom from './lib/Dicom.js';
import app from './server/app.js';
import config from './config/config.js';
import * as db from './db/db.js';

/**
 * Iniciar el server
 */


//db.setup()
//    .then( (msg)=>{
        let server = app.listen(config.app.port, function() {
            console.log('Servicio iniciado en http://localhost:' + config.app.port + '/');
        });
    //})
    //.catch( (err)=>{
    //    console.log('Error al iniciar el servicio...');
    //    console.log(err);
    //    process.exit();
    //});

//function fun() {
//    console.log("tarea ejecutada.....");
//}
//
import schedule from 'node-schedule';
import getNodesData from './jobs/getNodesData.js';

// every 20 second...
let j1 = schedule.scheduleJob({second: 0}, getNodesData);
let j2 = schedule.scheduleJob({second: 20}, getNodesData);
let j3 = schedule.scheduleJob({second: 40}, getNodesData);
//getNodesData();