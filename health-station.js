import Sar from './lib/SAR.js';
import Dicom from './lib/Dicom.js';
import app from './app/station/app.js';
import config from './config/index.js';
import * as db from './db/db.js';

/**
 * Iniciar la estacion health
 */

let server = app.listen(config.app.port, function() {
    console.log('Servicio iniciado en http://localhost:' + config.app.port + '/');
});
