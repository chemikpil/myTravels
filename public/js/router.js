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
  
  var initialize = function () {
    new AppRouter();
    Backbone.history.start({pushState: true});
  };
  
  return {
    init: initialize
  };
});