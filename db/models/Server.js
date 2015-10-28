let Server
export default (thinky)=> {
    // https://thinky.io/documentation/schemas/
    let type = thinky.type
    let r = thinky.r

    Server = thinky.createModel('Server', {
        id: type.string(),
        name: type.string().required(),
        project: type.string().required(),
        currentData: type.any().required(), // puede ser un objeto o un arreglo de objetos
        updatedAt: type.date().default(r.now()),
        createdAt: type.date().default(r.now()),
        status: type.array().default([]),
        host: type.string().required(),
        port: type.string().required(),
        unsolvedIncidents: type.number()    // es calculado cada vez que se pida
    },{
        //enforce_missing: true,      // validacion obliga a tener los campos
        // NO USAR enforce_extra si se tienen metodos que agreguen campos nuevos
        //enforce_extra: 'remove',    // elimina los campos que no estan en el modelo
        enforce_type: 'strict'     // los campos deben ser del mismo tipo que esta declarado
    })

    Server.configureModel = ()=> {
        let Incident = thinky.models.Incident

        Server.ensureIndex('id');
        Server.pre('save', function (next) {
            // al guardar, actualizar la fecha
            this.updatedAt = r.now()
            next()
        });

        Server.defineStatic('includeIncidents', function () {
            return this.merge(function(row){
                return {
                    // consulta anidada con thinky
                    unresolvedIncidents: r.table(Incident.getTableName()).filter({
                        idServer: row('id'),
                        resolved: false
                    }).count() //.coerceTo('array')
                }
            })//.execute()
        })
    }
}
