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
      'dragenter input': 'handleDragEnter',
      'dragleave input': 'handleDragLeave',
      'drop input': 'handleDragLeave',
      'change input': 'dropFile'
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
    
    renderImage: function () {
      var img = document.createElement('img');
      img.src = this.src;
      img.alt = this.alt;
      
      this.el.parentNode.replaceChild(img, this.el);
    },
    
    handleDragEnter: function () {
      this.el.classList.add('is-drag');
    },
    
    handleDragLeave: function () {
      this.el.classList.remove('is-drag');
    },
    
    dropFile: function () {
      
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
