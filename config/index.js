import * as rethink from './rethinkdb.js'
import * as app from './app.js'

let enviroment = process.env.NODE_ENV || 'development'
let config = {}

if(enviroment==='production') {
    config = {
        app: app.production,
        rethinkdb: rethink.production
    }
}else if(enviroment==='testing'){
    config = {
        app: app.test,
        rethinkdb: rethink.test
    }
}else{
    // 'development' es el ambiente por defecto
    config = {
        app: app.development,
        rethinkdb: rethink.development
    }
}

console.log(`Configuración '${enviroment}' cargada.`)
export default config