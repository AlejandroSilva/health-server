import express from 'express'
let incidentRouter = express.Router({
    mergeParams: true
})
// DB
import { Incident } from '../../../../db/index.js'
/**
 * Controllers
 */

let getIncidents = (req, res)=>{
    Incident
        .filter({idServer: req.server.id})
        // incidentes nuevos primero
        .orderByCreatedAt()
        // Quitar los eventos, para hacer la respuesta mas chica (o la respuesta puede tener mucho MB de tamaño
        .removeEvents()
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
// GET /v1/server/:serverHost/incidents
incidentRouter.route('/')
    .get(getIncidents)

export default incidentRouter