'use strict';

var assert = require('assert');
var prompt = require('prompt');
prompt.start();

var board = [
    [' ', ' ', ' '],
    [' ', ' ', ' '],
    [' ', ' ', ' ']
];

var playerTurn = 'X';
var moveCount = 0;

function printBoard() {
    console.log('   0  1  2');
    console.log('0 ' + board[0].join(' | '));
    console.log('  ---------');
    console.log('1 ' + board[1].join(' | '));
    console.log('  ---------');
    console.log('2 ' + board[2].join(' | '));
}

var winCombo = [[board[0][0], board[0][1], board[0][2]],
                [board[1][0], board[1][1], board[1][2]],
                [board[2][0], board[2][1], board[2][2]],
                [board[0][0], board[1][0], board[2][0]],
                [board[0][1], board[1][1], board[2][1]],
                [board[0][2], board[1][2], board[2][2]],
                [board[0][0], board[1][1], board[2][2]],
                [board[0][2], board[1][1], board[2][0]]];

function checkForWin() {
  // for loop doesn't work because mocha test for verticalWin, horizontalWin, etc., which cannot be written in a dry manner.

  for (var i = 0; i < winCombo.length; i++) {
    if (winCombo[i][0] === playerTurn 
        && winCombo[i][1] === playerTurn 
        && winCombo[i][2] === playerTurn) {
          printBoard();
          restartGame();
          console.log('Player ' + playerTurn + ' Won!\n' + 'Restarting game!!!' + '\n');
          return true;
    }
    else {
      return false;
    }
  }
}

function restartGame() {
        moveCount = 0;
        board = [
        [' ', ' ', ' '],
        [' ', ' ', ' '],
        [' ', ' ', ' ']
        ];
        return board;
}

function checkForTie() {
    if (moveCount === 9) {
        printBoard();
        restartGame();
        console.log("It's a tie!\n" + "Restarting game.." + "\n");
    }
}

function ticTacToe(row, column) {
    //makes sure input does not overlap previous inputs.
    if (board[row][column] === 'X' || board[row][column] === 'O') {
        console.log("Invalid entry. Try again..");
        playerTurn = (playerTurn === 'X') ? 'O' : 'X';
    }
    else {
        board[row][column] = playerTurn;
        moveCount++;
    }
    checkForWin();
    checkForTie();
    nextPlayer();
}

function getPrompt() {
    printBoard();
    console.log("It's Player " + playerTurn + "'s turn.");
    prompt.get(['row', 'column'], function (error, result) {
        ticTacToe(result['row'], result['column']);
        getPrompt();
    });
}


// Tests

if (typeof describe !== 'undefined') {

    describe('#ticTacToe()', function () {
        it('should place mark on the board', function () {
            ticTacToe(1, 1);
            assert.deepEqual(board, [ [' ', ' ', ' '], [' ', 'X', ' '], [' ', ' ', ' '] ]);
        });
        it('should alternate between players', function () {
            ticTacToe(0, 0);
            assert.deepEqual(board, [ ['O', ' ', ' '], [' ', 'X', ' '], [' ', ' ', ' '] ]);
        });
        it('should check for vertical wins', function () {
            board = [ [' ', 'X', ' '], [' ', 'X', ' '], [' ', 'X', ' '] ];
            assert.equal(verticalWin(), true);
        });
        it('should check for horizontal wins', function () {
            board = [ ['X', 'X', 'X'], [' ', ' ', ' '], [' ', ' ', ' '] ];
            assert.equal(horizontalWin(), true);
        });
        it('should check for diagonal wins', function () {
            board = [ ['X', ' ', ' '], [' ', 'X', ' '], [' ', ' ', 'X'] ];
            assert.equal(diagonalWin(), true);
        });
        it('should detect a win', function () {
            assert.equal(checkForWin(), true);
        });
    });
} else {

    getPrompt();

}
