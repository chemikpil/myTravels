define([
  'backbone',
  'libs/crime/crime'
], function (Backbone) {
  'use strict';
  
  var Join = Backbone.View.extend({
    el: 'body',
    
    initialize: function () {
      var self = this;
      this.el.querySelector('form').addEventListener('createMessageTemplate', function (event) {
        self.stylingMessage(event.detail);
      }, false);
    },
    
    stylingMessage: function (element) {
      element.classList.add('message--error');
      element.classList.add('message--dark');
    }
    
  });
  
  return Join;
}); 
    