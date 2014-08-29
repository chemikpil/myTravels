/*global describe:false, it:false, before:false, after:false, beforeEach:false, afterEach:false*/

'use strict';

require('../../models/user');
require('../../models/trip');

var chai = require('chai');
var should = chai.should();
var mongoose = require('mongoose');
var mockgoose = require('mockgoose');

mockgoose(mongoose);

var User = mongoose.model('User');
var Trip = mongoose.model('Trip');
var ObjectId = mongoose.Types.ObjectId();


var user, trip;

describe('Trip model', function () {
  beforeEach(function (done) {
    mockgoose.reset();

    user = new User({
      _id: ObjectId,
      email: 'test@mytravels.com',
      password: '12345678',
      role: 'admin'
    });

    trip = new Trip({
      title: 'My first Trip',
      location: 'Pila, Poland',
      author: user._id
    });

    user.save(function () {
      trip.save();
    });
    done();
  });


  afterEach(function (done) {
    mockgoose.reset();
    done();
  });
  
  describe('create', function () {
    it('trip should be created', function (done) {
      Trip.findOne({title: 'My first Trip'}).exec(function (err, trip) {
        should.exist(trip);
        trip.location.should.be.equal('Pila, Poland');
        done();
      });
    });
    
    it('should return author data', function (done) {
      Trip.findOne({title: 'My first Trip'}).populate('author').exec(function (err, trip) {
        trip.author.email.should.be.equal('test@mytravels.com');
        done();
      });
    });
    
  });
});
