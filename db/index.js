// Thinky config
import Thinky from 'thinky'
import { dbConfig } from '../config/index.js'
let thinky = Thinky(dbConfig)

// Cargar modulos
import fs from 'fs'
//fs.readDirSync(__dirname).forEach(file=>{
['Data.js', 'Incident.js', 'Server.js', 'User.js'].forEach(file=>{
    if(file!=="index.js"){
        let model = require(path.join(__dirname, file))
        model(thinky)
    }
})

for (var name in thinky.models) {
    let model = thinky.models[name]
    if(typeof model.configureModel === "function"){
        model.configureModel()
    }else{
        console.log(`[Thinky] Model ${name} no tiene el metodo 'configureModel'`)
    }
}
export default thinky.models