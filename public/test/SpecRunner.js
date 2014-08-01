/* global $: false, window: false */

require.config({
  baseUrl: '../js/',
  paths: {
    jquery: 'libs/backbone.native.min',
    underscore: '../components/underscore/underscore',
    backbone: '../components/backbone/backbone',
    mocha: '../test/components/mocha/mocha',
    chai: '../test/components/chai/chai',
    sinon: '../test/components/sinon/lib/sinon',
    spec: '../test/spec/'
  },
  shim: {
    mocha: {
      exports: 'mocha'
    },
    chai: {
      exports: 'chai'
    },
    sinon: {
      exports: 'sinon'
    }
  }
});

require(['backbone', 'mocha', 'chai', 'sinon'], function(Backbone, mocha, chai, sinon) {
  
  'use strict';
  
  Backbone.$ = $;
  Backbone.history.start({silent: true, pushState: true});
  
  // Chai
  window.assert = chai.assert;
  window.expect = chai.expect;
  
  mocha.setup({ui: 'bdd', ignoreLeaks: true});

  var specs = [];

  specs.push('spec/RouterSpec');
  specs.push('spec/JoinViewSpec');
    
  require(specs, function(){
    (function(){
      mocha.run();
    })();
  });

});
