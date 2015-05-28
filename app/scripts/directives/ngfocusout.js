'use strict';

/**
 * @ngdoc directive
 * @name yoNewTestApp.directive:ngFocusOut
 * @description
 * # ngFocusOut
 */
angMod.directive('ngFocusOut', function () {
    return {
        scope: {},
        controller: "IclaimsLineCtrl",
        controllerAs: "iclaimsCtrl",
        restrict: 'A',
        link: function postLink(scope, element, attrs) {

            element.bind('focusout', function (evt) {

                if(attrs.adjlineattr == "oicPaidAmount" && angular.element(element).val() == ""){
                    scope.iclaimsCtrl.lineForm.lineLevelAdjustments[attrs.ngFocusOut].adjustmentPaymentDetail.adjustmentPaidOriginalDate = "";
                }

              scope.iclaimsCtrl.addLineAdjustment(evt, attrs.ngFocusOut, undefined);

            });

        }
    };
  });




