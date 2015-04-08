'use strict';

describe('Directive: ngFocusOut', function () {

    // load the directive's module
    beforeEach(module('yoNewTestApp'));

    var element,
        scope,
        compiled,
        html,
        IclaimslineCtrl,
        lineItemFactory;


    beforeEach(inject(function ($controller, $compile,$rootScope, _lineItemFactory_) {


        html = '<input type="text"  adjLineAttr="oicPaidAmount" ng-model="lineForm.lineLevelAdjustments[0].adjustmentPaymentDetail.oicPaidAmount" ng-focus-out="0" ng-focus="checkSelectedLine()"/>';

        //create a scope (you could just use $rootScope, I suppose)
        scope = $rootScope;

        lineItemFactory = _lineItemFactory_;
        IclaimslineCtrl = $controller('IclaimslineCtrl', {
            $scope: scope
        });
        spyOn(scope, 'addLineAdjustment').and.callThrough();

        scope.lineForm = {};
        scope.lineForm.lineLevelAdjustments = [];
        scope.lineForm.lineLevelAdjustments[0] = {cobRecordType:"PRIMARY",adjustmentLineDetails:[],adjustmentPaymentDetail:{}};
        scope.lineForm.lineLevelAdjustments[0].adjustmentLineDetails = [{},{},{},{},{},{}];
        scope.lineForm.lineLevelAdjustments[0].adjustmentPaymentDetail.adjustmentPaidOriginalDate = "12/12/74";

        //get the jqLite or jQuery element
        element = angular.element(html);

        //compile the element into a function to
        // process the view.
        compiled = $compile(element);

        //run the compiled view.
        compiled(scope);

        //call digest on the scope!
        scope.$digest();

    }));

    it('the amount is SET, the date can be SET', function () {

        scope.lineForm.lineLevelAdjustments[0].adjustmentPaymentDetail.oicPaidAmount = 12.00;
        scope.$digest();
       /* browserTrigger(element,'focusout');*/
        element.triggerHandler('focusout');

        expect(scope.lineForm.lineLevelAdjustments[0].adjustmentPaymentDetail.adjustmentPaidOriginalDate)
            .toBe("12/12/74");

    });

    it('the amount is EMPTY, the date should be EMPTY', function () {

        scope.lineForm.lineLevelAdjustments[0].adjustmentPaymentDetail.oicPaidAmount = "";
        scope.$digest();
       /* browserTrigger(element,'focusout');*/
        element.triggerHandler('focusout');

        expect(scope.lineForm.lineLevelAdjustments[0].adjustmentPaymentDetail.adjustmentPaidOriginalDate)
            .toBe("");

    });

    it('on focusout the addLineAdjustment should be called', function () {
        scope.$digest();
        element.triggerHandler('focusout');
        expect(scope.addLineAdjustment).toHaveBeenCalled() ;
    });

});
