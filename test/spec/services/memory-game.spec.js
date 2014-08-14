'use strict';

describe('Service: memoryGame', function () {

  // load the service's module
  beforeEach(function () {
    module('angularMemoryGameAppInternal');

    //add your mocks here
  });

  // instantiate service
  var MemoryGame;
  beforeEach(inject(function (_MemoryGame_) {
    MemoryGame = _MemoryGame_;
  }));

  it('should do something', function () {
    //expect(memoryGame.someMethod()).toBe(42);
  });

});
