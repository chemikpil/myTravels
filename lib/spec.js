'use strict';

var passport = require('passport');
var database = require('../lib/database');
var crypto = require('../lib/crypto');
var auth = require('../lib/auth');
var userLib = require('../lib/user')();

module.exports = function spec(app) {
  
  app.on('middleware:after:session', function configPassport(eventtargs) {
    
    passport.use('local-login', auth.loginStrategy());
    passport.serializeUser(userLib.serialize);
    passport.deserializeUser(userLib.deserialize);
    app.use(passport.initialize());
    app.use(passport.session());
    
  });

  return {
    onconfig: function (config, next) {
      var dbConfig = config.get('database');
      var cryptoConfig = config.get('bcrypt');
      
      database.config(dbConfig);
      
      crypto.setLevel(cryptoConfig.difficulty);
        
      next(null, config);
    }
  };
  
};