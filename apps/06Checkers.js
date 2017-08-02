'use strict';

var assert = require('assert');
var prompt = require('prompt');
prompt.start();

var whiteChecker = String.fromCharCode(0x1263B);
var whiteKing = String.fromCharCode(0x1265B);
var blackChecker = String.fromCharCode(0x1263A);
var blackKing = String.fromCharCode(0x12654);

function Checker(color) {

    if(color === 'white') {
        this.symbol = whiteChecker;
        this.rank = 'white';
    }
    if (color === 'black') {
        this.symbol = blackChecker;
        this.rank = 'black';
    }
    if (color === 'blackKing') {
        this.symbol = blackKing;
        this.rank = 'king';
    }
    if (color === 'whiteKing') {
        this.symbol = whiteKing;
        this.rank = 'king';
    }
}

function Board() {
    this.grid = [];
    this.createGrid = function() {
        this.grid = [];
        for (var row = 0; row < 8; row++) {
            this.grid[row] = [];
            for (var column = 0; column < 8; column++) {
                this.grid[row].push(null);
            }
        }
    }

    this.viewGrid = function() {
        var string = "  0 1 2 3 4 5 6 7\n";
        for (var row = 0; row < 8; row++) {
            var rowOfCheckers = [row];

            for (var column = 0; column < 8; column++) {

                if (this.grid[row][column]) {

                    rowOfCheckers.push(this.grid[row][column].symbol);
                } else {

                    rowOfCheckers.push(' ');
                }
            }
            string += rowOfCheckers.join(' ');

            string += "\n";
        }
        console.log(string);
    }

    this.checkers = [];

    this.createCheckers = function() {
        this.checkers = [];
        this.blackCount = 0;
        this.whiteCount = 0;

        var white = [[2, 3], [2, 5], [0, 5], [0, 7],
                    [1, 0], [1, 2], [1, 4], [1, 6],
                    [2, 1], [0, 1], [0, 3], [2, 7]];
        var black = [[5, 0], [5, 2], [5, 4], [5, 6],
                    [6, 1], [6, 3], [6, 5], [6, 7],
                    [7, 0], [7, 2], [7, 4], [7, 6]];

        for (var i=0; i < black.length; i++) {
            this.grid[white[i][0]][white[i][1]] = new Checker('white');
            this.grid[black[i][0]][black[i][1]] = new Checker('black')

            this.whiteCount += 1;
            this.checkers.push(this.grid[white[i][0]][white[i][1]]);
            this.blackCount += 1;
            this.checkers.push(this.grid[black[i][0]][black[i][1]]);
        }
    }

    this.whiteCount = 0;
    this.blackCount = 0;

    this.selectChecker = function(row, column) {
        return this.grid[row][column];
    }

    this.jumpChecker = function(midpoint, start, end, checker) {
        var checkerToKill = this.selectChecker(midpoint[0], midpoint[1]);
        var killSpot = this.checkers.indexOf(checkerToKill);
        this.checkers.splice(killSpot, 1);

        this.grid[midpoint[0]][midpoint[1]] = null;
        this.grid[start[0]][start[1]] = null;
        this.grid[end[0]][end[1]] = checker;

        this.checkForWin(checkerToKill, end);
    }

    this.checkForBlackKing = function(end) {
      if(this.grid[end[0]] === this.grid[0]) {
        this.grid[end[0]][end[1]] = new Checker('blackKing');
        this.checkers.push(this.grid[end[0]][end[1]]);
      }
    }

    this.checkForWhiteKing = function(end) {
      if(this.grid[end[0]] === this.grid[7]) {
        this.grid[end[0]][end[1]] = new Checker('whiteKing');
        this.checkers.push(this.grid[end[0]][end[1]]);
      }
    }
    this.checkForWin = function(checker, end) {
      if (checker.symbol === whiteChecker || checker.symbol === whiteKing) {
        this.whiteCount -= 1;
        if(this.whiteCount === 0) {
          console.log('\n' + 'Black checkers win!' + '\n');
          this.resetGame(end);
        };
      }
      if (checker.symbol === blackChecker || checker.symbol === blackKing) {
        this.blackCount -= 1;
        if(this.blackCount === 0) {
          console.log('\n' + 'White checkers win!' + '\n');
          this.resetGame(end);
        };
      }
    }

    this.resetGame = function(end) {
      this.grid[end[0]][end[1]] = null;
      this.createGrid();
      this.createCheckers();
    };
}

