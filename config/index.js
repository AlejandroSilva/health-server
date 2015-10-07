import * as rethink from './rethinkdb.js'
import * as app from './app.js'

let enviroment = process.env.NODE_ENV || 'development'
let appConfig = {}
let dbConfig = {}

if(enviroment==='production') {
    appConfig = app.production
    dbConfig = rethink.production
}else if(enviroment==='testing'){
    appConfig = app.test
    dbConfig = rethink.test
}else{
    // 'development' es el ambiente por defecto
    appConfig = app.development
    dbConfig = rethink.development
}

console.log(`Health Server ${appConfig.version}`);
console.log(`Configuración '${enviroment}' cargada.`)

export { appConfig, dbConfig }