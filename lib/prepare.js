'use strict';

require('../models/user');
require('colors');

var database = require('../lib/database');
var crypto = require('../lib/crypto');
var config = require('../config/config');
var mongoose = require('mongoose');

var User = mongoose.model('User');
var ObjectId = mongoose.Types.ObjectId();

var prepare = function () {
  
  var dbConfig = config.database;
  var cryptoConfig = config.bcrypt;
  
  database.config(dbConfig);
  crypto.setLevel(cryptoConfig.difficulty);
  
  prepareUsers(function () {
    console.log('\nApp is ready to use\n');
    process.exit(1);
  });
};

var prepareUsers = function (next) {
  
  var user1 = new User({
    email: 'admin@mytravels.com',
    password: 'password',
    name: 'Thomas',
    surname: 'Tester',
    trips: 0,
    role: 'admin',
    registered: new Date(),
    confirm_token: '12341234512345',
    confirmed: true
  });
  
  var user2 = new User({
    email: 'user@mytravels.com',
    password: 'password',
    name: 'Thomas',
    surname: 'Tester',
    trips: 0,
    role: 'admin',
    registered: new Date(),
    confirm_token: '12341234512345',
    confirmed: false
  });
  
  createUser(user1, function () {
    console.log('\n - Created admin user with email <'.cyan  + user1.email.yellow.bold  + '> and password "'.cyan  + 'password'.yellow.bold + '"'.cyan );
    createUser(user2, function () {
      console.log(' - Created unconfirmed user with email <'.cyan  + user2.email.yellow.bold  + '> and password "'.cyan  + 'password'.yellow.bold + '"'.cyan );
      next(); 
    });
  });
};

var createUser = function (user, done) {
  user.save(function () {
    done();
  });
};

prepare();