import assert from 'assert';
import request from 'supertest';
import chai from 'chai';
let expect = chai.expect;

import app from '../app/server/app.js';
import * as db from '../db/db.js';

describe('API v1', function () {

    before(function () {
        db.setup()
            .then( (msg)=> {
                let server = app.listen(config.app.port, function () {
                    console.log('Servicio iniciado en http://localhost:' + config.app.port + '/');
                });
            });
    });

    
    let validServer = {
        name: 'FART pacs',
        proyecto: 'FART',
        ip: '127.0.0.1'
    };


    it('POST /v1/server', function (done) {
        request(app)
            .post('/v1/server')
            //.send(validServer)
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
                expect(err).to.be.be.an('null');
                //if(err) return err;

                expect(res.body).to.be.an('object').that.is.equal(validServer);
                done();
            })
    });
});