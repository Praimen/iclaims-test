'use strict';

describe('Filter: selectedrange', function () {

  // load the filter's module
  beforeEach(module('yoNewTestApp'));

  // initialize a new instance of the filter before each test
  var selectedrange;
  beforeEach(inject(function ($filter) {
    selectedrange = $filter('selectedrange');
  }));

  it('should return the input prefixed with "selectedrange filter:"', function () {
    var text = 'angularjs';
    expect(selectedrange(text)).toBe('selectedrange filter: ' + text);
  });

});
