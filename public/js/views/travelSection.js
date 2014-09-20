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
    isAuthor: true
  };
  
  var TravelSection = Backbone.View.extend({
    tagName: 'div',
    className: 'travel-section--editor',
    
    content: {},
    
    events: {
      'click .save-section-trigger': 'setData',
      'click .remove-section-trigger': 'close',
      'dragenter .travel-section__photos': 'handleDragEnter',
      'dragleave .travel-section__photos': 'handleDragLeave',
      'drop .travel-section__photos': 'handleDragLeave',
      'change .travel-section__photos input': 'handleFileSelect',
    },
    
    initialize: function (options) {
      this.parent = options.parent;
      
      if (!options.el) {
        this.createSection();
      } else {
        this.setExistingSection(options.el); 
      }
    },
    
    setExistingSection: function (el) {
      this.setElement(el);
      this.content._id = el.dataset.id;
    },
    
    createSection: function () {
      var self = this;
      $.ajax({
        method: 'GET',
        url: '/travel/' + this.parent.id + '/createSection',
        success: function (data) {
          var data = JSON.parse(data);
          self.content._id = data.id;
        }
      });
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
    
    handleFileSelect: function (event) {
      var container = this.el.querySelector('.travel-section__photos');
      var selectedFiles = event.target.files;
      
      if (selectedFiles.length > 3) {
        container.classList.add('is-error');
        return;
      }
      
      for (var i = 0, l = selectedFiles.length; i <l; i ++ ) {
        this.renderFile(selectedFiles[i], container);
      }
      
      container.classList.remove('travel-section__photos--empty');
    },
    
    renderFile: function (file, container) {
      var reader = new FileReader();
      var li = document.createElement('li');
      var img = document.createElement('img');
    
      reader.onload = (function () {
        return function (event) {
          img.src = event.target.result;
          li.appendChild(img);
          li.classList.add('travel-section__photo');
          
          container.appendChild(li);
        };
      })(file);

      reader.readAsDataURL(file);
    },
    
    appendList: function (fragment) {
      
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
      var self = this;
      $.ajax({
        method: 'GET',
        url: '/travel/' + self.parent.id + '/removeSection/' + self.content._id,
        success: function (id) {
          self.unbind();
          self.remove();
          delete self.el;
          delete self.$el;
        }
      });
    }
  });
  
  return TravelSection;
});
