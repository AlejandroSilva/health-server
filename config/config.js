'use strict';
import * as rethink from './rethinkdb.js';
import * as app from './app.js';
import * as lib from './lib.js';

let enviroment = process.env.NODE_ENV || 'development';
let config = {};

if(enviroment==='production') {
    config = {
        app: app.production,
        lib: lib.production,
        rethinkdb: rethink.production
    }
}else if(enviroment==='testing'){
    config = {
        app: app.test,
        lib: lib.test,
        rethinkdb: rethink.test
    };
}else{
    // 'development' es el ambiente por defecto
    config = {
        app: app.development,
        lib: lib.development,
        rethinkdb: rethink.development
    };
}

export default config;