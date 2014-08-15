/* global require: false */

define(['backbone'], function (Backbone) {
  'use strict';
  
  var AppRouter = Backbone.Router.extend({
    routes: {
      'join': 'join',
      'profile*def': 'profile'
    },
    
    join: function () {
      require(['views/join'], function(Join) {
        new Join();
      });
    },
    
    profile: function () {
      if (document.body.classList.contains('is-editor')) {
        require(['views/profile'], function(Join) {
          new Join();
        });
      }
    }
  });
  
  return AppRouter;
});