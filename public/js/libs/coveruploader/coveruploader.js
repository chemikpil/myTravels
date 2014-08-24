var Coveruploader = function (options) {
  'use strict';
  
  var element;
  var url;
  var input;
  var cover;
  var selectedFile = null;
  
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
    selectedFile = event.target.files[0];
    
    renderFile(selectedFile);
  };
  
  var renderFile = function (file) {
    var reader = new FileReader();
    
    reader.onload = (function () {
      return function (event) {
        cover.style.backgroundImage = 'url( ' + event.target.result + ' )';
      };
    })(file);
    
    reader.readAsDataURL(file);
    ajax(function () {
      console.log('Uploaded!');
    });
  };
  
  var ajax = function (success) {
    var xhr = new XMLHttpRequest();
    var formData = new FormData();
    var csrf = element.querySelector('[name=_csrf]');
    
    formData.append(input.name, selectedFile, selectedFile.name);
    formData.append(csrf.name, csrf.value);
    
    xhr.open("POST", url , true);
    
    xhr.onload = function(){
      var error = false;
      var content = xhr.responseText;

      if (!error && (xhr.status >= 200 && xhr.status < 300)){
        success(content);
      }
    };
    
    console.log(formData);
    
    xhr.send(formData);
  };
  
  init();
};