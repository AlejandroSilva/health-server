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


import React from 'react'
import Router from 'react-router'
import {Route, NotFoundRoute, DefaultRoute, RouteHandler} from 'react-router'
var App = React.createClass({
    render () {
        return (
            <div>
                <h1>App</h1>
                <RouteHandler/>
            </div>
        )
    }
});
var About = React.createClass({render: function () {return <h2>About</h2>;}});
var Inbox = React.createClass({render: function () {return <h2>Inbox</h2>;}});
var Home = React.createClass({render: function () {return <h2>Home</h2>;}});
var routes = (
    <Route handler={App}>
        <Route path="about" handler={About}/>
        <Route path="inbox" handler={Inbox}/>
    </Route>
);

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

import v1 from './v1';
app.use('/v1/', v1);

/*
 * Middlewares
 */
//import errorsHandler  from '../middlewares/errorsHandler.js';
//app.use(errorsHandler);

export default app;