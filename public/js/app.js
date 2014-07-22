/* global require: false */

'use strict';


requirejs.config({
  baseUrl: './js',
  paths: {
    'jquery': 'libs/backbone.native.min',
    'underscore': '../components/underscore/underscore',
    'backbone': '../components/backbone/backbone'
  },
  shim: {
    'backbone': {
      deps: ['underscore', 'jquery'] 
    }
  }
});


require(['backbone'], function () {

    var app = {
        initialize: function () {
          Backbone.$ = $;
        }
    };

    app.initialize();

});
