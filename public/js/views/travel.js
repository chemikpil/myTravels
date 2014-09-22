/* global $, Crime, Contentedit, Coveruploader, require */

define([
  'backbone',
  'libs/coveruploader/coveruploader',
  'libs/contentedit/contentedit'
], function (Backbone) {
  'use strict';
  
  var Travel = Backbone.View.extend({
    el: '.travel',
    id: null,
    
    initialize: function () {
      this.setId();
      this.setCoverHeight();
      this.initContetnedit();
      this.initCoverUploader();
    },
    
    initContetnedit: function () {
      new Contentedit({
        element: document.querySelector('.travel__title'),
        url: '/api/travel/' + this.id + '/settitle'
      });
      new Contentedit({
        element: document.querySelector('.travel__location'),
        url: '/api/travel/' + this.id + '/setlocation'
      });
      new Contentedit({
        element: document.querySelector('.travel__date'),
        url: '/api/travel/' + this.id + '/setdate'
      });
      this.delegateEvents();
    },
    
    setCoverHeight: function () {
      var height = window.document.documentElement.clientHeight;
      
      this.el.querySelector('.cover').style.paddingTop = height + 'px';
    },
    
    setId: function () {
      this.id = this.el.dataset.id;
    },
      
    initCoverUploader: function () {
      new Coveruploader({
        element: document.querySelector('.cover-uploader'),
        cover: document.querySelector('.cover'),
        url: '/travel/' + this.id + '/uploadCover'
      });
    }
  });
  
  return Travel;
});
