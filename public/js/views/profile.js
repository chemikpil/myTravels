/* global $: false, Crime: false */

define([
  'backbone',
  'libs/contentedit/contentedit'
], function (Backbone) {
  'use strict';
  
  var Profile = Backbone.View.extend({
    el: 'body',
    
    initialize: function () {
      this.startContetnedit();
    },
    
    startContetnedit: function () {
      new Contentedit({
        element: document.querySelector('.user__name'),
        url: '/api/user/setname'
      });
      new Contentedit({
        element: document.querySelector('.user__location'),
        url: '/'
      });
    }
    
  });
  
  return Profile;
}); 
    