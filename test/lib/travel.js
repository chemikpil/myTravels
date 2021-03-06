/*global describe:false, it:false, before:false, after:false, beforeEach:false, afterEach:false*/

'use strict';

require('../../models/user')();

var chai = require('chai');
var should = chai.should();
var expect = chai.expect;
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
      
      Travel.findOne({title: 'First travel'}, function (err, travel) {
        travel.should.exist;
        done();
      });
    });
    
  });
  
  it('should set travel location', function (done) {
    
    travelLib.setLocation({name: 'Poznan, Poland'}, travel._id, function (data) {
      data.should.be.true;
      
      Travel.findOne({_id: travel._id}, function (err, travel) {
        travel.should.exist;
        travel.location.name.should.be.equal('Poznan, Poland');
        done();
      });
    });
    
  });
  
  it('should set travel date', function (done) {
    
    travelLib.setDate('24-05-2014', travel._id, function (data) {
      data.should.be.true;
      
      Travel.findOne({date: '24-05-2014'}, function (err, travel) {
        travel.should.exist;
        done();
      });
    });
    
  });
  
  it('should set travel cover photo', function (done) {
    
    travelLib.saveCoverPhoto('/file.png', travel._id, function (data) {
      data.should.be.true;
      
      Travel.findOne({cover_photo: '/file.png'}, function (err, travel) {
        travel.should.exist;
        done();
      });
    });
    
  });
  
  it('should set travel content', function (done) {
    
    travelLib.setContent('test', travel._id, function (data) {
      data.should.be.true;
      
      Travel.findOne({_id: travel._id}, function (err, travel) {
        travel.content.should.be.equal('test');
        done();
      });
    });
    
  });
  
  it('should publish travel', function (done) {
    
    travelLib.publishTravel(travel._id, function (data) {
      data.should.be.true;
      
      Travel.findOne({_id: travel._id}, function (err, travel) {
        travel.mode.should.be.equal('active');
        done();
      });
    });
    
  });
  
  it('should unpublish travel', function (done) {
    
    travelLib.unpublishTravel(travel._id, function (data) {
      data.should.be.true;
      
      Travel.findOne({_id: travel._id}, function (err, travel) {
        travel.mode.should.be.equal('draft');
        done();
      });
    });
    
  });
  
  it('should remove travel', function (done) {
    
    travelLib.remove(travel._id, function () {
      Travel.findOne({_id: travel._id}, function (err, travel) {
        expect(travel).to.be.null;
        done();
      });
    });
    
  });
  
});