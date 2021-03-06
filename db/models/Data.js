let Data
export default (thinky)=>{
    // https://thinky.io/documentation/schemas/
    let type = thinky.type
    let r = thinky.r

    Data = thinky.createModel('Data', {
        id: type.string(),
        idServer: type.string().required(),
        component: type.string().required(),
        content: type.any().required(), // puede ser un objeto o un arreglo de objetos
        createdAt: type.date().default(r.now())
    },{
        //enforce_missing: true,      // validacion obliga a tener los campos
        enforce_extra: 'remove',    // elimina los campos que no estan en el modelo
        enforce_type: 'strict',     // los campos deben ser del mismo tipo que esta declarado
        validator: function(){}
    })

    Data.configureModel = ()=>{
        // Models
        let Server = thinky.models.Server

        Data.ensureIndex('id')
        Data.belongsTo(Server, 'server', 'idServer', 'id')
    }
}