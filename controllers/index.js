'use strict';


var TravelModel = require('../models/travel');


module.exports = function (router) {
  
  router.get('/', function (req, res) {
    var query = {mode: 'active'};
    var select = {title: 1, 'location.name': 1, url: 1, cover_photo: 1, _id: 0}
    
    TravelModel.findOne(query)
      .select(select)
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
