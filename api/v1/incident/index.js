// DB
import Incident from '../../../db/Incident.js'

// Express / Routers
import express from 'express'
import * as auth from '../../middlewares/auth.js'
let router = express.Router()

/**
 * Middlewares
 */

router.param('incidentId', function(req, res, next, incidentId){
    Incident.get(incidentId).run()
        .then(incident=>{
            req.incident = incident
            next()
        })
        .catch(next)
})
/**
 * Controllers
 */
let getIncident = (req, res)=>{
    res.json(req.incident)
}

let resolveIncident = (req, res, next)=>{
    req.incident.resolve()
    .then(()=>{
        res.json(req.incident)
    })
    .catch(next)
}

/**
 * Routes
 */
// GET  - /v1/incident/56d89d89a5ds5-ds5ads4g8asd4ds/
router.route('/:incidentId')
    .get(auth.isAuthenticated, getIncident)

// POST  - /v1/incident/56d89d89a5ds5-ds5ads4g8asd4ds/resolve
router.route('/:incidentId/resolve')
    .post(auth.isAuthenticated, resolveIncident)

export default router

//queda pendiente dejar esto disponible para la UI:
//    que axios pida los datos
//hacer los ocmponentes de react
//actualizar el contador de eventos para un servidor
//incrementar contador al crear un evento
//decrementear contador al hacer 'resolve'