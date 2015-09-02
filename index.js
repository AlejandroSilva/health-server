import Sar from './lib/SAR.js';
import Dicom from './lib/Dicom.js';
import app from './server/app.js';
import config from './config/config.js';
import * as db from './db/db.js';
import * as data from './db/data.js';

/**
 * Iniciar el server
 */


db.setup()
    .then( (msg)=>{
        let server = app.listen(config.app.port, function() {
            console.log('Servicio iniciado en http://localhost:' + config.app.port + '/');
        });
        data.saveData({
            //id: 1,
            saludos: "asdasdads"
        })
        .then((data)=>{
            //console.log(data);
        })
        .catch((err)=>{
            //console.log(err);
        })

        data.loadData({})
            .then((data)=>{
                console.log(data);
            })
            .catch((err)=>{
                //console.log(err);
            })

        
    })
    .catch( (err)=>{
        console.log('Error al iniciar el servicio...');
        console.log(err);
        process.exit();
    });