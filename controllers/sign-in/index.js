'use strict';


var SignInModel = require('../../models/sign-in');
var passport = require('passport');


module.exports = function (router) {

  var model = new SignInModel();

  router.get('/', function (req, res) {
    
    res.render('sign-in/index', model);
        
  });
  
  router.post('/', function (req, res) {
    
    passport.authenticate('local-login', {
      successRedirect: req.session.goingTo || '/profile',
      failureRedirect: '/sign-in',
      faulereFlash: true
    })(req, res);
    
  });

};
