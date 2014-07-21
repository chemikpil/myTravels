/*global describe:false, it:false, beforeEach:false, afterEach:false*/

'use strict';


var kraken = require('kraken-js');
var express = require('express');
var request = require('supertest');
var spec = require('../../lib/spec');

var chai = require('chai');
var should = chai.should();
var expect = chai.expect;
var mongoose = require('mongoose');
var mockgoose = require('mockgoose');

mockgoose(mongoose);

var User = mongoose.model('User');
var ObjectId = mongoose.Types.ObjectId();
var user = null;

describe('/join', function () {

  var app, mock;


  beforeEach(function (done) {
    app = express();
    app.on('start', done);
    app.use(kraken({
      basedir: process.cwd(),
      onconfig: spec(app).onconfig
    }));

    mock = app.listen(1337);
    
    mockgoose.reset();

    user = new User({
      _id: ObjectId,
      email: 'test@mytravels.com',
      password: '12345678'
    });

    user.save();
  });


  afterEach(function (done) {
    mockgoose.reset();
    mock.close(done);
  });

  it('should have "Join" button', function (done) {
    request(mock)
      .get('/join')
      .expect(200)
      .expect('Content-Type', /html/)
      .expect(/Join/)
      .end(function (err, res) {
        done(err);
      });
  });
  
  it('should redirect to /join if the email is already taken', function (done) {
    request(mock)
      .get('/join')
      .end(function (err, res) {
        var csrf = /value="(.*?)"/.exec(res.text)[1];
        
        request(mock)
          .post('/join')
          .set('cookie', res.headers['set-cookie'])
          .send({
            _csrf: csrf,
            email: 'test@mytravels.com',
            reemail: 'test@mytravels.com',
            password: '12345678',
            repassword: '12345678'
          })
          .redirects(1)
          .expect(200)
          .expect(/Join/)
          .end(function (err, res) {
            done(err);
          });
      });
  });
  
  it('should redirect to /join if emails do not match', function (done) {
    request(mock)
      .get('/join')
      .end(function (err, res) {
        var csrf = /value="(.*?)"/.exec(res.text)[1];
        
        request(mock)
          .post('/join')
          .set('cookie', res.headers['set-cookie'])
          .send({
            _csrf: csrf,
            email: 'test@mytravels.com',
            reemail: 'test2@mytravels.com',
            password: '12345678',
            repassword: '12345678'
          })
          .redirects(1)
          .expect(200)
          .expect(/Join/)
          .end(function (err, res) {
            done(err);
          });
      });
  });
  
  it('should redirect to /join if passwords do not match', function (done) {
    request(mock)
      .get('/join')
      .end(function (err, res) {
        var csrf = /value="(.*?)"/.exec(res.text)[1];
        
        request(mock)
          .post('/join')
          .set('cookie', res.headers['set-cookie'])
          .send({
            _csrf: csrf,
            email: 'test@mytravels.com',
            reemail: 'test@mytravels.com',
            password: '12345677',
            repassword: '12345678'
          })
          .redirects(1)
          .expect(200)
          .expect(/Join/)
          .end(function (err, res) {
            done(err);
          });
      });
  });
  
  it('should redirect to /join/registered if the user successfully joined', function (done) {
    request(mock)
      .get('/join')
      .end(function (err, res) {
        var csrf = /value="(.*?)"/.exec(res.text)[1];
        
        request(mock)
          .post('/join')
          .set('cookie', res.headers['set-cookie'])
          .send({
            _csrf: csrf,
            email: 'alice@mytravels.com',
            reemail: 'alice@mytravels.com',
            password: '12345678',
            repassword: '12345678'
          })
          .redirects(2)
          .expect(200)
          .end(function (err, res) {
            expect(res.redirects[0]).to.have.string('join/registered');
            done(err);
          });
      });
  });

});
