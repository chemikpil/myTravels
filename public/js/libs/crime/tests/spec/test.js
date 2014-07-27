/* global describe, it, beforeEach, expect */

(function () {
  'use strict';
  
  var form = document.getElementById('form');
  var email = form.querySelector('input[name=email]');
  var reemail = form.querySelector('input[name=reemail]');
  var button = form.querySelector('button');
  var change = null;
  
  beforeEach(function () {
    change = document.createEvent("HTMLEvents");
    change.initEvent("change", true, true);
    
    form.addEventListener('createMessageTemplate', function (event) {
      event.detail.classList.add('message--error');
    }, false);
  });

  describe('Crime.js', function () {
    afterEach(function () {
      form.reset();
    });
    
    it('should add class .is-invalid to invalid input', function () {
      email.value = 'email';
      email.dispatchEvent(change);
      
      email.classList.contains('is-invalid').should.be.true;
    });
    
    it('should remove class .is-invalid when input is valid', function () {
      email.value = 'email';
      email.dispatchEvent(change);
      email.classList.contains('is-invalid').should.be.true;
      
      email.value = 'email@gmail.com';
      email.dispatchEvent(change);
      email.classList.contains('is-invalid').should.be.false;
    });
    
    it('should create message if inpus is invalid', function () {
      email.value = 'email';
      email.dispatchEvent(change);
      
      var message = email.nextElementSibling;
      message.classList.contains('message').should.be.true;
    });
    
    it('should remove message if inpus is invalid', function () {
      email.value = 'email';
      email.dispatchEvent(change);
      
      var message = email.nextElementSibling;
      message.classList.contains('message').should.be.true;
      
      email.value = 'email@gmail.com';
      email.dispatchEvent(change);
      
      message = email.nextElementSibling;
      message.classList.contains('message').should.be.false;
    });
    
    it('should fire createMessageTemplate event', function () {
      email.value = 'email';
      email.dispatchEvent(change);
      
      var message = email.nextElementSibling;
      message.classList.contains('message--error').should.be.true;
    });
    
    it('should add class .is-invalid if emails is doesn\'t match', function () {
      email.value = 'email@gmail.com';
      reemail.value = 'reemail@gmail.com';
      reemail.dispatchEvent(change);
      
      reemail.classList.contains('is-invalid').should.be.true;
    });
    
    it('should create message if emails is doesn\'t match', function () {
      email.value = 'email@gmail.com';
      reemail.value = 'reemail@gmail.com';
      reemail.dispatchEvent(change);
      
      var message = reemail.nextElementSibling;
      message.classList.contains('message').should.be.true;
      message.textContent.should.be.equal('Emails doesn\'t match');
    });
    
    it('should show message from api', function () {
      Crime.addInvalid(email, 'test message');
      
      email.classList.contains('is-invalid').should.be.true;
      
      var message = email.nextElementSibling;
      message.classList.contains('message').should.be.true;
      message.textContent.should.be.equal('test message');
    });
    
    it('should remove message from api', function () {
      Crime.addInvalid(email, 'test message');
      
      email.classList.contains('is-invalid').should.be.true;
      
      var message = email.nextElementSibling;
      message.classList.contains('message').should.be.true;
      message.textContent.should.be.equal('test message');
      
      Crime.removeInvalid(email);
      email.classList.contains('is-invalid').should.be.false;
      message = email.nextElementSibling;
      message.classList.contains('message').should.be.false;
    });
  });
  
})();
