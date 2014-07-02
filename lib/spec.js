'use strict';

var database = require('../lib/database');

module.exports = function spec(app) {

  return {
    onconfig: function (config, next) {
      var dbConfig = config.get('database');
      database.config(dbConfig);
      
      next(null, config);
    }
  };
};