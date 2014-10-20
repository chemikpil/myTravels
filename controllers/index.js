'use strict';


var TravelModel = require('../models/travel');


module.exports = function (router) {
  
  router.get('/', function (req, res) {
    var query = {mode: 'active'};
    var select = {title: 1, 'location.name': 1, url: 1, cover_photo: 1, _id: 0};
    
    TravelModel.find(query)
      .select(select)
      .limit(10)
      .sort({date: -1})
      .exec(function (err, result) {
      
        var travels = (result ? result : []);

        res.render('index', {
          travels_count: travels.length,
          travels: JSON.parse(JSON.stringify(travels))
        });
      
      });
    
  });
  
  router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/sign-in');
  });
};
