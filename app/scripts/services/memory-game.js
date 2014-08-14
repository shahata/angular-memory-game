'use strict';

(function () {

  /* @ngInject */
  function memoryGameFactory() {

    function Tile(title) {
      this.title = title;
      this.flipped = false;
    }

    Tile.prototype.flip = function () {
      this.flipped = !this.flipped;
    };

    function makeGrid(tileNames) {
      var tileDeck = [];
      tileNames.forEach(function (name) {
        tileDeck.push(new Tile(name));
        tileDeck.push(new Tile(name));
      });

      var gridDimension = Math.sqrt(tileDeck.length),
          grid = [];

      _(gridDimension).times(function (row) {
        grid[row] = [];
        _(gridDimension).times(function (col) {
          var i = Math.floor(Math.random() * tileDeck.length);
          grid[row][col] = tileDeck.splice(i, 1)[0];
        });
      });

      return grid;
    }

    function MemoryGame(tileNames) {
      var currentPair = [];
      this.grid = makeGrid(tileNames);
      this.message = 'MESSAGE_CLICK';
      this.unmatchedPairs = tileNames.length;

      function hideUnmatchedPairIfNeeded() {
        if (currentPair.length === 2) {
          currentPair[0].flip();
          currentPair[1].flip();
          currentPair = [];
        }
      }

      this.flipTile = function (tile) {
        if (tile.flipped) {
          return;
        }

        hideUnmatchedPairIfNeeded();
        tile.flip();
        currentPair.push(tile);

        if (currentPair.length === 1) {
          this.message = 'MESSAGE_ONE_MORE';
        } else if (currentPair[0].title !== currentPair[1].title) {
          this.message = 'MESSAGE_MISS';
        } else {
          this.unmatchedPairs--;
          this.message = (this.unmatchedPairs > 0) ? 'MESSAGE_MATCH' : 'MESSAGE_WON';
          currentPair = [];
        }
      };
    }

    return MemoryGame;
  }

  angular
    .module('angularMemoryGameAppInternal')
    .factory('MemoryGame', memoryGameFactory);

})();
