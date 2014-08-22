var Coveruploader = function (options) {
  'use strict';
  
  var element;
  var url;
  
  var classes = {
    active: 'is-active'
  };
  
  var init = function () {
    setOptions();
    
    element.addEventListener('dragenter', handleDragEnter);
    element.addEventListener('dragleave', handleDragLeave);
  };
  
  var setOptions = function () {
    if (options && options.element && options.url) {
      element = options.element;
      url = options.url;
    } else {
      throw new Error("Missign options object") ;
    }
  };
  
  var handleDragEnter = function () {
    element.classList.add(classes.active);
  };
  
  var handleDragLeave = function () {
    element.classList.remove(classes.active);
  };
  
  init();
};