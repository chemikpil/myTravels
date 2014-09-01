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

describe('User lib', function () {
  
  before(function (done) {
    user = new User({
      _id: ObjectId,
      email: 'test@mytravels.com',
      password: '12345678',
      confirm_token: '1111111111111111111111111111111111111111111111111111111111111111'
    });

    user.save();
    done();
  });


  after(function (done) {
    mockgoose.reset();
    done();
  });
  
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
  
  it('should not confirm user with wrong token', function (done) {
    
    userLib.confirmUser('1111111111111111111111111111111111111111111111111111111111111112', function (data) {
      data.should.be.false;
      done();
    });
    
  });
  
  it('should confirm user with correct token', function (done) {
    
    userLib.confirmUser('1111111111111111111111111111111111111111111111111111111111111111', function (data) {
      data.should.be.true;
      done();
    });
    
  });
  
  it('should not confirm user again', function (done) {
    
    userLib.confirmUser('1111111111111111111111111111111111111111111111111111111111111111', function (data) {
      userLib.confirmUser('1111111111111111111111111111111111111111111111111111111111111111', function (data) {
        data.should.be.false;
        done();
      });
    });
    
  });
  
  it('should change user name', function (done) {
    
    userLib.setName('Thomas', user._id, function (data) {
      data.should.be.true;
      
      User.findOne({name: 'Thomas'}, function (err, user) {
        user.should.exist;
        done();
      });
    });
    
  });
  
  it('should change user location', function (done) {
    
    userLib.setLocation('Pila, Poland', user._id, function (data) {
      data.should.be.true;
      
      User.findOne({location: 'Pila, Poland'}, function (err, user) {
        user.should.exist;
        done();
      });
    });
    
  });
  
});