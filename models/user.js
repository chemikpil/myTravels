'use strict';

var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var crypto = require('../lib/crypto');

var UserModel = function () {
  var userSchema = mongoose.Schema({
    email: {type: String, unique: true},
    password: String,
    name: String,
    surname: String,
    trips: Number,
    registered: {type: Date, default: Date.now},
    confirmed: Boolean,
    confirm_token: String,
    role: String
  });
  
  userSchema.pre('save', function (next) {
    var user = this;
    
    if (!user.isModified('password')) {
      next();
      return;
    }
    
    var hashedPwd = bcrypt.hashSync(user.password, crypto.getLevel());
    
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
