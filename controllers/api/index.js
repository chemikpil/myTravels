'use strict';

var error = {errors: 'Bad Authentication data'};
var userLib = require('../../lib/user')();

module.exports = function (router) {

  router.get('/', function (req, res) {
    res.send('myTravels API is running!');
  });
  
  router.post('/user/setname', function (req, res) {
    var name = req.body.data;
    var user = res.locals.user;
    
    if (!user) {
      res.json(error);
    }
    
    userLib.setName(name, user._id, function () {
      res.format({
        json: function () {
          res.json(req.body);
        }
      });
    });
  });

};
