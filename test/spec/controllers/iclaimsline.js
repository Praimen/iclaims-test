'use strict';


describe('Controller: IclaimsLineCtrl', function () {
  var IclaimslineCtrl, scope, IclaimsFactory,iclaimsCtrl;
  // load the controller's module


  beforeEach(module('yoNewTestApp', function ($provide){

    var IclaimsFactoryObj = {
      setClaimScope: jasmine.createSpy(),
      isRecalledClaim: jasmine.createSpy(),
      getLineItems: jasmine.createSpy(),
      init: jasmine.createSpy(),

      getClaimObj: jasmine.createSpy().and.callFake(function(){

        return {};
      })
    };

    $provide.value('IclaimsFactory',IclaimsFactoryObj);
  }));

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($rootScope,$controller, _IclaimsFactory_) {
    scope = $rootScope;
    IclaimsFactory = _IclaimsFactory_;

    IclaimslineCtrl = $controller('IclaimsLineCtrl', {
      $scope: scope,
      $factory: IclaimsFactory
    });

  }));

  it('the service should be in the controller', function () {
    expect(IclaimsFactory).not.toBeUndefined();
  });

  it('the init function is in the service', function () {
    expect(angular.isFunction(IclaimslineCtrl.init)).toBe(true);
  });

  it('the service should be in the controller', function () {

    expect(IclaimslineCtrl).not.toBeUndefined();
  });


});