function Game() {

    this.board = new Board();
    this.checkerRank = new Checker();

    this.start = function() {
        this.board.createGrid();
        this.board.createCheckers();
    }

    this.checkForEmptySpot = function(spot) {
      return this.board.grid[spot[0]][spot[1]] === null;
    }
    this.moveChecker = function(start, end) {
      var startNum = Number(start);
      var endNum = Number(end);

      var midpoint = ((parseInt(end) + parseInt(start)) / 2).toString();
      var checker = this.board.selectChecker(start[0], start[1]);

        if (checker !== null && this.checkForEmptySpot(end)) {
            if (checker['rank'] == 'black') {

                if ((startNum - endNum === 22 || startNum - endNum === 18) && !this.checkForEmptySpot(midpoint)) {
                    this.board.jumpChecker(midpoint, start, end, checker);
                    this.board.checkForBlackKing(end);
                }
                else if (startNum - endNum === 11 || startNum - endNum === 9) {
                    this.board.grid[start[0]][start[1]] = null;
                    this.board.grid[end[0]][end[1]] = checker;
                    this.board.checkForBlackKing(end);
                }
                else {
                    console.log('\n' + 'Invalid move! Try again!');
                }
            }
            if (checker['rank'] == 'white') {

                if ((endNum - startNum === 22 || endNum - startNum === 18) && !this.checkForEmptySpot(midpoint)) {
                    this.board.jumpChecker(midpoint, start, end, checker);
                    this.board.checkForWhiteKing(end);
                }
                else if (endNum - startNum === 11 || endNum - startNum === 9) {
                    this.board.grid[start[0]][start[1]] = null;
                    this.board.grid[end[0]][end[1]] = checker;
                    this.board.checkForWhiteKing(end);
                }
                else {
                    console.log('\n' + 'Invalid move! Try again!');
                }
            }
            if (checker['rank'] == 'king') {

                // kings can move backwards
                if ((Math.abs(endNum - startNum) === 22 || Math.abs(endNum - startNum) === 18) && !this.checkForEmptySpot(midpoint)) {
                    this.board.jumpChecker(midpoint, start, end, checker);
                }
                else if (Math.abs(endNum - startNum) === 11 || Math.abs(endNum - startNum) === 9) {
                    this.board.grid[start[0]][start[1]] = null;
                    this.board.grid[end[0]][end[1]] = checker;
                }
                else {
                    console.log('\n' + 'Invalid move! Try again!');
                }
            }
        }
        else {
            console.log('\n' + 'Invalid move! Try again!');
        }
    }

}

function getPrompt() {
    game.board.viewGrid();
    prompt.get(['which piece?', 'to where?'], function (error, result) {
        game.moveChecker(result['which piece?'], result['to where?']);
        getPrompt();
    });
}

var game = new Game();
game.start();


// Tests

if (typeof describe !== 'undefined') {
    describe('Game', function() {
        it('should have a board', function() {
            assert.equal(game.board.constructor.name, 'Board');
        });
        it('board should have 24 checkers', function() {
            assert.equal(game.board.checkers.length, 24);
        });
    });

    describe('Game.moveChecker()', function () {
        it('should move a checker', function () {
            assert(!game.board.grid[4][1])
            game.moveChecker('50', '41');
            assert(game.board.grid[4][1]);
            game.moveChecker('21', '30');
            assert(game.board.grid[3][0]);
            game.moveChecker('52', '43');
            assert(game.board.grid[4][3]);
        });
        it('should be able to jump over and kill another checker', function() {
            game.moveChecker('30', '52');
            assert(game.board.grid[5][2]);
            assert(!game.board.grid[4][1]);
            assert.equal(game.board.checkers.length, 23);
        });
    });
} else {
    getPrompt();
}
