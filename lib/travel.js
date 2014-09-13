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
    },
    
    setDate: function (date, id, done) {
      Travel.update({_id: id}, {
        date: date 
      }, function (err, numberAffected) {
        done(!!numberAffected);
      });
    },
    
    saveCoverPhoto: function (path, id, done) {
      Travel.update({_id: id}, {
        cover_photo: path 
      }, function (err, numberAffected) {
        done(!!numberAffected);
      });
    },
    
    publishTravel: function (id, done) {
       Travel.update({_id: id}, {
        mode: 'active' 
      }, function (err, numberAffected) {
        done(!!numberAffected);
      });
    },
    
    unpublishTravel: function (id, done) {
       Travel.update({_id: id}, {
        mode: 'draft' 
      }, function (err, numberAffected) {
        done(!!numberAffected);
      });
    }
  };
};

module.exports = TravelLib;