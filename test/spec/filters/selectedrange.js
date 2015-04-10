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
    var text = '0123456789';
    expect(selectedrange(text, 0, 2).length).toBe(3);
  });

});
