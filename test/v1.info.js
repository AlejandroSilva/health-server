import assert from 'assert';
import request from 'supertest';
import chai from 'chai';
let expect = chai.expect;

import app from '../app/server/app.js';

describe('API v1', function(){

    it('GET /v1/info/cpu', function (done) {
        request(app)
            .get('/v1/info/cpu')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res){
                if(err) return err;

                expect(res.body).to.be.an('array');
                let cpuAll = res.body[0];
                expect(cpuAll).to.have.property('CPU').that.is.an('string');
                expect(cpuAll).to.have.property('idlePercent').that.is.an('number');
                done();
            })
    });

    it('GET /v1/info/ram', function (done) {
        request(app)
            .get('/v1/info/ram')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res){
                if(err) return err;

                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('kbfree').that.is.an('number');
                expect(res.body).to.have.property('free').that.is.an('string');
                done();
            })
    });

    it('GET /v1/info/disc', function (done) {
        request(app)
            .get('/v1/info/disc')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res){
                if(err) return err;

                expect(res.body).to.be.an('array');
                let disc0 = res.body[0];
                expect(disc0).to.be.an('object');
                expect(disc0).to.have.property('MBfsfree').that.is.an('number');
                expect(disc0).to.have.property('FILESYSTEM').that.is.an('string');
                done();
            })
    });

    it('GET /v1/info/discIO', function (done) {
        request(app)
            .get('/v1/info/discIO')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res){
                if(err) return err;

                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('totalRequestPerSecond').that.is.an('number');
                expect(res.body).to.have.property('blockWritesPerSecond').that.is.an('number');
                done();
            })
    });

    it('GET /v1/info/netIO', function (done) {
        request(app)
            .get('/v1/info/netIO')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res){
                if(err) return err;

                expect(res.body).to.be.an('array');
                let int0 = res.body[0];
                expect(int0).to.be.an('object');
                expect(int0).to.have.property('interface').that.is.an('string');
                expect(int0).to.have.property('rxkBps').that.is.an('number');
                done();
            })
    });

    it('GET /v1/info/ping', function (done) {
        request(app)
            .get('/v1/info/ping')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res){
                if(err) return err;

                expect(res.body).to.be.an('array');
                let pingNac = res.body[0];
                let pingInt = res.body[1];
                expect(pingNac).to.be.an('object');
                expect(pingNac).to.have.property('avg').that.is.an('number');
                expect(pingNac).to.have.property('address').that.is.an('string');
                expect(pingInt).to.be.an('object');
                expect(pingInt).to.have.property('avg').that.is.an('number');
                expect(pingInt).to.have.property('address').that.is.an('string');
                done();
            })
    });

    it('GET /v1/info/ping/jaidefinichon.cl', function (done) {
        request(app)
            .get('/v1/info/ping/jaidefinichon.cl')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res){
                if(err) return err;

                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('address').that.is.equals('jaidefinichon.cl');
                expect(res.body).to.have.property('avg').that.is.an('number');
                done();
            })
    });
});