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

    mock = app.listen(1337);

    mockgoose.reset();

    user = new User({
      _id: ObjectId,
      email: 'test@mytravels.com',
      password: '12345678',
      name: 'Thomas',
      surname: 'Tester',
      trips: 0,
      role: 'user',
      registered: new Date(),
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

});
