/* global $, Crime, Contentedit, Coveruploader, dust */

define([
  'backbone',
  'text!../../templates/travel/section.dust',
  'dustjs'
], function (Backbone, tmp) {
  'use strict';
  
  var data = {
    title: 'Set section title',
    content: 'Write some words about section.',
    editor: true
  };
  
  var TravelSection = Backbone.View.extend({
    tagName: 'div',
    className: 'travel-section--editor',
    
    content: {},
    
    events: {
      'click .save-section-trigger': 'setData',
      'click .remove-section-trigger': 'close',
      'dragenter .travel-section__photos': 'handleDragEnter',
      'dragleave .travel-section__photos': 'handleDragLeave'
    },
    
    initialize: function (options) {
      this.parent = options.parent;
      this.content.id = options.id;
    },
    
    render: function (callback) {
      var self = this;
      
      dust.loadSource(dust.compile(tmp, 'section'));
      dust.render('section', data, function (err, out) {
        self.el.innerHTML = out;
        self.delegateEvents();
        
        callback(self);
      }); 
    },
    
    handleDragEnter: function (event) {
      this.el.querySelector('.travel-section__photos').classList.add('is-active');
    },
    
    handleDragLeave: function (event) {
      this.el.querySelector('.travel-section__photos').classList.remove('is-active');
    },
    
    setData: function () {
      var title = this.el.querySelector('.travel-section__title').textContent;
      var content = this.el.querySelector('.travel-section__content').textContent;
      
      this.content.title = (title === data.title) ? '' : title;
      this.content.content = (content === data.content) ? '' : content;
      
      this.save();
    },
    
    save: function () {
      
    },
    
    close: function () {
      this.unbind();
      this.remove();
      delete this.el;
      delete this.$el;
    }
  });
  
  return TravelSection;
});
