/* global require: false, $: false */

requirejs.config({
  baseUrl: '/js',
  paths: {
    'jquery': 'libs/backbone.native.min',
    'underscore': '../components/underscore/underscore',
    'dustjs': '../components/dustjs-linkedin/dist/dust-full.min',
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
