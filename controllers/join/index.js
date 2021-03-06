'use strict';


var JoinModel = require('../../models/join');
var passport = require('passport');
var mailer = require('../../lib/mail')();
var userLib = require('../../lib/user')();


module.exports = function (router) {

  var model = new JoinModel();


  router.get('/', function (req, res) {
    
    model.errors = req.flash('error');
    res.render('join/index', model);
        
  });
  
  router.post('/', function (req, res) {
    
    var errors = [];
    
    if (!req.body.email || req.body.email !== req.body.reemail) {
      errors.push('Your emails do not match. Please try again.');
    }
    
    if (!req.body.password || req.body.password !== req.body.repassword) {
      errors.push('Your password do not match. Please try again.');
    }
    
    if (errors.length > 0) {
      req.flash('error', errors);
      res.redirect('/join');
      return false;
    }
    
    passport.authenticate('local-register', {
      successRedirect: '/join/registered',
      failureRedirect: '/join',
      failureFlash: true
    })(req, res);
    
  });
  
  router.get('/registered', function (req, res) {
    
    if (req.user) {
      req.flash('success', 'It almost done. Check your email for instructions on how to verify your account');
      mailer.sendEmail({
        template: 'welcome',
        data: {link: 'http://localhost:8000/join/confirm?key=' + req.user.confirm_token},
        message: {
          from: 'myTravels <hello@mytravels.com>',
          to: req.user.email,
          subject: 'Welcome to myTravels'
        }
      }, res);
      req.logout();
      res.redirect('/sign-in');
      return;
    }
    
    res.redirect('/join');
    return;
  });
  
  router.get('/checkemailexist/:email', function (req, res) {
    userLib.checkExistEmail(req.params.email, function (exist) {
      var data = {exist: exist};
      res.format({
        json: function () {
          res.json(data);
        },
        html: function () {
          res.redirect('/join');
        }
      });
    });
  });
  
  router.get('/confirm', function (req, res) {
    userLib.confirmUser(req.query.key, function (confirm) {
      if (confirm) {
        req.flash('success', 'The user has been successfully confirmed. Now you can log in');
        res.redirect('/sign-in');
      } else {
        res.redirect('/join');
      }
    });
    
  });

};
