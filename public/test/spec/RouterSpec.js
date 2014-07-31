describe('Router', function() {
  'use strict';
  
  beforeEach(function (done) {
    var that = this;
    require(['router'], function (Router) {
      that.Router = Router;
      done();
    });
  });
  
  it('Router should be defined', function () {
    expect(this.Router).to.be.exist;
  });
  
});