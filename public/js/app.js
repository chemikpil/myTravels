/* global require: false, $: false */

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


require([
  'backbone',
  'router'
], function (Backbone, Router) {
  'use strict';
  
  Backbone.$ = $;
  Router.init();
});
