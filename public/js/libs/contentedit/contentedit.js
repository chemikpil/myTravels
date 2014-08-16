var Contentedit = function (options) {
  'use strict';
  
  var element;
  var url;
  
  var classes = {
    init: 'inline-editable',
    saving: 'is-saving',
    saved: 'is-saved'
  };
  
  var init = function () {
    setOptions();
    addContenteditable();
    
    element.classList.add(classes.init);
  };
  
  var ajax = function (data, success) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url , true);
    
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function(){
      var error = false;
      var content = xhr.responseText;

      if (!error && (xhr.status >= 200 && xhr.status < 300)){
        success(content);
      }
    };
    
    xhr.send('data='+data);
  };
  
  var setOptions = function () {
    if (options && options.element && options.url) {
      element = options.element;
      url = options.url;
    } else {
      throw new Error("Missign options object") ;
    }
  };
  
  var addContenteditable = function () {
    element.setAttribute('contenteditable', true); 
  };
  
  var removeContenteditable = function () {
    element.removeAttribute('contenteditable');
  };
  
  var savingData = function () {
    removeContenteditable();
    element.classList.add(classes.saving);
    
    ajax(element.textContent, function () {
      element.classList.remove(classes.saving);
      element.classList.add(classes.saved);
      
      window.setTimeout(function () {
        element.classList.remove(classes.saved);
        addContenteditable();
      }, 3000);
    });
  };
  
  init();
  
  element.addEventListener('focusout', function (event) {
    savingData();
  });
};