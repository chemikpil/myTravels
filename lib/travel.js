'use strict';

var Travel = require('../models/travel');

var TravelLib = function () {
  return {
    setTitle: function (title, id, done) {
      Travel.update({_id: id}, {
        title: title 
      }, function (err, numberAffected) {
        done(!!numberAffected);
      });
    },
    
    setLocation: function (location, id, done) {
      Travel.update({_id: id}, {
        location: location 
      }, function (err, numberAffected) {
        done(!!numberAffected);
      });
    }
  };
};

module.exports = TravelLib;