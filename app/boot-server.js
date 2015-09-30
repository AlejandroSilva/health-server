'use strict';

import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
let app = express();

/**
 * Options
 */
app.set('view cache', false);

/**
 * Middlewares
 */
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}));
// parse application/json
app.use(bodyParser.json());
app.use(morgan('combined'));
// serving static files
app.use(express.static('public'));

/**
 * Routes
 */
import v1 from './server/v1';
app.use('/v1/', v1);

// React + Redux libs
import React from 'react'
//import ReactDOM from 'react-dom/server.js'
import { applyMiddleware, createStore } from 'redux'
//import combinedReducers from './shared/reducers/combinedReducers.js'
import { Provider } from 'react-redux'
//import fetchComponentData from './shared/lib/fetchComponentData.js'

// Rutas
//import { RoutingContext, match } from 'react-router'
//import createLocation from 'history/lib/createLocation.js'
//import routes from './shared/routes.jsx'

//import App from './shared/containers/App.js'
//import AppRoot from './shared/components/appView.jsx'
//import CounterApp from './shared/components/Counter.js'
//import { fetchCounter } from './shared/api/counter.js'
//import configureStore from './shared/store/configureStore.js'

app.get('/*', function (req, res) {
    //let location = createLocation(req.url)

    //fetchCounter( (apiResult)=>{
        // Entregar un estado inicial de las Store al usuario
        //let store = configureStore({
        //    counter: 10,
        //    servers: [1, 23, 4, 4]
        //})
        //let initialState = store.getState()

        res.send(`
            <!DOCTYPE html>
            <html>
                <head>
                    <meta charset="utf-8"/>
                    <title>Health Monitor - Toth</title>
                    <script>
                        // window.__INITIAL_STATE__ = ${"JSON.stringify(initialState)"};
                    </script>
                </head>
                <body>
                    <div id="appRoot">
                        ${"componentHTML"}
                    </div>
                    <script type="application/javascript" src="/bundle.js"></script>
                </body>
            </html>
        `)
        // }) end fetchCounter
})
/*
app.get('/*', function (req, res) {
    let location = createLocation(req.url)
    let reducer = combinedReducers
    let store = applyMiddleware(promiseMiddleware)(createStore)(reducer)
    let store2 = createStore(reducer)

    match({location, routes}, (err, redirectLocation, renderProps)=>{
        if(err){
            console.error(err)
            return res.status(500).end('[Router] Internal server error')
        }
        if(!renderProps){
            return res.status(400).end('[Router] Route not found')
        }

        function renderView(){
            const InitialView = (
                <Provider store={store}>
                    {() =>
                        <RoutingContext {...renderProps} />
                    }
                </Provider>
            );
            let componentHTML = React.renderToString(InitialView)
            console.log("222", componentHTML)
            let initialState = store.getState()

            console.log(componentHTML)
            let html = `
                <!DOCTYPE html>
                <html>
                    <head>
                        <meta charset="utf-8"/>
                        <title>Health Monitor - Toth</title>
                        <script>
                            window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
                        </script>
                    </head>
                    <body>
                        <div id="appRoot">
                            ${componentHTML}
                        </div>
                        <script type="application/javascript" src="/bundle.js"></script>
                    </body>
                </html>
            `
            return html
        }
        // PENDIENTE: fetchComponentData...
        fetchComponentData(store.dispatch, renderProps.components, renderProps.params)
        .then(renderView)
        .then((html)=> res.end(html))
        .catch((err)=>{
            console.log(err)
            res.status(500).send(err)
        })
        //res.setHeader('Cache-Control', 'no-cache');
        //res.send( renderView() );
    })
});
*/

/*
 * Middlewares
 */
import errorsHandler  from './middlewares/errorsHandler.js';
app.use(errorsHandler);

export default app;