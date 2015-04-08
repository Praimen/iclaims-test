'use strict';

/**
 * @ngdoc filter
 * @name yoNewTestApp.filter:mainFilter
 * @function
 * @description
 * # mainFilter
 * Filter in the yoNewTestApp.
 */
angular.module('yoNewTestApp')
  .filter('mainFilter', function () {
    return function (input) {
      return 'mainFilter filter: ' + input;
    };
  });
