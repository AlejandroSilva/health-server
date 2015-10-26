import express from 'express'
let incidentRouter = express.Router({
    mergeParams: true
})
// DB
import Incident from '../../../../db/Incident.js'
let r = Incident.r
/**
 * Controllers
 */
// GET /v1/server/:serverHost/incidents
let getIncidents = (req, res)=>{
    Incident
        .filter({idServer: req.server.id})
        // incidentes nuevos primero
        // ToDo: ordenar los eventos de forma descendiente (timestamp)
        .orderBy(r.desc('createdAt'))
        // quitar los eventos, para hacer la respuesta mas chica
        .merge(function(row) {
            return {
                events: row('events').orderBy(r.desc('timestamp'))
            }
        })
        //.pluck({
        //    component: true,
        //    createdAt: true,
        //    id: true,
        //    idServer: true,
        //    resolved: true,
        //    title: true
        //})
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