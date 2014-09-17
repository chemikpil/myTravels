/* global $, Crime, Contentedit, Coveruploader */

define([
  'backbone',
  'libs/coveruploader/coveruploader',
  'libs/contentedit/contentedit',
  'dustjs'
], function (Backbone) {
  'use strict';
  
  var Travel = Backbone.View.extend({
    el: '.travel',
    id: null,
    
    events: {
      'click .add-section-trigger': 'addSection'
    },
    
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
    },
    
    addSection: function (event) {
      var self = this;
      require(['text!../templates/travel/section.dust'], function (tmp) {
        dust.loadSource(dust.compile(tmp, 'section'));
        
        self.renderSection();
      });
    },
    
    renderSection: function () {
      var self = this;
      var data = {
        title: 'Set section title',
        content: 'Write some words about section.',
        editor: true
      };
      
      dust.render('section', data, function (err, out) {
        self.el.querySelector('.travel-sections').innerHTML += out;
      });
    }
    
  });
  
  return Travel;
});
