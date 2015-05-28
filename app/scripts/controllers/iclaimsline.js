'use strict';

/**
 * @ngdoc function
 * @name yoNewTestApp.controller:IclaimsLineCtrl
 * @description
 * # IclaimsLineCtrl
 * Controller of the yoNewTestApp
 *
 * find a way to take out the references to jquery
 */
angMod.controller('IclaimsLineCtrl',['$scope','$timeout','IclaimsFactory','selectedrangeFilter','underscore', function ($scope,$timeout,IclaimsFactory,$selectedRangeFilter,_) {
  var iclaimsCtrl = this;
  IclaimsFactory.setClaimScope(iclaimsCtrl);

  iclaimsCtrl.validateOnStateChange = IclaimsFactory.validateOnStateChange;
  iclaimsCtrl.focusFirstLineInput = IclaimsFactory.focusFirstLineInput;
  iclaimsCtrl.clearFormErrors = IclaimsFactory.clearFormErrors;
  iclaimsCtrl.addSaveBtnToggle = IclaimsFactory.addSaveBtnToggle;
  iclaimsCtrl.getClaimLevelState = IclaimsFactory.getClaimLevelState;
  iclaimsCtrl.claimObj = IclaimsFactory.getClaimObj();
  iclaimsCtrl.isRecall = IclaimsFactory.isRecalledClaim();
  iclaimsCtrl.claimLines = IclaimsFactory.getLineItems();
  iclaimsCtrl.init = IclaimsFactory.init;

  iclaimsCtrl.selectedLineIdx = null;
  iclaimsCtrl.clearListObj = clearListObj;
  iclaimsCtrl.updateObj = updateObj;
  iclaimsCtrl.deleteObj = deleteObj;
  iclaimsCtrl.deleteLineAdj = deleteLineAdj;
  iclaimsCtrl.addLineAdjustment = addLineAdjustment;
  iclaimsCtrl.selectListObj = selectListObj;
  iclaimsCtrl.lineAdjLevelInit = lineAdjLevelInit;
  iclaimsCtrl.checkSelectedLine = checkSelectedLine;
  iclaimsCtrl.searchLines = searchLines;
  iclaimsCtrl.listRange = iclaimsCtrl.claimObj.listRange - 1;
  iclaimsCtrl.selected = null;


  iclaimsCtrl.isActive = function(index) {
    return iclaimsCtrl.selected === index;
  };

  $scope.init = function(){
    updateFilteredLines(null);
  };

  function updateFilteredLines(selectedLine){
    iclaimsCtrl.claimLinesFiltered =  $selectedRangeFilter(iclaimsCtrl.claimLines, selectedLine, iclaimsCtrl.listRange);
    select(selectedLine);
  }

  function updateObj(isAdjustment){
    var lineInfoFormInputs = $('#lineInfoForm input,#lineInfoForm select');

    if(!isAdjustment) {/*are we trying to update an adjustment or not*/

      applyDataValidationToFieldArray(lineInfoFormInputs);

      var lineFieldErrors = $('input.error,select.error','#lineInfoForm');

      if ( (lineFieldErrors.length > 0 ) ) {
        openModal(400, 200, modalOkBtn, "<div>Errors Were Found on this Line Entry, please correct the error to add line to claim.</div>",
                  {options: {title: "Line Entry Error"}});
      } else {

        iclaimsCtrl.claimObj.lineAutoPopVal();

        if (iclaimsCtrl.selectedLineIdx === null) {/*if none is selected then add to the array*/
            if( iclaimsCtrl.claimObj.maxLinesAdded() ){
                return;
            }else if( ( (iclaimsCtrl.claimObj.claimType == "Dental" || iclaimsCtrl.claimObj.claimType == "Professional") && iclaimsCtrl.isRecall) ){
                openModal(400, 200, modalOkBtn, "<div>Revenue Lines <b>CANNOT BE ADDED</b> to this type of recalled claim.</div>",{options: {title: "Unable to Add Line"}});
                return;
            } else{
              iclaimsCtrl.claimLines.push(iclaimsCtrl.lineForm);
              updateFilteredLines(iclaimsCtrl.claimLines.length - 1);
              window.lineItemNum = iclaimsCtrl.claimLines.length - 1;
            }

        } else {
          _.extend(iclaimsCtrl.claimLines[iclaimsCtrl.selectedLineIdx],iclaimsCtrl.lineForm);
          updateFilteredLines(iclaimsCtrl.selectedLineIdx);
        }

        iclaimsCtrl.clearListObj({focusFirstInput:true});
        $timeout(function(){
          scrollFieldToTop({scrollObj:$('.active'),scrollCont:$('.scrollTblContent'),scrollUpCont:$('li')});
        },50);

      }
    }else {
        _.extend(iclaimsCtrl.claimLines[iclaimsCtrl.selectedLineIdx],iclaimsCtrl.lineForm);
    }

  }


  function clearListObj(confObj){
    var configObj = confObj || {};
    iclaimsCtrl.lineForm = {};
    iclaimsCtrl.selectedLineIdx = null;
    iclaimsCtrl.addSaveBtnToggle('Add');
    iclaimsCtrl.validateOnStateChange();
    iclaimsCtrl.clearFormErrors();

    $timeout(function(){
      if(configObj.focusFirstInput !== false){
        iclaimsCtrl.focusFirstLineInput();
      }
    },10);

  }

  function deleteObj(e){
    iclaimsCtrl.claimLines.splice(e,1);
    iclaimsCtrl.clearListObj();
    updateFilteredLines(e - 1);
  }

  function deleteLineAdj(e,adjRowIdx,detailObjIdx){
    var adjInput = angular.element(e)[0];
    var adjRow = $(adjInput.target).closest('.ifAllSet').find('input');
    var selectedLineAdj = iclaimsCtrl.claimLines[iclaimsCtrl.selectedLineIdx].lineLevelAdjustments;

    if( ( selectedLineAdj != undefined )  && (selectedLineAdj[adjRowIdx].adjustmentLineDetails[detailObjIdx] != undefined) ){

      selectedLineAdj[adjRowIdx].adjustmentLineDetails.splice(detailObjIdx,1);
      iclaimsCtrl.lineForm.lineLevelAdjustments[adjRowIdx].adjustmentLineDetails[detailObjIdx] = {};
      clearErrors($(adjRow));
    }
  }

  function addLineAdjustment(e,adjRowIdx,detailObjIdx){

    var adjInput = angular.element(e)[0];
    var adjRow = $(adjInput.target).closest('.ifAllSet');

    if( iclaimsCtrl.selectedLineIdx != null){ /*was a line selected before trying to enter an adjustment*/

        if (detailObjIdx != undefined) {

            /*if you pass detailObjIdx then you are a line adjustment left side edit*/
            if ( adjRow.find('.error').length == 0 && (adjRow.find('.filled').length == adjRow.find('.ifOneThenAllValidation').length) ) {

              var filledFields = adjRow.find('.ifOneThenAllValidation'), field, fieldAttr;

              for (var i = 0; i < filledFields.length; i++) {
                  field = $(filledFields[i]);
                  fieldAttr = field.attr('adjLineAttr');
                  iclaimsCtrl.lineForm.lineLevelAdjustments[adjRowIdx].adjustmentLineDetails[detailObjIdx][fieldAttr] = field.val().toUpperCase();
              }

              iclaimsCtrl.updateObj(true);

            } else if ( adjRow.find('.blank').length == adjRow.find('.ifOneThenAllValidation').length ) {
                iclaimsCtrl.deleteLineAdj(e,adjRowIdx,detailObjIdx);
            }
        }else if( !$(adjInput.target).hasClass('error') && $('.adjustmentContainer .error').length == 0  ) {
            /*this field is not in error && there are no errors in the adjustment container && there are no errors on the lines*/
            iclaimsCtrl.updateObj(true);
        }
    }
  }

  function selectListObj(e,obj){

    var configObj = obj || {};
    window.lineItemNum = e; //set new global
    iclaimsCtrl.clearListObj(configObj);
    iclaimsCtrl.selectedLineIdx = e;
    iclaimsCtrl.lineAdjLevelInit();
    iclaimsCtrl.addSaveBtnToggle('Save');

    $.extend(true,iclaimsCtrl.lineForm,iclaimsCtrl.claimLines[iclaimsCtrl.selectedLineIdx]);/*jquery extend with a deep copy*/

    if(configObj.index == 0 || configObj.search || ( (iclaimsCtrl.selectedLineIdx + 1) % iclaimsCtrl.listRange) == 0){
      updateFilteredLines(iclaimsCtrl.selectedLineIdx);
    } else{
      select(iclaimsCtrl.selectedLineIdx);
    }
  }


  function lineAdjLevelInit(){

    var claimLevelState = iclaimsCtrl.getClaimLevelState();

    if(claimLevelState > 1) {
        iclaimsCtrl.lineForm.lineLevelAdjustments = [];
        iclaimsCtrl.lineForm.lineLevelAdjustments[0] = {cobRecordType:"PRIMARY",adjustmentLineDetails:[],adjustmentPaymentDetail:{}};
        iclaimsCtrl.lineForm.lineLevelAdjustments[0].adjustmentLineDetails = [{},{},{},{},{},{}];
    }

    if(claimLevelState > 2) {
        iclaimsCtrl.lineForm.lineLevelAdjustments[1] = {cobRecordType:"SECONDARY",adjustmentLineDetails:[],adjustmentPaymentDetail:{}};
        iclaimsCtrl.lineForm.lineLevelAdjustments[1].adjustmentLineDetails = [{},{},{},{},{},{}];
    }
  }

  function checkSelectedLine(){

    $timeout(function() {
        if( iclaimsCtrl.selectedLineIdx == null ){
            if(iclaimsCtrl.claimObj.minLinesAdded()){
              //iclaimsCtrl.selectListObj(iclaimsCtrl.claimLines.length-1);/*select the last line*/
              iclaimsCtrl.selectListObj(0,{focusFirstInput:false});/*select the first line*/
            }else{
                $('.ui-dialog .ui-dialog-buttonset button').focus();
            }
        }
    });
  }

  function select(index){
    iclaimsCtrl.selected = index;
  }

  function searchLines(){
    var lineNumber = +iclaimsCtrl.lineSearch - 1;
    selectListObj(lineNumber,{search:true});
    window.lineItemNum = lineNumber;
    $timeout(function(){
      scrollFieldToTop({scrollObj:$('.active'),scrollCont:$('.scrollTblContent'),scrollUpCont:$('li')});
    },50);

  }

  iclaimsCtrl.init($scope);

}]);
