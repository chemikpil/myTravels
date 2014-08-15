'use strict';


var ProfileModel = require('../../models/profile');
var UserModel = require('../../models/user');

module.exports = function (router) {

  var model = new ProfileModel();

  router.get('/', function (req, res) {    
    model.profile = res.locals.user;
    model.class = 'class=is-editor';
    
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

};
