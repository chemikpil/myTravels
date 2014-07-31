/* global require: false */

define(['backbone'], function (Backbone) {
  'use strict';
  
  var AppRouter = Backbone.Router.extend({
    routes: {
      'join': 'join'
    },
    
    join: function () {
      require(['views/join/join'], function(Join) {
        new Join();
      });
    }
  });
  
  return AppRouter;
});