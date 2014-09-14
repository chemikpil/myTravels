/*global describe:false, it:false, before:false, after:false, beforeEach:false, afterEach:false*/

'use strict';

require('../../models/user')();

var chai = require('chai');
var should = chai.should();
var mongoose = require('mongoose');
var mockgoose = require('mockgoose');
var userLib = require('../../lib/user')();
var travelLib = require('../../lib/travel')();

mockgoose(mongoose);

var User = mongoose.model('User');
var Travel = mongoose.model('Travel');
var ObjectId = mongoose.Types.ObjectId();


var user, travel;

describe('User lib', function () {
  
  before(function (done) {
    user = new User({
      _id: ObjectId,
      email: 'test@mytravels.com',
      password: '12345678',
      confirmed: true
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


  after(function (done) {
    mockgoose.reset();
    done();
  });
  
  it('should set travel name', function (done) {
    
    travelLib.setTitle('First travel', travel._id, function (data) {
      data.should.be.true;
      
      Travel.findOne({title: 'First travel'}, function (err, user) {
        user.should.exist;
        done();
      });
    });
    
  });
  
  it('should set travel location', function (done) {
    
    travelLib.setLocation('Poznan, Poland', travel._id, function (data) {
      data.should.be.true;
      
      Travel.findOne({location: 'Poznan, Poland'}, function (err, user) {
        user.should.exist;
        done();
      });
    });
    
  });
  
  it('should set travel date', function (done) {
    
    travelLib.setDate('24-05-2014', travel._id, function (data) {
      data.should.be.true;
      
      Travel.findOne({date: '24-05-2014'}, function (err, user) {
        user.should.exist;
        done();
      });
    });
    
  });
  
});