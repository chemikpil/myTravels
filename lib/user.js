'use strict';

var User = require('../models/user');

var UserLib = function () {
 
  return {
    serialize: function (user, done) {
      done(null, user.id);
    },
    
    deserialize: function (id, done) {
      User.findOne({_id: id})
      .populate('travels')
      .exec(function(err, user) {
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
    },
    
    setName: function (name, id, done) {
      User.update({_id: id}, {
        name: name 
      }, function (err, numberAffected) {
        done(!!numberAffected);
      });
    },
    
    setLocation: function (location, id, done) {
      User.update({_id: id}, {
        location: location 
      }, function (err, numberAffected) {
        done(!!numberAffected);
      });
    },
    
    saveCoverPhoto: function (path, id, done) {
      User.update({_id: id}, {
        cover_photo: path 
      }, function (err, numberAffected) {
        done(!!numberAffected);
      });
    },
    
    addTravel: function (travel_id, id, done) {
      User.update({_id: id}, {$push: {'travels': travel_id}}, function (err, numberAffected) {
        done(!!numberAffected);
      });
    }
    
  };
  
};

module.exports = UserLib;
