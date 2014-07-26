define(['backbone'], function (Backbone) {
  'use strict';
  
  var AppRouter = Backbone.Router.extend({
    
  });
  
  var initialize = function () {
    new AppRouter();
    Backbone.history.start({pushState: true});
  };
  
  return {
    init: initialize
  };
});