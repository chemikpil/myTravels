/*global describe:false, it:false, before:false, after:false, beforeEach:false, afterEach:false*/

'use strict';

require('../../models/user');

var chai = require('chai');
var should = chai.should();
var mongoose = require('mongoose');
var mockgoose = require('mockgoose');

mockgoose(mongoose);

var User = mongoose.model('User');
var ObjectId = mongoose.Types.ObjectId();
var user = null;

beforeEach(function (done) {
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
    confirmed: false
  });
  
  user.save();
  done();
});

afterEach(function (done) {
  mockgoose.reset();
  done();
});

describe('User model', function () {
  it('user should be created', function (done) {
    User.findOne({email: 'test@mytravels.com'}, function (err, account) {
      should.exist(account);
      account.name.should.be.equal('Thomas');
      account.surname.should.be.equal('Tester');
      account.role.should.be.equal('user');
      done();
    });
  });
  
  it('password should match', function () {
    var password = user.passwordMatches('12345678');
    password.should.be.true;
  });
  
  it('password should not match', function () {
    var password = user.passwordMatches('12345677');
    password.should.be.false;
  });
  
  it('user should not be confirmed', function () {
    var confirmed = user.isConfirmed();
    confirmed.should.be.false;
  });
  
  it('user sould be confirmed', function () {
    var confirm = false;
    
    user.confirmed = true;
    user.save();
        
    confirm = user.confirmed;
    confirm.should.be.true;
  });
});
