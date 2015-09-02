import * as db from './db.js';
import r from 'rethinkdb';
import config from '../config/config.js';

export function saveData(data){
    return new Promise( (resolve, reject)=>{
        r.connect()
            .then((conn)=>{
                r.db(config.rethinkdb.db_name).table('data').insert(data).run(conn)
                    .then(resolve)
                    .catch(reject)
            })
            .catch(reject);
    })
}

export function loadData(filter){
    return new Promise( (resolve, reject)=>{
        r.connect()
            .then((conn)=>{
                r.db(config.rethinkdb.db_name).table('data').filter(filter).run(conn)
                    .then( (cursor)=>{
                        resolve(cursor.toArray());
                    })
                    .catch(reject)
            })
            .catch(reject);
    })
}