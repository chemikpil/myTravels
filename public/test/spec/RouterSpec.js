/* global describe: false, beforeEach: false, afterEach: false, it: false, expect: false, sinon: false, Backbone: false */

beforeEach(function (done) {
  'use strict';
  
  var that = this;
  require(['backbone', 'router'], function (Backbone, Router) {
    that.router = new Router();
    
    that.routeSpy = sinon.spy();
    that.router.navigate('test/index.html');
    
    done();
  });
});

afterEach(function (done) {
  'use strict';
  this.router.navigate('test/index.html');
  done();
});

describe('Router', function() {
  'use strict';
  
  it('should be defined', function () {
    expect(this.router).to.be.exist;
  });
    
  it('should has a /join route', function () {
    expect(this.router.routes.join).to.equal('join');
  });
    
  it('should triggers the /join route', function () {
    this.router.bind('route:join', this.routeSpy);
    this.router.navigate('join', true);
    
    expect(this.routeSpy.calledOnce).to.be.true;
    expect(this.routeSpy.calledWith()).to.be.true;
  });
  
});