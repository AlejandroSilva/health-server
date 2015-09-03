import Thinky from 'thinky';
import config from '../config/config.js';
let thinky = Thinky(config.rethinkdb);
let type = thinky.type;

// https://thinky.io/documentation/schemas/

let Server = thinky.createModel('Server', {
    id: type.string(),
    name: type.string().required(),
    project: type.string().required(),
    ip: type.string().required()
},{
    //enforce_missing: true,      // validacion obliga a tener los campos
    enforce_extra: 'remove',    // elimina los campos que no estan en el modelo
    enforce_type: 'strict',     // los campos deben ser del mismo tipo que esta declarado
    validator: function(){}
});
Server.ensureIndex('id');

export default Server;