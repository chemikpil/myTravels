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
    autocomplete: null,
    
    initialize: function () {
      this.setId();
      this.setCoverHeight();
      this.initContetnedit();
      this.initCoverUploader();
      this.initLocationAutocomplet();
    },
    
    events: {
      'click .remove-travel-trigger': 'removeTravel',
      'change .travel__location': 'setLocation'
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
    
    initLocationAutocomplet: function () {
      var input = this.el.querySelector('.travel__location');
      
      this.autocomplete = new google.maps.places.Autocomplete(input, {types: ['(cities)']});
    },
    
    setLocation: function (event) {
      var location = event.target.value;
    },
    
    removeTravel: function () {
      var remove = window.confirm('Are you sure?');
      
      if (remove) {
        window.location = '/travel/' + this.id + '/remove';
      }
    }
  });
  
  return Travel;
});
