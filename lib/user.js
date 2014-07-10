'use strict';

var User = require('../models/user');

var UserLib = function () {
 
  return {
    serialize: function(user, done) {
      done(null, user.id);
    },
    deserialize: function(id, done) {
      User.findOne({
        _id: id
      }, function(err, user) {
        done(null, user);
      });
    } 
  };
  
};

module.exports = UserLib;
