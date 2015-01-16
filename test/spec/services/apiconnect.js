'use strict';

describe('Service: apiconnect', function () {

  // load the service's module
  beforeEach(module('routesClientApp'));

  // instantiate service
  var apiconnect;
  beforeEach(inject(function (_apiconnect_) {
    apiconnect = _apiconnect_;
  }));

  it('should do something', function () {
    expect(!!apiconnect).toBe(true);
  });

});
