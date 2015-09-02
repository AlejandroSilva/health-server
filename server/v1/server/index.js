import express from 'express';
let router = express.Router();
import * as middle from '../middlewares.js'
import * as controller from './controller.js'
import Server from '../../../db/Server.js';

/*
 * Middlewares
 * Todas las rutas, deben conectarse a la DB y autentificarse
 */
router.use(middle.dbConnection, middle.isAuthenticated);


/*
 * Params
 */
router.param('serverId', function(req, res, next, serverId){
    Server.find({
        id: serverId
    })
    .then((result)=>{
        let server = result[0];
        if(server){
            req.server = server;
            next();
        }else{
            res.status(404).json({
                error: 'Server not found'
            })
        }
    })
    .catch((err)=>{
        res.status(500).json({
            error: err
        });
    })
});


/*
 * Rutas
 */
router.route('/')
    .get(controller.getAllServers)
    .post(controller.createServer);

router.route('/:serverId')
    .get(controller.getServer)
    .put(controller.updateServer)
    .delete(controller.deleteServer)

export default router;