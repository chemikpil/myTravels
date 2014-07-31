/* global $: false, Crime: false */

define([
  'backbone',
  'libs/crime/crime'
], function (Backbone) {
  'use strict';
  
  var Join = Backbone.View.extend({
    el: 'body',
    
    events: {
      'change input[name=email]': 'checkExistEmail'
    },
    
    initialize: function () {
      var self = this;
      var form = this.el.querySelector('form');
      
      if (form) {
        form.addEventListener('createMessageTemplate', function (event) {
          self.stylingMessage(event.detail);
        }, false);
      }
    },
    
    stylingMessage: function (element) {
      element.classList.add('message--error');
      element.classList.add('message--dark');
    },
    
    checkExistEmail: function (event) {
      var element = event.target;
      var email = element.value;
      var _csrf = this.el.querySelector('input[name=_csrf]').value;
      
      if (element.classList.contains('is-invalid')) {
        return false; 
      }
      
      $.ajax({
        url: '/join/checkemailexist/' + email,
        type: 'GET',
        beforeSend: function (xhr) {
          xhr.setRequestHeader('X-CSRF-Token', _csrf);
        },
        success: function (res) {
          var data = JSON.parse(res);
          
          if (data.exist) {
            Crime.addInvalid(element, 'It looks like you already have an account on myTravels'); 
          } else {
            Crime.removeInvalid(element); 
          }
        }
      });
    }
    
  });
  
  return Join;
}); 
    