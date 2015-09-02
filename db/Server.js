//import Thinky from 'thinky';
//let thinky = Thinky();
//let type = thinky.type;
//
//
//let Server = thinky.createModel('Server', {
//    id: type.string(),
//    name: type.string(),
//    proyecto: type.string(),
//    ip: type.string()
//});
//
//export let Server;

import * as db from './db.js';

class Server{
    constructor(data){
        this.data = data;
    }
    isValid(){
        return (
            typeof(this.data.name)==="string" &&
            typeof(this.data.project)==="string" &&
            typeof(this.data.ip)==="string"
        )
    }
    save(){
        return db.save('Server', this.data)
    }

    static find(filter){
        return db.read('Server', filter)
    }
    static findAll(){
        return db.read('Server', {});
    }
}

export default Server;