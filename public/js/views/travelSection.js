/* global $, Crime, Contentedit, Coveruploader */

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
      'click .save-section-trigger': 'save'
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
    
    save: function () {
      // save data
    }
  });
  
  return TravelSection;
});
