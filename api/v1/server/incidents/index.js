import express from 'express'
let incidentRouter = express.Router({
    mergeParams: true
})
// DB
import Incident from '../../../../db/Incident.js'

/**
 * Controllers
 */
// GET /v1/server/:serverHost/incidents
let getIncidents = (req, res)=>{
    Incident
        .filter({idServer: req.server.id})
        .run()
        .then((incidents)=>{
            res.json(incidents);
        })
        .catch((err)=>{
            res.status(500).json({
                error: err.message
            });
        })
}

/**
 * Routes
 */
incidentRouter.route('/')
    .get(getIncidents)

export default incidentRouter