/* global $, require */

define([
  'backbone'
], function (Backbone) {
  'use strict';
  
  var ImageUpload = Backbone.View.extend({
    tagName: 'section',
    className: 'image-upload',
    id: null,
    
    events: {
      'change input[type="file"]': 'dropFile'
    },
    
    initialize: function (options) {
      this.alt = options.alt;
    },
    
    render: function () {
      var input = document.createElement('input');
      input.type = 'file';
      input.name = 'upload-image';
      this.el.appendChild(input);
      
      var info = document.createElement('span');
      info.textContent = 'Drag and drop photo here or click to upload';
      this.el.appendChild(info);
      
      return this;
    },
    
    close: function () {
      this.unbind();
      this.remove();
      delete this.el;
      delete this.$el;
    }
    
  });
  
  return ImageUpload;
});
