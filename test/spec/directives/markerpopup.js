'use strict';

describe('Directive: markerpopup', function () {

  // load the directive's module
  beforeEach(module('routesClientApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<markerpopup></markerpopup>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the markerpopup directive');
  }));
});
