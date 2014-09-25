'use strict';

var error = {errors: 'Bad Authentication data'};
var userLib = require('../../lib/user')();
var travelLib = require('../../lib/travel')();

var canUpdateTravel = function (user_id, travel_id) {
  var can = false;
  
  if (user_id.travels.indexOf(travel_id) > -1) {
    can = true;
  }
  
  return can;
};

module.exports = function (router) {

  router.get('/', function (req, res) {
    res.send('myTravels API is running!');
  });
  
  router.post('/user/setname', function (req, res) {
    var name = req.body.data;
    var user = res.locals.user;
    
    if (!user) {
      res.json(error);
      return;
    }
    
    userLib.setName(name, user._id, function () {
      res.format({
        json: function () {
          res.json(req.body);
        }
      });
    });
  });
  
  router.post('/user/setlocation', function (req, res) {
    var location = req.body.data;
    var user = res.locals.user;
    
    if (!user) {
      res.json(error);
      return;
    }
    
    userLib.setLocation(location, user._id, function () {
      res.format({
        json: function () {
          res.json(req.body);
        }
      });
    });
  });
  
  router.post('/travel/:id/settitle', function (req, res) {
    var title = req.body.data;
    var travel = req.params.id;
    var user = res.locals.user;
    
    if (!canUpdateTravel(user, travel)) {
      res.json(error);
      return;
    }
    
    travelLib.setTitle(title, travel, function () {
      res.format({
        json: function () {
          res.json(req.body);
        }
      });
    });
  });
    
  router.post('/travel/:id/setlocation', function (req, res) {
    var location = req.body;
    var travel = req.params.id;
    var user = res.locals.user;
    
    if (!canUpdateTravel(user, travel)) {
      res.json(error);
      return;
    }
    
    travelLib.setLocation(location, travel, function () {
      res.format({
        json: function () {
          res.json(req.body);
        }
      });
    });
  });
  
  router.post('/travel/:id/setdate', function (req, res) {
    var date = req.body.data;
    var travel = req.params.id;
    var user = res.locals.user;
    
    if (!canUpdateTravel(user, travel)) {
      res.json(error);
      return;
    }
    
    travelLib.setDate(date, travel, function () {
      res.format({
        json: function () {
          res.json(req.body);
        }
      });
    });
  });

};
