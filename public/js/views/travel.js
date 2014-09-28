/* global $, Contentedit, Coveruploader, require, google */

define([
  'backbone'
], function (Backbone) {
  'use strict';
  
  var Travel = Backbone.View.extend({
    el: '.travel',
    id: null,
    
    initialize: function () {
      this.setCoverHeight();
      this.setId();
    },
    
    setCoverHeight: function () {
      var height = window.document.documentElement.clientHeight;
      
      this.el.querySelector('.cover').style.paddingTop = height + 'px';
    },
    
    setId: function () {
      this.id = this.el.dataset.id;
    }
  });
  
  return Travel;
});
