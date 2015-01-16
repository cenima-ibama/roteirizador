'use strict';

describe('Service: appconfig', function () {

  // load the service's module
  beforeEach(module('routesClientApp'));

  // instantiate service
  var appconfig;
  beforeEach(inject(function (_appconfig_) {
    appconfig = _appconfig_;
  }));

  it('should do something', function () {
    expect(!!appconfig).toBe(true);
  });

});
