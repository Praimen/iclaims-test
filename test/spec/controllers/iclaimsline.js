'use strict';


describe('Controller: IclaimsLineCtrl', function () {
  var IclaimslineCtrl,
    scope, IclaimsFactory;
  // load the controller's module


  beforeEach(module('yoNewTestApp', function ($provide){
    IclaimsFactory = {
      setClaimScope: jasmine.createSpy(),
      isRecalledClaim: jasmine.createSpy(),
      getLineItems: jasmine.createSpy(),
      getClaimObj: jasmine.createSpy()
    };

    $provide.value('IclaimsFactory',IclaimsFactory);
  }));



  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, _IclaimsFactory_) {
    scope = $rootScope.$new();
    IclaimsFactory = _IclaimsFactory_;
    IclaimslineCtrl = $controller('IclaimsLineCtrl', {
      $scope: scope
    });


  }));

 it('the service should be in the controller', function () {
    expect(IclaimsFactory).not.toBeUndefined();
  });

  it('does the scope have the fucntions needed', function () {
    expect(angular.isFunction(IclaimslineCtrl)).toBe(true);
  });


});




