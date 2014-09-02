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

describe('User model', function () {
  
  var user, travel;
  
  beforeEach(function (done) {
    mockgoose.reset();

    user = new User({
      _id: ObjectId,
      email: 'test@mytravels.com',
      password: '12345678',
      trips: []
    });

    travel = new Travel({
      title: 'My first Trip',
      location: 'Pila, Poland',
      author: user._id
    });

    user.save(function () {
      travel.save(function () {
        user.trips.push(travel._id);
        user.save(function (){
          done(); 
        });
      });
    });
  });


  afterEach(function (done) {
    mockgoose.reset();
    done();
  });
  
  
  describe('create', function () {
  
    it('user should be created', function (done) {

      User.findOne({email: 'test@mytravels.com'}, function (err, account) {
        should.exist(account);
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


    it('user should can set a name', function (done) {

      user.name = 'Alice';
      user.save(function (err, newUser) {
        newUser.name.should.be.equal('Alice');
        done();
      });

    });


    it('user should have a confirm token', function (done) {

      User.findOne({email: 'test@mytravels.com'}, function (err, account) {
        should.exist(account.confirm_token);
        account.confirm_token.length.should.be.equal(64);
        done();
      });

    });

    it('user should have a gravatar url', function (done) {

      User.findOne({email: 'test@mytravels.com'}, function (err, account) {
        should.exist(account.gravatar);
        account.gravatar.length.should.be.equal(67);
        done();
      });

    });


    it('user should not be confirmed', function () {

      var confirmed = user.isConfirmed();
      confirmed.should.be.false;

    });


    it('user sould be confirmed', function (done) {

      user.confirmed = true;
      user.save(function (err, savedUser) {
        savedUser.confirmed.should.be.true;
        done();
      });

    });
    
    it('user sould have ref to trips', function (done) {
      
      User.findOne({email: 'test@mytravels.com'}).populate('trips').exec(function (err, account) {
        should.exist(account);
        account.trips[0].title.should.be.equal('My first Trip');
        done();
      });

    });
  
  });
});
