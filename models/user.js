'use strict';

var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var crypto = require('crypto');
var cryptoConf = require('../lib/crypto');

var UserModel = function () {
  var userSchema = mongoose.Schema({
    email: {type: String, unique: true},
    password: String,
    name: {type: String, default: ''},
    surname: {type: String, default: ''},
    trips: {type: Number, default: 0},
    registered: {type: Date, default: Date.now},
    confirmed: {type: Boolean, default: false},
    confirm_token: {type: String, default: crypto.randomBytes(32).toString('hex')},
    role: {type: String, default: 'user'}
  });
  
  userSchema.pre('save', function (next) {
    var user = this;
    
    if (!user.isModified('password')) {
      next();
      return;
    }
    
    var hashedPwd = bcrypt.hashSync(user.password, cryptoConf.getLevel());
    
    user.password = hashedPwd;
    
    next();
  });
  
  userSchema.methods.passwordMatches = function (plain) {
    var user = this;
    return bcrypt.compareSync(plain, user.password);
  };
  
  userSchema.methods.isConfirmed = function () {
    var user = this;
    return user.confirmed;
  };
  
  return mongoose.model('User', userSchema);
};

module.exports = new UserModel();
