import app from './app/boot-server.js'
import config from './config/index.js'
import * as db from './db/db.js'
import socket from 'socket.io'

/**
 * Iniciar el server
 */
let server = app.listen(config.app.port, function() {
    console.log(`Servicio iniciado en http://localhost:${config.app.port}/`);
});

import schedule from 'node-schedule';
import getNodesData from './jobs/getNodesData.js';

//// every 20 second...

let j0 = schedule.scheduleJob({second: 0}, getNodesData);
//let j1 = schedule.scheduleJob({second: 10}, getNodesData);
let j2 = schedule.scheduleJob({second: 20}, getNodesData);
//let j3 = schedule.scheduleJob({second: 30}, getNodesData);
let j4 = schedule.scheduleJob({second: 40}, getNodesData);
//let j5 = schedule.scheduleJob({second: 50}, getNodesData);


let io = socket(server)
io.on('connection', (socket)=>{
    console.log('[SocketIO] new user connection')

    socket.on('disconnect', ()=>{
        console.log('[SocketIO] connection close')
    })
})

import Server from './db/Server.js';
Server
    .changes()
    .then((feed)=> {
        feed.each((err, server)=> {
            if (err) {
                return console.log(err);
            }
            if (!server.isSaved()) {
                // server eliminado
                io.emit(`serverDeleted`, server)
                console.log(`[SocketIO] 'serverDeleted' emited. (Server:${server.id}).`)

            }else if (server.getOldValue() === null) {
                // new server
                io.emit(`serverCreated`, server)
                console.log(`[SocketIO] 'serverCreated' emited. (Server:${server.id}).`)

            }else{
                io.emit(`serverUpdated`, server)
                console.log(`[SocketIO] 'serverUpdated' emited. (Server:${server.id}).`)
            }
        })
    })
    .catch((err)=>{
        console.log(err);
    });



// we start a webpack-dev-server with our config
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var webpackConfig = require('./webpack.config.js');

new WebpackDevServer(webpack(webpackConfig), {
   hot: true,
   historyApiFallback: true,
   proxy: {
     "*": "http://localhost:8888"
   }
}).listen(3001, 'localhost', function (err, result) {
    if (err) {
        console.log(err);
    }else{
        console.log('-----------------------------------------------------------------------')
        console.log('Hot reload para ver los cambios en las vistas automaticamente:')
        console.log('servidor iniciado en: http://localhost:3001/webpack-dev-server/servers')
        console.log('-----------------------------------------------------------------------')
    }
});