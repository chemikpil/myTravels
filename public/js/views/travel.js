/* global $, Crime, Contentedit, Coveruploader */

define([
  'backbone',
  'libs/coveruploader/coveruploader',
  'libs/contentedit/contentedit'
], function (Backbone) {
  'use strict';
  
  var Travel = Backbone.View.extend({
    el: 'body',
    
    initialize: function () {
      this.setCoverHeight();
      this.initContetnedit();
    },
    
    initContetnedit: function () {
      new Contentedit({
        element: document.querySelector('.travel__title'),
        url: '/api/travel/settitle'
      });
      new Contentedit({
        element: document.querySelector('.travel__location'),
        url: '/api/travel/setlocation'
      });
      new Contentedit({
        element: document.querySelector('.travel__date'),
        url: '/api/travel/setdate'
      });
    },
    
    setCoverHeight: function () {
      var height = window.document.documentElement.clientHeight;
      
      this.el.querySelector('.cover').style.paddingTop = height + 'px';
    }
    
  });
  
  return Travel;
});
