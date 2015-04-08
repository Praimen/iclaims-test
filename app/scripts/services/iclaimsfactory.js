'use strict';

/**
 * @ngdoc service
 * @name yoNewTestApp.IclaimsFactory
 * @description
 * # IclaimsFactory
 * Factory in the yoNewTestApp.
 */
angular.module('yoNewTestApp')
  .factory('IclaimsFactory', function ($window) {
    // Service logic
    // ...
    var extScript = $window;
    var lineData = extScript.lineItems;
    var claimInterObj = extScript.claimTypeObj;

    // Public API here
    return {
      getLineItems: function () {
        return lineData;
      },
      setClaimScope : function(scope){
        claimInterObj.setAngularScope(scope);
      },
      getClaimObj : function(){
        return claimInterObj;
      },
      validateOnStateChange : function(){
        extScript.validateOnStateChange();
      },
      focusFirstLineInput: function(){
        extScript.focusFirstLineInput();
      },
      clearFormErrors: function(){
        extScript.clearFormErrors();
      },
      addSaveBtnToggle : function(strVal){
        extScript.addSaveBtnToggle(strVal);
      },
      getClaimLevelState : function(){
        return extScript.selectedClaimLevel();
      },
      isRecalledClaim : function(){
        return extScript.recalledClaim;
      }



    };

});
