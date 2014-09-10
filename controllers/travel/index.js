'use strict';


var TravelModel = require('../../models/travel');
var userLib = require('../../lib/user')();
var travelLib = require('../../lib/travel')();
var coverUploader = require('../../lib/coverUploader');


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
    var query = {url: param};
    var model = {};
    
    TravelModel.findOne(query)
      .populate('author')
      .exec(function (err, travel) {
        if (travel) {        
          model = JSON.parse(JSON.stringify(travel));
          
          if (res.locals.user && travel.author._id+ '' === res.locals.user._id) {
            model.isAuthor = true;
          }
          
          res.render('travel/index', model);
        } else {
          res.redirect('/'); 
        }
      });
  });
  
  router.post('/:id/uploadCover' , function (req, res) {
    if (!res.locals.user) {
      res.send('Bad Authentication data');
    }
    
    coverUploader(req.files.coverphoto, 'travel_covers', function (err, file) {
      travelLib.saveCoverPhoto('/img/travel_covers/' + file, req.params.id, function (result) {
        res.send('success');
      });
    });
  });

};
