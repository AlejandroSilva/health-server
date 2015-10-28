// La carga de modelos y la configuracion se hacen separado, esto
// con el fin de evitar redundancia ciclica

// Thinky config
import Thinky from 'thinky'
import { dbConfig } from '../config/index.js'
let thinky = Thinky(dbConfig)

// Cargar Modelos
import path from 'path'
import fs from 'fs'
let modelsPath = path.join(__dirname, '/models')
fs.readdirSync(modelsPath).forEach(file=>{
    let model = require(path.join(modelsPath, file))
    model(thinky)
})

// configurar Modelos
for (var name in thinky.models) {
    let model = thinky.models[name]
    if(typeof model.configureModel === "function"){
        model.configureModel()
    }else{
        console.log(`[Thinky] Model ${name} no tiene el metodo 'configureModel'`)
    }
}
export default thinky.models