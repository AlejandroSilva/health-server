import {
    appConfig,
    __IS_DEVELOPMENT__
} from './config/index.js'
import app from './app/boot-server.js'
import socket from 'socket.io'

/**
 * Iniciar el server
 */
let server = app.listen(appConfig.port, function() {
    console.log(`Servicio iniciado en http://localhost:${appConfig.port}/`)
})

import schedule from 'node-schedule'
import getNodesData from './jobs/getNodesData.js'

//// every 20 second...
let j0 = schedule.scheduleJob({second: 0}, getNodesData)
//let j1 = schedule.scheduleJob({second: 10}, getNodesData)
let j2 = schedule.scheduleJob({second: 20}, getNodesData)
//let j3 = schedule.scheduleJob({second: 30}, getNodesData)
let j4 = schedule.scheduleJob({second: 40}, getNodesData)
//let j5 = schedule.scheduleJob({second: 50}, getNodesData)


let io = socket(server)
io.on('connection', (socket)=>{
    console.log('[SocketIO] new user connection')

    socket.on('disconnect', ()=>{
        console.log('[SocketIO] connection close')
    })
})

import {
    Server,
    Incident
} from './db/index.js'
Server
    .changes()
    .then((feed)=> {
        feed.each((err, server)=> {
            if (err) {
                return console.log(err)
            }
            if (!server.isSaved()) {
                // server eliminado
                io.emit('serverDeleted', server)
                console.log(`[SocketIO] 'serverDeleted' emited. (Server:${server.id}).`)

            }else if (server.getOldValue() === null) {
                Server.get(server.id).includeIncidents().run().then((serverCreated)=> {
                    // new server
                    io.emit('serverCreated', serverCreated)
                    console.log(`[SocketIO] 'serverCreated' emited. (Server:${serverCreated.id}).`)
                })

            }else{
                Server.get(server.id).includeIncidents().run().then((serverUpdated)=> {
                    io.emit('serverUpdated', serverUpdated)
                    console.log(`[SocketIO] 'serverUpdated' emited. (Server:${serverUpdated.id}).`)
                })
            }
        })
    })
    .catch((err)=>{
        console.log(err)
    })
Incident
    .without({events: true})
    .changes()
    .then(feed=>{
        feed.each((err, incident)=>{
            // Cuando ocurre un cambio en los incidentes (creacion, eliminacion, resolucion, etc)
            // calculamos la nueva cantidad de incidentes no resueltos y se lo entregamos al cliente
            Server
                .get(incident.idServer)
                .includeIncidents()
                .run().then((server)=> {
                    console.log(`[SocketIO] 'incidentCounterUpdate' emited. (Server:${server.id}).`)
                    io.emit('incidentCounterUpdate', {
                        idServer: server.id,
                        unresolvedIncidents: server.unresolvedIncidents
                    })
                })
                .catch(console.log)
        })
    })

// we start a webpack-dev-server with our config
var webpack = require('webpack')
var WebpackDevServer = require('webpack-dev-server')
var webpackConfig = require('./webpack.config.js')

if(__IS_DEVELOPMENT__){
    new WebpackDevServer(webpack(webpackConfig), {
        hot: true,
        historyApiFallback: true,
        proxy: {
            "*": `http://localhost:${appConfig.port}/`
        }
    }).listen(3001, '0.0.0.0', (err, result)=>{
        if (err) {
            console.log(err)
        }else{
            console.log('-----------------------------------------------------------------------')
            console.log('Hot reload para ver los cambios en las vistas automaticamente:')
            console.log('servidor iniciado en: http://localhost:3001/webpack-dev-server/servers')
            console.log('-----------------------------------------------------------------------')
        }
    })
}