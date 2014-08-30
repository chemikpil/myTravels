/*global describe:false, it:false, beforeEach:false, afterEach:false*/

'use strict';


var kraken = require('kraken-js');
var express = require('express');
var request = require('supertest');
var spec = require('../../lib/spec');

var chai = require('chai');
var should = chai.should();
var mongoose = require('mongoose');
var mockgoose = require('mockgoose');

mockgoose(mongoose);

var User = mongoose.model('User');
var ObjectId = mongoose.Types.ObjectId();
var user = null;


describe('/sign-in', function () {

  var app, mock;

  beforeEach(function (done) {
    app = express();
    app.on('start', done);
    app.use(kraken({
      basedir: process.cwd(),
      onconfig: spec(app).onconfig
    }));
    
    app.all('/profile', function (req, res) {
      res.status(200).send('Profile page');
    });
    
    mock = app.listen(1337);
    
    mockgoose.reset();

    user = new User({
      _id: ObjectId,
      email: 'test@mytravels.com',
      password: '12345678',
      name: 'Thomas Tester',
      confirm_token: '12341234512345',
      confirmed: true
    });

    user.save();
  });


  afterEach(function (done) {
    mockgoose.reset();
    mock.close(done);
  });


  it('should say "Welcome back"', function (done) {
      
    request(mock)
      .get('/sign-in')
      .expect(200)
      .expect('Content-Type', /html/)
      .expect(/Sign in/)
      .end(function (err, res) {
        done(err);
    });
  });
  
  it('should redirect to /profile if the form is valid', function (done) {
      
    request(mock)
      .get('/sign-in')
      .end(function (err, res) {
        var csrf = /value="(.*?)"/.exec(res.text)[1];
        
        request(mock)
          .post('/sign-in')
          .set('cookie', res.headers['set-cookie'])
          .send({
            _csrf: csrf,
            email: 'test@mytravels.com',
            password: '12345678'
          })
          .redirects(1)
          .expect(200)
          .expect(/Profile page/)
          .end(function (err, res) {
            done(err);
          });
    });
  });
  
  it('should redirect to /sign-in if the user has entered the wrong password', function (done) {
      
    request(mock)
      .get('/sign-in')
      .end(function (err, res) {
        var csrf = /value="(.*?)"/.exec(res.text)[1];
        
        request(mock)
          .post('/sign-in')
          .set('cookie', res.headers['set-cookie'])
          .send({
            _csrf: csrf,
            email: 'test@mytravels.com',
            password: '12345677'
          })
          .redirects(1)
          .expect(200)
          .expect(/Sign in/)
          .end(function (err, res) {
            done(err);
          });
    });
  });
  
  it('should redirect to /sign-in if the user has entered the wrong email', function (done) {
      
    request(mock)
      .get('/sign-in')
      .end(function (err, res) {
        var csrf = /value="(.*?)"/.exec(res.text)[1];
        
        request(mock)
          .post('/sign-in')
          .set('cookie', res.headers['set-cookie'])
          .send({
            _csrf: csrf,
            email: 'test2@mytravels.com',
            password: '12345678'
          })
          .redirects(1)
          .expect(200)
          .expect(/Sign in/)
          .end(function (err, res) {
            done(err);
          });
    });
  });
  
  it('should redirect to /sign-in if the user has not specified email and password', function (done) {
      
    request(mock)
      .get('/sign-in')
      .end(function (err, res) {
        var csrf = /value="(.*?)"/.exec(res.text)[1];
        
        request(mock)
          .post('/sign-in')
          .set('cookie', res.headers['set-cookie'])
          .send({
            _csrf: csrf
          })
          .redirects(1)
          .expect(200)
          .expect(/Sign in/)
          .end(function (err, res) {
            done(err);
          });
    });
  });
  
  it('should redirect to /sign-in if the user is not confirmed', function (done) {
    user.confirmed = false;
    user.save();
    
    request(mock)
      .get('/sign-in')
      .end(function (err, res) {
        var csrf = /value="(.*?)"/.exec(res.text)[1];
        
        request(mock)
          .post('/sign-in')
          .set('cookie', res.headers['set-cookie'])
          .send({
            _csrf: csrf,
            email: 'test@mytravels.com',
            password: '12345678'
          })
          .redirects(1)
          .expect(200)
          .expect(/Sign in/)
          .end(function (err, res) {
            done(err);
          });
    });
  });

});
