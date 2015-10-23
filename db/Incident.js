import Thinky from 'thinky'
import { dbConfig } from '../config/index.js'
import Server from './Server.js'
let thinky = Thinky(dbConfig)
let type = thinky.type
let r = thinky.r

// https://thinky.io/documentation/schemas/

let Incident = thinky.createModel('Incident', {
    id: type.string(),
    idServer: type.string().required(),
    title: type.string().required(),
    component: type.string().required(),
    events: [{
        timestamp: type.date().default(r.now()),
        message: type.string().required(),
        extra: type.any().required(), // puede ser un objeto o un arreglo de objetos
    }],
    resolved: type.boolean().default(false),
    createdAt: type.date().default(r.now())
},{
    //enforce_missing: true,      // validacion obliga a tener los campos
    enforce_extra: 'remove',    // elimina los campos que no estan en el modelo
    enforce_type: 'strict',     // los campos deben ser del mismo tipo que esta declarado
    validator: function(){}
})
Incident.ensureIndex('id')
Incident.belongsTo(Server, 'server', 'idServer', 'id')

// https://thinky.io/documentation/api/model/
// Metodos de la Clase
Incident.defineStatic('createOrAppendEvent', (event)=>{
    // Buscar si existe un/unos incidentes abiertos para este evento en este servidor
    Incident.filter({
        idServer: event.idServer,
        title: event.title,
        resolved: false
    }).run()
    .then(incidents=>{
        if(incidents.length===0) {
            // Si no existe un incidente abierto para este evento,crea un nuevo incidente
            let incident = new Incident({
                idServer: event.idServer,
                title: event.title,
                component: event.component,
                events: [{
                    message: event.message,
                    extra: event.extra
                }]
            })
            incident.save()
            console.log('[Incident] nuevo incidente creado.')

        }else{
            // Si el evento existe y esta NO RESUELTO para este servidor, anexar el evento
            incidents.map(incident=>{
                //incident.resolved = true
                incident.events.push({
                    message: event.message,
                    extra: event.extra
                })
                incident.save()
                console.log('[Incident] incidente no resuelto, evento anexado.')
            })
        }
    })
    .catch(err=>{
        console.log("[Inciddent] Error: ", err)
    })
})

// Metodos del documento
Incident.define('resolve', function(a){
    this.resolved = true
    return this.save()
})

export default Incident