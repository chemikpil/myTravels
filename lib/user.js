'use strict';

var User = require('../models/user');

var UserLib = function () {
 
  return {
    serialize: function (user, done) {
      done(null, user.id);
    },
    
    deserialize: function (id, done) {
      User.findOne({
        _id: id
      }, function(err, user) {
        done(null, user);
      });
    },
    
    checkExistEmail: function (email, done) {
      User.findOne({
        email: email
      }, function (err, user) {
        if (user) {
          done(true); 
        } else {
          done(false); 
        }
      });
    },
    
    confirmUser: function (token, done) {
      User.update({$and: [{confirm_token: token}, {confirmed: false}]}, {
        confirmed: true
      }, function(err, numberAffected) {
        done(!!numberAffected);
      });
    }
    
  };
  
};

module.exports = UserLib;
