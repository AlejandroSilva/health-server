import * as db from '../../db/db.js';

export function dbConnection(req, res, next){
    db.connect()
        .then((conn)=>{
            req.conn = conn;
            next();
        })
        .catch((err)=>{
            res.status(500).send(err);
        })
}

export function isAuthenticated(req, res, next){
    // ToDo: pendiente
    // si tiene el token valido
    if(req.header('token')==="12345"){
        // seteamos el usuario y seguimos
        req.user = {
            username: 'admin'
        };
        next();
    }else{
        // mostrar error
        res.status(401).send('Debe logearse primero (en el header falta token=12345)');
    }
}