'use strict';

var assert = require('assert');
var prompt = require('prompt');
prompt.start();

function Checker(color) {

    if(color === 'white') {
        this.symbol = String.fromCharCode(0x1263A);
        this.rank = 'white';
    }
    if (color === 'black') {
        this.symbol = String.fromCharCode(0x1263B);
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


    this.killChecker = function(midpoint, startSpot, endSpot, checker) {
        var checkerToKill = this.checkers.indexOf(this.selectChecker(midpoint[0], midpoint[1]));
        console.log(checkerToKill);

        this.checkers.splice(checkerToKill, 1);

        console.log(this.checkers.splice(checkerToKill, 1));

        this.grid[midpoint[0]][midpoint[1]] = null;
        this.grid[startSpot[0]][startSpot[1]] = null;
        this.grid[endSpot[0]][endSpot[1]] = checker;
    }

    this.checkForBlackKing = function(endSpot) {
      if(this.grid[endSpot[0]] === this.grid[0]) {
        var kill = this.checkers.indexOf(this.selectChecker(endSpot[0], endSpot[1]));
        this.checkers.splice(kill, 1);
        this.grid[endSpot[0]][endSpot[1]] = null;
        this.grid[endSpot[0]][endSpot[1]] = new Checker('blackKing');
        this.checkers.push(this.grid[position[0]][position[1]]);
      }
    }

    this.whiteKing = function(position) {
        var kill = this.checkers.indexOf(this.selectChecker(position[0], position[1]));
        this.checkers.splice(kill, 1);
        this.grid[position[0]][position[1]] = null;
        this.grid[position[0]][position[1]] = new Checker('whiteKing');
        this.checkers.push(this.grid[position[0]][position[1]]);
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
      var startNum = Number(start);
      var endNum = Number(end);
      var startSpot = start.split('');
      var endSpot = end.split('');
      var total = startNum + endNum;
      var killPosition = (total / 2);
      var stringIt = killPosition.toString();
      var midpoint = stringIt.split("");
        // var midpoint = ((Number(start) + Number(end)) / 2).toString().split('');
        var checker = this.board.selectChecker(startSpot[0], startSpot[1]);
        if (checker !== null && this.board.grid[endSpot[0]][endSpot[1]] === null) {
            if (checker['rank'] == 'black') {

                //checks to see if you're jumping another checker
                if (Number(start) - Number(end) === 22 || Number(start) - Number(end) === 18) {
                    if (this.board.grid[midpoint[0]][midpoint[1]] !== null) {
                        this.board.killChecker(midpoint, startSpot, endSpot, checker);
                                // this.grid[endSpot[0]][endSpot[1]] = checker;
                        this.board.checkForBlackKing(endSpot);
                    }
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
                if (Number(end) - Number(start) === 22 || Number(end) - Number(start) === 18) {
                    if (this.board.grid[midpoint[0]][midpoint[1]] !== null) {
                        this.board.killChecker(midpoint);
                        this.board.grid[startSpot[0]][startSpot[1]] = null;
                        this.board.grid[endSpot[0]][endSpot[1]] = checker;
                        if (this.board.grid[endSpot[0]] === this.board.grid[7]) {
                            this.board.blackKing(endSpot);
                        }
                    }
                    else {
                        console.log('\n' + 'Invalid move! Try again!');
                    }
                }
                else if (Number(end) - Number(start) === 11 || Number(end) - Number(start) === 9) {
                    this.board.grid[startSpot[0]][startSpot[1]] = null;
                    this.board.grid[endSpot[0]][endSpot[1]] = checker;
                    if (this.board.grid[endSpot[0]] === this.board.grid[7]) {
                        this.board.blackKing(endSpot);
                    }
                }
                else {
                    console.log('\n' + 'Invalid move! Try again!');
                }
            }
            if (checker['rank'] == 'king') {
                if (Math.abs(Number(end) - Number(start)) === 22 || Math.abs(Number(end) - Number(start)) === 18) {
                    if (this.board.grid[midpoint[0]][midpoint[1]] !== null) {
                        this.board.killChecker(midpoint);
                        this.board.grid[startSpot[0]][startSpot[1]] = null;
                        this.board.grid[endSpot[0]][endSpot[1]] = checker;
                    }
                    else {
                        console.log('\n' + 'Invalid move! Try again!');
                    }
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
        console.log(this.board.checkers.length);
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
getPrompt();
