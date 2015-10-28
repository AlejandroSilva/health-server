let User
export default (thinky)=>{
    // https://thinky.io/documentation/schemas/
    let type = thinky.type
    //let r = thinky.r

    User = thinky.createModel('User', {
        id: type.string(),
        name: type.string().required()
    },{
        enforce_extra: 'remove',    // elimina los campos que no estan en el modelo
        enforce_type: 'strict',     // los campos deben ser del mismo tipo que esta declarado
        validator: function(){}
    });

   User.configureModel = ()=>{
       User.ensureIndex('id');
   }
}