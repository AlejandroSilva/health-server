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

/**
 * Routes
 */
// GET  - /v1/incident/56d89d89a5ds5-ds5ads4g8asd4ds/
router.route('/:incidentId')
    .get(auth.isAuthenticated, getIncident)

router.route('/:incidentId/resolve')
    .get(auth.isAuthenticated, resolveIncident)

export default router