'use strict';

var database = require('../lib/database');
var crypto = require('../lib/crypto');

module.exports = function spec(app) {

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