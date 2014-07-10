'use strict';

require('../models/user');

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
  
  createUsers();
  
  console.log('\nApp is ready to use\n');
  process.exit(1);
  
};

var createUsers = function () {
  
  var user = new User({
    _id: ObjectId,
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
  
  user.save();
  console.log('\nCreated user with email <' + user.email + '> and password "' + user.password + '"');
  
};

prepare();