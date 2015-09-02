import r from 'rethinkdb';
import config from '../config/config.js';

export function connect(){
    return new Promise( (resolve, reject)=>{
        r.connect(config.rethinkdb)
            .then( (conn)=>{
                resolve(conn);
            })
            .catch( (err)=>{
                console.log(err);
                reject('[RethinkDB] No se puede conectar a la BD');
            });
    });
}

export function createDB(conn){
    return new Promise( (resolve, reject)=>{
        // verificar que la DB exista
        r.dbCreate(config.rethinkdb.db_name).run(conn)
            .then(()=>{
                console.log(`[RethinkDB] DB '${config.rethinkdb.db_name}' creada.`);
                resolve(conn)
            })
            .catch( (err)=>{
                if(err.message.match(/already exist/)){
                    console.log(`[RethinkDB] DB '${config.rethinkdb.db_name}' ya existe.`);
                    resolve(conn);
                }else{
                    console.log(err);
                    reject(`[RethinkDB] No se pudo crear la BD '${config.rethinkdb.db_name}'.`);
                }
            })
    })
}

export function createTable(conn, name, options){
    return new Promise( (resolve, reject)=>{
        r.db(config.rethinkdb.db_name).tableCreate(name, options).run(conn)
            .then( ()=>{
                console.log(`[RethinkDB] tabla '${name}' creada.`);
                resolve(conn);
            })
            .catch( (err)=>{
                if(err.message.match(/already exist/)) {
                    console.log(`[RethinkDB] tabla '${name}' ya existe.`);
                    resolve(conn);
                }else{
                    console.log(err);
                    reject(`[RethinkDB] No se pudo crear la tabla '${name}'.`);
                }
            })
    });
}

export function createTables(conn){
    let tablesPromises = [];
    config.rethinkdb.db_tables.forEach( (table)=>{
        tablesPromises.push( createTable(conn, table.name, table.options) );
    });
    return Promise.all( tablesPromises );
}

export function save(table, data){
    return new Promise( (resolve, reject)=>{
        r.connect()
            .then((conn)=>{
                r.db(config.rethinkdb.db_name).table(table).insert(data).run(conn)
                    .then(resolve)
                    .catch(reject)
            })
            .catch(reject);
    })
}

export function read(table, filter){
    return new Promise( (resolve, reject)=>{
        r.connect()
            .then((conn)=>{
                r.db(config.rethinkdb.db_name).table(table).filter(filter).run(conn)
                    .then( (cursor)=>{
                        resolve(cursor.toArray());
                    })
                    .catch(reject)
            })
            .catch(reject);
    })
}

export function setup(){
    return connect()
        .then(createDB)
        .then(createTables)
}