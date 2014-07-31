/* global require: false, $: false */

requirejs.config({
  baseUrl: './js',
  paths: {
    'jquery': 'libs/backbone.native.min',
    'underscore': '../components/underscore/underscore',
    'backbone': '../components/backbone/backbone'
  }
});


require([
  'backbone',
  'router'
], function (Backbone, Router) {
  'use strict';
  
  Backbone.$ = $;
  
  new Router();
  Backbone.history.start({pushState: true});
});
