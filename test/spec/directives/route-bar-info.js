'use strict';

describe('Directive: routeBarInfo', function () {

  // load the directive's module
  beforeEach(module('routesClientApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<route-bar-info></route-bar-info>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the routeBarInfo directive');
  }));
});
