'use strict';


var TravelModel = require('../../models/travel');
var userLib = require('../../lib/user')();


module.exports = function (router) {

  router.get('/', function (req, res) {
    res.redirect('/');
  });
  
  router.get('/add', function (req, res) {
    var userId = res.locals.user._id;
    if (!userId) {
      req.session.goingTo = '/travel/add';
      res.redirect('/sign-in');
      return;
    }
    
    var model = new TravelModel({
      author: userId
    });
  
    userLib.addTravel(model._id, userId, function () {
      model.save(function (err) {
        res.redirect('/travel/' + model._id);
      });
    });
  });
  
  router.get('/:id' , function (req, res) {
    var param = req.params.id;
    var query = {_id: param};
    var model = {};
    
    TravelModel.findOne(query)
      .populate('author')
      .exec(function (err, travel) {
        if (travel) {
          model = JSON.parse(JSON.stringify(travel));
          res.render('travel/index', model);
        } else {
          res.redirect('/'); 
        }
      });
  });

};
