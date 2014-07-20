'use strict';

var User = require('../models/user');
var LocalStrategy = require('passport-local').Strategy;

exports.loginStrategy = function () {
  return new LocalStrategy({usernameField: 'email'}, function (email, password, done) {
    User.findOne({
      email: email
    }, function (err, user) {
      if (err) {
        return done(err); 
      }
      
      if (!user || !user.passwordMatches(password)) {
        return done(null, false, {
          message: 'Incorrect email or password. Try again.'
        });
      }
      
      if (!user.isConfirmed()) {
        return done(null, false, {
          message: 'Your account isn\'t activate. Please check your email to activate your account.'
        });
      }
      
      done(null, user);
    });
  });
};

exports.isAuthenticated = function () {
  return function (req, res, next) {
    var role = (req.user && req.user.role) ? req.user.role : '';
    var route = req.url;
    var auth = {
      '/profile': true
    };
        
    if (!auth[route]) {
      next();
      return;
    }
    
    if (!req.isAuthenticated()) {
      req.session.goingTo = req.url;
      res.redirect('/sign-in');
      return;
    }
    
    if (role && req.user.role !== role ) {
      res.status(401);
      res.render('error/401');
      return;
    }
    
    next();
  };
};

exports.injectUser = function () {
  return function (req, res, next) {
    if (req.isAuthenticated()) {
      res.locals.user = req.user; 
    }
    
    next();
  };
};
