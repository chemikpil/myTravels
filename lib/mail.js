'use strict';

var nodemailer = require('nodemailer');
var config = require('../config/mail');

var Mailer = function (transport) {
  
  var self = this;
  
  self.res = {};
  self.options = {};
  self.mailer = {};
  
  var __construct = function (transport) {
    self.mailer = nodemailer.createTransport(transport || config.create);
  };
  
  var setRes = function (app) {
    if (app.render) {
      self.res = app;
    } else if (app.response) {
      self.res = app;
    } else {
      self.res = app.response.app;
    }
  };
  
  var setOptions = function (options) {
    self.options = options.message;
  };
  
  self.sendEmail = function (options, app, cb) {
    setRes(app);
    setOptions(options);
    
    self.res.render('mail/' + options.template, options.data, function (err, out) {
      self.options.html = out;
      
      self.mailer.sendMail(self.options, cb);
    });
  };
  
  __construct(transport);
  
};


module.exports = function (transport) {
  return new Mailer(transport);
};