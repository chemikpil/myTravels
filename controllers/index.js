'use strict';


var TravelModel = require('../models/travel');


module.exports = function (router) {
  
  router.get('/', function (req, res) {
    var query = {mode: 'active'};
    
    TravelModel.findOne(query)
      .limit(10)
      .sort({date: -1})
      .exec(function (err, travels) {
        res.render('index', {
          travels: travels
        });
      });
    
  });
  
  router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/sign-in');
  });
};
