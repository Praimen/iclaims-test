'use strict';


describe('Controller: IclaimsLineCtrl', function () {

  // load the controller's module
  beforeEach(module('yoNewTestApp'));

  var IclaimslineCtrl,
    scope,lineItemFactory;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, _lineItemFactory_) {
    scope = $rootScope;
    lineItemFactory = _lineItemFactory_;
    IclaimslineCtrl = $controller('IclaimsLineCtrl', {
      $scope: scope
    });
  }));

 it('the service should be in the controller', function () {
    expect(lineItemFactory).not.toBeUndefined();
  });

});




