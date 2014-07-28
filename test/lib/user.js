/*global describe:false, it:false, before:false, after:false, beforeEach:false, afterEach:false*/

'use strict';

require('../../models/user')();

var chai = require('chai');
var should = chai.should();
var mongoose = require('mongoose');
var mockgoose = require('mockgoose');
var userLib = require('../../lib/user')();

mockgoose(mongoose);

var User = mongoose.model('User');
var ObjectId = mongoose.Types.ObjectId();


var user;
  
beforeEach(function (done) {
  mockgoose.reset();

  user = new User({
    _id: ObjectId,
    email: 'test@mytravels.com',
    password: '12345678',
    confirm_token: '1111111111111111111111111111111111111111111111111111111111111111'
  });

  user.save();
  done();
});


afterEach(function (done) {
  mockgoose.reset();
  done();
});

describe('User lib', function () {
  
  
  it('email adress should exist', function (done) {
    
    userLib.checkExistEmail('test@mytravels.com', function (data) {
      data.should.be.true;
      done();
    });
    
  });
  
  it('email adress should not exist', function (done) {
    
    userLib.checkExistEmail('test2@mytravels.com', function (data) {
      data.should.be.false;
      done();
    });
    
  });
  
});