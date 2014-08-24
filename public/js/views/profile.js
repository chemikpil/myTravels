/* global $, Crime, Contentedit, Coveruploader */

define([
  'backbone',
  'libs/coveruploader/coveruploader',
  'libs/contentedit/contentedit'
], function (Backbone) {
  'use strict';
  
  var Profile = Backbone.View.extend({
    el: 'body',
    
    initialize: function () {
      this.initContetnedit();
      this.initCoverUploader();
    },
    
    initContetnedit: function () {
      new Contentedit({
        element: document.querySelector('.user__name'),
        url: '/api/user/setname'
      });
      new Contentedit({
        element: document.querySelector('.user__location'),
        url: '/api/user/setlocation'
      });
    },
    
    initCoverUploader: function () {
      new Coveruploader({
        element: document.querySelector('.cover-uploader'),
        cover: document.querySelector('.cover'),
        url: '/profile/uploadCover'
      });
    }
    
  });
  
  return Profile;
});
