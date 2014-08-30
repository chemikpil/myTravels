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


describe('/profile', function () {

  var app, mock;


  beforeEach(function (done) {
    app = express();
    app.on('start', done);
    app.use(kraken({
      basedir: process.cwd(),
      onconfig: spec(app).onconfig
    }));
    
    app.all('/', function (req, res) {
      res.status(200).send('Home page');
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

  it('should redirect to /sign-in if user is not logged', function (done) {
    request(mock)
      .get('/profile')
      .expect(200)
      .redirects(2)
      .expect('Content-Type', /html/)
      .expect(/Sign in/)
      .end(function (err, res) {
        done(err);
      });
  });
  
  it('should render profile page with specified ID', function (done) {
    request(mock)
      .get('/profile/' + user._id)
      .expect(200)
      .redirects(2)
      .expect('Content-Type', /html/)
      .expect(/Thomas Tester/)
      .end(function (err, res) {
        done(err);
      });
  });
  
  it('should redirect to home page if the specified ID does not exist', function (done) {
    request(mock)
      .get('/profile/12345567432')
      .expect(200)
      .redirects(2)
      .expect('Content-Type', /html/)
      .expect(/Home page/)
      .end(function (err, res) {
        done(err);
      });
  });

});
