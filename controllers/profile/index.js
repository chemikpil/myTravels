'use strict';

var ProfileModel = require('../../models/profile');
var UserModel = require('../../models/user');
var userLib = require('../../lib/user')();
var coverUploader = require('../../lib/coverUploader');

module.exports = function (router) {

  router.get('/', function (req, res) {
    res.redirect('/profile/' + res.locals.user._id);
  });
    
  router.get('/:id' , function (req, res) {
    var param = req.params.id;
    var query = {_id: param};
    var model = new ProfileModel();

    if (res.locals.user && res.locals.user._id === param) {
      model.profile = res.locals.user;
      model.profile.logged = true;
      model.class = 'class=is-editor';
      model.title = model.profile.name || 'myTravels - profile';
      res.render('profile/index', model);
    } else {
      UserModel.findOne(query, function (err, user) {
        if (user) {
          model.profile = JSON.parse(JSON.stringify(user));
          model.title = model.profile.name || 'myTravels - profile';
          res.render('profile/index', model);
        } else {
          res.redirect('/'); 
        }
      });
    }
  });
  
  router.post('/uploadCover', function (req, res) {        
    if (!res.locals.user) {
      res.send('Bad Authentication data');
    }
    
    coverUploader(req.files.coverphoto, 'user_covers', function (err, file) {
      userLib.saveCoverPhoto('/img/user_covers/' + file, res.locals.user._id, function (result) {
        res.send('success');
      });
    });
  });

};
