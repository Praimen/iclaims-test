'use strict';

/**
 * @ngdoc filter
 * @name yoNewTestApp.filter:selectedrange
 * @function
 * @description
 * # selectedrange
 * Filter in the yoNewTestApp.
 */

angMod.filter('selectedrange',[ function () {

  return function( items, selectedLineIdx, range ) {


    var filtered = [];
    var curLineIdx = selectedLineIdx + 1;
    var rangeNum = range;
    var startRange = (curLineIdx != null && ((curLineIdx - rangeNum) > 0) ) ? (curLineIdx - rangeNum) : 0;
    var endRange = (curLineIdx != null && ((curLineIdx + rangeNum) < items.length)) ? (curLineIdx + rangeNum) : items.length;
    var item;

    for (var filteredItemIndex = startRange; filteredItemIndex < endRange; filteredItemIndex++) {

        item = items[filteredItemIndex];
        item.idx = filteredItemIndex;
        filtered.push(item);
    }

    return filtered;


  };
}]);
