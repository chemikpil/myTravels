/* global describe: false, beforeEach: false, afterEach: false, it: false, expect: false, sinon: false, Backbone: false, document: false */

beforeEach(function (done) {
  'use strict';
  
  var that = this;
  
  require(['backbone', 'views/join/join'], function (Backbone, Join) {
    that.join = new Join();
    done();
  });
});

describe('Join View', function() {
  'use strict';
  
  it('should be defined', function () {
    expect(this.join).to.be.exist;
  });
    
  it('should has a change event', function () {
    expect(this.join.events['change input[name=email]']).to.equal('checkExistEmail');
  });
  
});