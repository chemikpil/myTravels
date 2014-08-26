'use strict';

var ProfileModel = require('../../models/profile');
var UserModel = require('../../models/user');
var userLib = require('../../lib/user')();

module.exports = function (router) {

  var model = new ProfileModel();

  router.get('/', function (req, res) {    
    res.redirect('/profile/' + res.locals.user._id);
  });
    
  router.get('/:id', function (req, res) {
    if (res.locals.user) {
      model.profile = res.locals.user;
      model.class = 'class=is-editor';
      model.title = model.profile.name || 'myTravels - profile';
      res.render('profile/index', model);
    } else {
      var param = req.params.id;
      var query = {_id: param};

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
    
    var fs = require('fs');
    var newName = +new Date() + '_' + req.files.coverphoto.name;
    var cover_dir = __dirname + '/../../public/img/user_covers/';
    var serverPath = cover_dir + newName;

    if (!fs.existsSync(cover_dir)) {
      fs.mkdirSync(cover_dir, '0744');
    }
    
    fs.rename(
      req.files.coverphoto.path,
      serverPath,
      function (err) {
        if(err) {
		  res.send({
            error: 'Ah crap! Something bad happened'
		  });
          return;
        }
        
        userLib.saveCoverPhoto('/img/user_covers/' + newName, res.locals.user._id, function (result) {
          res.send('success');
        });
      }
    );
  });

};
