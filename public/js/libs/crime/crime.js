var Crime = (function () {
  'use strict';
  
  var form = document.querySelector('[data-crime=true]');
  
  if (!form) {
    return false;
  }
  
  var conf = {
    invalidClass: 'is-invalid',
    msgClass: 'message'
  };
  var message = null;
  
  var checkInputValid = function (input) {
    if (!input.checkValidity()) {
      input.classList.add(conf.invalidClass);
      addMessage(input);
    } else {
      input.classList.remove(conf.invalidClass);
      removeMessage(input);
    }
    
    if (input.dataset.validateMatch && !equalInputs(input)) {
      input.classList.add(conf.invalidClass);
      addMessage(input, input.dataset.mismatchMsg);
    }
  };
  
  var addInvalid = function (input, message) {
    input.classList.add(conf.invalidClass);
    addMessage(input, message);
  };
  
  var removeInvalid = function (input) {
    input.classList.remove(conf.invalidClass);
    removeMessage(input);
  };
  
  var equalInputs = function (input) {
    var inputToEqual = form.querySelector('input[name=' + input.dataset.validateMatch + ']');
    return input.value === inputToEqual.value;
  };
  
  var createMessageElement = function () {
    message = document.createElement('div');
    message.classList.add(conf.msgClass);
    
    var event = new CustomEvent('createMessageTemplate', {'detail': message});
    form.dispatchEvent(event);
  };
  
  var addMessage = function (input, text) {
    if (!message) {
      createMessageElement();
    }
    
    removeMessage(input);
    
    message.textContent = text || input.validationMessage;
    form.insertBefore(message.cloneNode(true), input.nextElementSibling);
  };
  
  var removeMessage = function (input) {
    var prev = input.nextElementSibling;
    
    if (prev.classList.contains(conf.msgClass)) {
      prev.remove();
    }
  };

  form.addEventListener('change', function (event) {
    checkInputValid(event.target);
  });
  
  return {
    addInvalid: addInvalid,
    removeInvalid: removeInvalid
  };
})();