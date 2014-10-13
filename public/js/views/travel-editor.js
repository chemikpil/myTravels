/* global $, Contentedit, Coveruploader, google */

define([
  'backbone',
  'libs/coveruploader/coveruploader',
  'libs/contentedit/contentedit',
  'markdown',
  'to-markdown'
], function (Backbone) {
  'use strict';
  
  var TravelEditor = Backbone.View.extend({
    el: '.travel',
    id: null,
    autocomplete: null,
    eitor: null,
    emptyImages: [],
    
    initialize: function () {
      this.editor = this.el.querySelector('.travel-content__editor');
      
      this.setId();
      this.initContetnedit();
      this.initCoverUploader();
      this.initLocationAutocomplet();
      this.parseMarkdownToHTML();
    },
    
    events: {
      'click .remove-travel-trigger': 'removeTravel',
      'change .travel__location': 'setLocation',
      'click .travel-actions__button': 'switchEditor',
      'cut .travel-content__editor': 'delayedResize',
      'paste .travel-content__editor': 'delayedResize',
      'drop .travel-content__editor': 'delayedResize',
      'keydown .travel-content__editor': 'delayedResize',
      'click .save-travel-trigger': 'saveContent'
    },
    
    initContetnedit: function () {
      new Contentedit({
        element: document.querySelector('.travel__title'),
        url: '/api/travel/' + this.id + '/settitle'
      });
      new Contentedit({
        element: document.querySelector('.travel__date'),
        url: '/api/travel/' + this.id + '/setdate'
      });
      this.delegateEvents();
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
    
    initLocationAutocomplet: function () {
      var input = this.el.querySelector('.travel__location');
      var self = this;
      
      this.autocomplete = new google.maps.places.Autocomplete(input, {types: ['(cities)']});
      
      google.maps.event.addListener(this.autocomplete, 'place_changed', function() {
        self.setLocation();
      });
    },
    
    setLocation: function () {
      var location = this.autocomplete.getPlace();
      
      var data = {
        name: location.formatted_address,
        geometry: location.geometry.location
      };
      
      $.ajax({
        type: 'POST', 
        url: '/api/travel/' + this.id + '/setlocation',
        data: data,
        dataType: 'json'
      });
    },
    
    switchEditor: function (event) {
      var button = event.target;
      var actions = this.el.querySelector('.travel-actions__wrapper .is-active');
      
      actions.classList.remove('is-active');
      button.classList.add('is-active');
      
      if (button.dataset.show === 'editor') {
        this.switchPreviewToEditor();
      } else {
        this.switchEditorToPreview();
      }
    },
    
    switchEditorToPreview: function () {
      this.parseMarkdownToHTML();
      this.el.querySelector('.travel-content').classList.remove('show-editor');
    },
    
    switchPreviewToEditor: function () {
      this.parseHTMLToMarkdown();
      this.el.querySelector('.travel-content').classList.add('show-editor');
    },
    
    parseMarkdownToHTML: function () {
      var preview = this.el.querySelector('.travel-content__preview');
      
      preview.innerHTML = markdown.toHTML(this.editor.value);
      
      this.removeEmptyImageUploaders();
      this.findEmptyImages(preview);
    },
    
    parseHTMLToMarkdown: function () {
      var preview = this.el.querySelector('.travel-content__preview');
      
      this.removeEmptyImageUploaders();
      this.editor.value = toMarkdown(preview.innerHTML);
    },
    
    removeEmptyImageUploaders: function () {
      if (this.emptyImages.length > 0) {
        for (var i = 0, l = this.emptyImages.length; i <l; i++) {
          this.emptyImages[i].close();
        }
        
        this.emptyImages = [];
      }
    },
    
    findEmptyImages: function (content) {
      var imgs = content.querySelectorAll('img[src=""]');
      var self = this;
      
      Array.prototype.forEach.call(imgs, function (img) {
        self.renderFileUploadSection(img);
      });
    },
    
    renderFileUploadSection: function (img) {
      var self = this;
      require(['views/image-upload'], function (Upload) {
        var uploader = new Upload({
          alt: img.alt,
          parent: self
        });
        
        img.parentNode.replaceChild(uploader.render().el, img);
        self.emptyImages.push(uploader);
      });
    },
    
    resize: function () {
      this.editor.style.height = 'auto';
      this.editor.style.height = this.editor.scrollHeight + 'px';
    },
    
    delayedResize: function () {
        window.setTimeout(this.resize.bind(this), 0);
    },
    
    saveContent: function (event) {
      var text = this.editor.value;
      var target = event.target;
      
      target.setAttribute('disabled', true);
      
      $.ajax({
        type: 'POST', 
        url: '/api/travel/' + this.id + '/setcontent',
        data: {
          content: text
        },
        success: function () {
          target.removeAttribute('disabled');
        }
      });
    },
    
    removeTravel: function () {
      var remove = window.confirm('Are you sure?');
      
      if (remove) {
        window.location = '/travel/' + this.id + '/remove';
      }
    }
  });
  
  return TravelEditor;
});
