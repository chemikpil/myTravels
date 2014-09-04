/* global $, Crime, Contentedit, Coveruploader */

define([
  'backbone'
], function (Backbone) {
  'use strict';
  
  var Travel = Backbone.View.extend({
    el: 'body',
    
    initialize: function () {
      this.setCoverHeight();
    },
    
    setCoverHeight: function () {
      var height = window.document.documentElement.clientHeight;
      
      this.el.querySelector('.cover').style.paddingTop = height + 'px';
    }
    
  });
  
  return Travel;
});
