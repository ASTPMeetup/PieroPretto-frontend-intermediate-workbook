'use strict';

var assert = require('assert');
var prompt = require('prompt');
prompt.start();

function Checker(color) {

    if(color === 'white') {
        this.symbol = String.fromCharCode(0x1263B);
        this.rank = 'white';
    }
    if (color === 'black') {
        this.symbol = String.fromCharCode(0x1263A);
        this.rank = 'black';
    }
    if (color === 'blackKing') {
        this.symbol = String.fromCharCode(0x12654);
        this.rank = 'king';
    }
    if (color === 'whiteKing') {
        this.symbol = String.fromCharCode(0x1265B);
        this.rank = 'king';
    }
}

function Board() {
    this.grid = [];
    this.createGrid = function() {
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
        var white = [[0, 1], [0, 3], [0, 5], [0, 7],
                    [1, 0], [1, 2], [1, 4], [1, 6],
                    [2, 1], [2, 3], [2, 5], [2, 7]];
        var black = [[5, 0], [5, 2], [5, 4], [5, 6],
                    [6, 1], [6, 3], [6, 5], [6, 7],
                    [7, 0], [7, 2], [7, 4], [7, 6]];

        for (var i=0; i <= 11; i++) {
            this.grid[white[i][0]][white[i][1]] = new Checker('white');
            this.grid[black[i][0]][black[i][1]] = new Checker('black');

            this.checkers.push(this.grid[black[i][0]][black[i][1]]);
            this.checkers.push(this.grid[white[i][0]][white[i][1]]);
        }
    }

    this.selectChecker = function(row, column) {
        return this.grid[row][column];
    }

    this.jumpChecker = function(midpoint, startSpot, endSpot) {
        var checkerToKill = this.checkers.indexOf(this.selectChecker(midpoint[0], midpoint[1]));
        this.checkers.splice(checkerToKill, 1);
        this.grid[midpoint[0]][midpoint[1]] = null;
        this.grid[startSpot[0]][startSpot[1]] = null;
    }

    this.checkForBlackKing = function(endSpot) {
      if(this.grid[endSpot[0]] === this.grid[0]) {
        this.grid[endSpot[0]][endSpot[1]] = new Checker('blackKing');
        this.checkers.push(this.grid[endSpot[0]][endSpot[1]]);
      }
    }

    this.checkForWhiteKing = function(endSpot) {
      if(this.grid[endSpot[0]] === this.grid[7]) {
        this.grid[endSpot[0]][endSpot[1]] = new Checker('whiteKing');
        this.checkers.push(this.grid[endSpot[0]][endSpot[1]]);
      }
    }
}

function Game() {

    this.board = new Board();
    this.checkerRank = new Checker();

    this.start = function() {
        this.board.createGrid();
        this.board.createCheckers();
    }

    this.moveChecker = function(start, end) {

      var startSpot = start.split('');
      var endSpot = end.split('');
      var midpoint = ((Number(start) + Number(end)) / 2).toString().split('');
      var checker = this.board.selectChecker(startSpot[0], startSpot[1]);

        if (checker !== null && this.board.grid[endSpot[0]][endSpot[1]] === null) {
            if (checker['rank'] == 'black') {

                if ((Number(start) - Number(end) === 22 || Number(start) - Number(end) === 18) && this.board.grid[midpoint[0]][midpoint[1]] !== null) {
                    this.board.jumpChecker(midpoint, startSpot, endSpot);
                    this.board.grid[endSpot[0]][endSpot[1]] = checker;
                    this.board.checkForBlackKing(endSpot);
                }
                else if (Number(start) - Number(end) === 11 || Number(start) - Number(end) === 9) {
                    this.board.grid[startSpot[0]][startSpot[1]] = null;
                    this.board.grid[endSpot[0]][endSpot[1]] = checker;
                    this.board.checkForBlackKing(endSpot);
                }
                else {
                    console.log('\n' + 'Invalid move! Try again!');
                }
            }
            if (checker['rank'] == 'white') {

                if ((Number(end) - Number(start) === 22 || Number(end) - Number(start) === 18) && this.board.grid[midpoint[0]][midpoint[1]] !== null) {
                    this.board.jumpChecker(midpoint, startSpot, endSpot);
                    this.board.grid[endSpot[0]][endSpot[1]] = checker;
                    this.board.checkForWhiteKing(endSpot);
                }
                else if (Number(end) - Number(start) === 11 || Number(end) - Number(start) === 9) {
                    this.board.grid[startSpot[0]][startSpot[1]] = null;
                    this.board.grid[endSpot[0]][endSpot[1]] = checker;
                    this.board.checkForWhiteKing(endSpot);
                }
                else {
                    console.log('\n' + 'Invalid move! Try again!');
                }
            }
            if (checker['rank'] == 'king') {

                // kings can move backwards
                if ((Math.abs(Number(end) - Number(start)) === 22 || Math.abs(Number(end) - Number(start)) === 18) && this.board.grid[midpoint[0]][midpoint[1]] !== null) {
                    this.board.jumpChecker(midpoint, startSpot, endSpot);
                    this.board.grid[endSpot[0]][endSpot[1]] = checker;
                }
                else if (Math.abs(Number(end) - Number(start)) === 11 || Math.abs(Number(end) - Number(start)) === 9) {
                    this.board.grid[startSpot[0]][startSpot[1]] = null;
                    this.board.grid[endSpot[0]][endSpot[1]] = checker;
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
