'use strict';

var ProfileModel = require('../../models/profile');
var UserModel = require('../../models/user');
var userLib = require('../../lib/user')();

module.exports = function (router) {

  var model = new ProfileModel();

  router.get('/', function (req, res) {    
    model.profile = res.locals.user;
    
    if (res.locals.user) {
      model.class = 'class=is-editor';
    }
    
    res.render('profile/index', model);
  });
    
  router.get('/:id', function (req, res) {
    var param = req.params.id;
    var query = {};
    
    if (param.indexOf('.') > 0) {
      param = param.replace('.', ' ');
      query = {name: param};
    } else {
      query = {_id: param};
    }
    
    UserModel.findOne(query, function (err, user) {
      if (user) {
        model.profile = JSON.parse(JSON.stringify(user));
        res.render('profile/index', model);
      } else {
        res.redirect('/'); 
      }
    });
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
