'use strict';


describe('Controller: IclaimsLineCtrl', function () {

  // load the controller's module
  beforeEach(module('yoNewTestApp'));

  var IclaimslineCtrl,
    scope, IclaimsFactory;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, _IclaimsFactory_) {
    scope = $rootScope;
    IclaimsFactory = _IclaimsFactory_;
    IclaimslineCtrl = $controller('IclaimsLineCtrl', {
      $scope: scope
    });
  }));

 it('the service should be in the controller', function () {
   // expect(IclaimsFactory).not.toBeUndefined();
  });

});




