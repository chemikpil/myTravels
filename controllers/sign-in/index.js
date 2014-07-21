'use strict';


var SignInModel = require('../../models/sign-in');
var passport = require('passport');


module.exports = function (router) {

  var model = new SignInModel();

  router.get('/', function (req, res) {
    
    model.errors = req.flash('error');
    model.success = req.flash('success');
    
    res.render('sign-in/index', model);
        
  });
  
  router.post('/', function (req, res) {
    
    passport.authenticate('local-login', {
      successRedirect: req.session.goingTo || '/profile',
      failureRedirect: '/sign-in',
      failureFlash: true
    })(req, res);
    
  });

};
