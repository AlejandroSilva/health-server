'use strict';

import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';

import apiV1 from './api/v1/routes.js';
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
// log
app.use(morgan('combined'));

/**
 * Routes
 */
app.get('/', function (req, res) {
    res.send('hello world');
});
app.use('/v1/', apiV1);

export default app;