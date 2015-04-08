'use strict';

describe('Service: IclaimsFactory', function () {

  // load the service's module
  beforeEach(module('yoNewTestApp'));

  // instantiate service
  var IclaimsFactory;
  beforeEach(inject(function (_IclaimsFactory_) {
    IclaimsFactory = _IclaimsFactory_;
  }));

  it('should do something', function () {
    expect(!!IclaimsFactory).toBe(true);
  });

  it('the service has a method getLineItems', function () {
    expect(angular.isFunction(IclaimsFactory.getLineItems)).toBe(true);
  });

});
