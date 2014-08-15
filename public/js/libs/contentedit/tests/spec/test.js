/* global describe, it, beforeEach, expect, Contentedit */

(function () {
  'use strict';
  
  var element = document.getElementById('edit');
  
  beforeEach(function () {
    new Contentedit({
      element: element,
      url: '/'
    });
  });

  describe('Contentedit.js', function () {
    it('should return error if options object does not exist', function () {
      try {
        new Contentedit();
      } catch (e) {
        e.message.should.be.eq('Missign options object');
      }
    });
    
    it('should add contenteditable attribute', function () {
      element.getAttribute('contenteditable').should.be.eq('true');
    });
    
    it('should add inline-editable class', function () {
      element.classList.contains('inline-editable').should.be.true;
    });
  });
    
})();
