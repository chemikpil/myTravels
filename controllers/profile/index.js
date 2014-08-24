'use strict';

var ProfileModel = require('../../models/profile');
var UserModel = require('../../models/user');

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
      console.log(query);
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
    
    var newName = +new Date();
    var serverPath = __dirname + '/../../public/img/user_covers/' + newName + '_' + req.files.coverphoto.name;
    
    require('fs').rename(
      req.files.coverphoto.path,
      serverPath,
      function (err) {
        if(err) {
		  res.send({
            error: 'Ah crap! Something bad happened'
		  });
          return;
        }
 
        res.send('success');
      }
    );
  });

};
