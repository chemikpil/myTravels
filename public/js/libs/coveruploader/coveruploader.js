var Coveruploader = function (options) {
  'use strict';
  
  var element;
  var url;
  var input;
  var cover;
  
  var classes = {
    active: 'is-active'
  };
  
  var init = function () {
    setOptions();
    
    element.addEventListener('dragenter', handleDragEnter);
    element.addEventListener('dragleave', handleDragLeave);
    element.addEventListener('drop', handleDragLeave);
    input.addEventListener('change', handleFileSelect, false);
  };
  
  var setOptions = function () {
    if (options && options.element && options.url && options.cover) {
      element = options.element;
      url = options.url;
      cover = options.cover;
    } else {
      throw new Error("Missign options object") ;
    }
    
    input = element.querySelector('input[type=file]');
  };
  
  var handleDragEnter = function () {
    element.classList.add(classes.active);
  };
  
  var handleDragLeave = function () {
    element.classList.remove(classes.active);
  };
  
  var handleFileSelect = function (event) {
    var file = event.target.files[0];
    
    renderFile(file);
  };
  
  var renderFile = function (file) {
    var reader = new FileReader();
    
    reader.onload = (function () {
      return function (event) {
        cover.style.backgroundImage = 'url( ' + event.target.result + ' )';
      };
    })(file);
    
    reader.readAsDataURL(file);
  };
  
  init();
};