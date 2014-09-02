/*global describe:false, it:false, before:false, after:false, beforeEach:false, afterEach:false*/

'use strict';

require('../../models/user');
require('../../models/travel');

var chai = require('chai');
var should = chai.should();
var mongoose = require('mongoose');
var mockgoose = require('mockgoose');

mockgoose(mongoose);

var User = mongoose.model('User');
var Travel = mongoose.model('Travel');
var ObjectId = mongoose.Types.ObjectId();


var user, travel;

describe('Travel model', function () {
  beforeEach(function (done) {
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
    done();
  });
  
  describe('create', function () {
    it('trip should be created', function (done) {
      Travel.findOne({title: 'My first Trip'}).exec(function (err, travel) {
        should.exist(travel);
        travel.location.should.be.equal('Pila, Poland');
        done();
      });
    });
    
    it('should return author data', function (done) {
      Travel.findOne({title: 'My first Trip'}).populate('author').exec(function (err, travel) {
        travel.author.email.should.be.equal('test@mytravels.com');
        done();
      });
    });
    
  });
});
