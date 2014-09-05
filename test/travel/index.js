/*global describe:false, it:false, before:false, after:false, beforeEach:false, afterEach:false*/

'use strict';

require('../../models/user');
require('../../models/travel');

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
var Travel = mongoose.model('Travel');
var ObjectId = mongoose.Types.ObjectId();


var user, travel, app, mock;

describe('Travel model', function () {
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
      role: 'admin'
    });

    travel = new Travel({
      title: 'My first Trip',
      location: 'Pila, Poland',
      author: user._id
    });

    user.save(function () {
      travel.save();
    });
    done();
  });


  afterEach(function (done) {
    mockgoose.reset();
    mock.close(done);
  });
  
  it('should say "My first Trip"', function (done) {
    done();
  });

  it('should redirect to home page if travel url is wrong', function (done) {
    done();
  });
});
