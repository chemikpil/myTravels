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
      this.parent = options.parent;
    },
    
    render: function () {
      var input = document.createElement('input');
      input.type = 'file';
      input.name = 'upload-image';
      input.setAttribute('multiple', true);
      this.el.appendChild(input);
      
      var info = document.createElement('span');
      info.innerHTML = 'Drag and drop photo here or click to upload. <strong>Max 3!</strong>';
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
    
    dropFile: function (event) {
      var files = event.target.files;
      var formData = new FormData();
      
      if (files.length > 3) {
        return false;
      }
      
      for (var i = 0, l = files.length; i < l; i++) {
        formData.append(event.target.name + '-' + i, files[i], files[i].name);
      }
      
      this.sendFiles(formData);
    },
    
    sendFiles: function (files) {
      var xhr = new XMLHttpRequest();
      var self = this;

      xhr.open("POST", '/api/travel/' + this.parent.id + '/addimage', true);

      xhr.onload = function(){
        var error = false;
        var content = xhr.responseText;

        if (!error && (xhr.status >= 200 && xhr.status < 300)){
          // render image
        }
      };

      xhr.send(files);
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
