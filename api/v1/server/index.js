import express from 'express'
import * as controller from './controller.js'
import * as auth from '../../middlewares/auth.js'
import Server from '../../../db/Server.js'

let serverRouter = express.Router()
import incidentRouter from './incidents/index.js'

/*
 * Params
 */
serverRouter.param('serverHost', function(req, res, next, serverHost){
    // si existe el server que busca, lo agrega a la respuesta
    Server.get(serverHost).run()
    .then((server)=>{
        req.server = server
        next()
    })
    // si no, llama a next(err), y ejecuta los middlewares de error
    .catch(next)
})

/*
 * Rutas, middlewares y controllers
 */
// GET/POST - v1/server/
serverRouter.route('/')
    .get(controller.getAllServers)
    .post(auth.isAuthenticated, controller.createServer)

// GET/PUT/DEL - v1/server/sd8gf45a5g54-s2ds5g12sd5ds/
serverRouter.route('/:serverHost')
    .get(controller.getServer)
    .put(auth.isAuthenticated, controller.updateServer)
    .delete(auth.isAuthenticated, controller.deleteServer)

// v1/server/sd8gf45a5g54-s2ds5g12sd5ds/incidents
serverRouter.use('/:serverHost/incidents', incidentRouter)

export default serverRouter