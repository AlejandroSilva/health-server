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
// log
app.use(morgan('combined'));

/**
 * Routes
 */
app.get('/', function (req, res) {
    res.send('hello world');
});
import v1 from './v1';
app.use('/v1/', v1);

export default app;