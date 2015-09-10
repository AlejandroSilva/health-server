'use strict';

import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
let app = express();

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

/**
 * Routes
 */
import v1 from './v1';
app.use('/v1/', v1);

import React from 'react'
import Router from 'react-router'
import routes from '../shared/routes.jsx'
app.get('/*', function (req, res) {
    Router.run(routes, req.url, function(Handler){
        let componentHTML = React.renderToString(<Handler />)
        let html = `
            <!DOCTYPE html>
            <html>
                <head>
                    <meta charset="utf-8">
                    <title>Isomorphic Redux Demo</title>
                </head>
                <body>
                    <div id="react-view">
                        ${componentHTML}
                    </div>
                <!--<script type="application/javascript" src="/bundle.js"></script>-->
                </body>
            </html>
        `
        res.send(html);
    })
});

/*
 * Middlewares
 */
//import errorsHandler  from '../middlewares/errorsHandler.js';
//app.use(errorsHandler);

export default app;