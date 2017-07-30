'use strict';

const assert = require('assert');
const prompt = require('prompt');
prompt.start();

let board = [
    [' ', ' ', ' '],
    [' ', ' ', ' '],
    [' ', ' ', ' ']
];

let playerTurn = 'X';
let moveCount = 0;

function printBoard() {
    console.log('   0  1  2');
    console.log('0 ' + board[0].join(' | '));
    console.log('  ---------');
    console.log('1 ' + board[1].join(' | '));
    console.log('  ---------');
    console.log('2 ' + board[2].join(' | '));
}

function checkForWin() {
  
  // winnningCombos variable contains all 9 winning move combinations. 
  // Each array inside winningCombos contains 3 spots a playerTurn (ex: 'X' or '0") must exist in simultanouesly to win the game.
  const winningCombos = [   
                            [board[0][0], board[0][1], board[0][2]],
                            [board[1][0], board[1][1], board[1][2]],
                            [board[2][0], board[2][1], board[2][2]],
                            [board[0][0], board[1][0], board[2][0]],
                            [board[0][1], board[1][1], board[2][1]],
                            [board[0][2], board[1][2], board[2][2]],
                            [board[0][0], board[1][1], board[2][2]],
                            [board[0][2], board[1][1], board[2][0]] 
                        ];

  for (var i = 0; i < winningCombos.length; i++) {
    if (winningCombos[i][0] === playerTurn && 
        winningCombos[i][1] === playerTurn && 
        winningCombos[i][2] === playerTurn) {

            console.log('\n Player ' + playerTurn + ' Won!\n');
            printBoard();

            console.log('\n Restarting game.. \n');
            restartGame();

            return true;
    }
  }

  return false;
}

function restartGame() {
        moveCount = 0;

        //recreates the board variable as it originally existed.
        board = [
        [' ', ' ', ' '],
        [' ', ' ', ' '],
        [' ', ' ', ' ']
        ];
        return board;
}

function checkForTie() {
    //if 9 valid moves have been made, it's safe to assume a tie because only 9 board "spots" exist.
    if (moveCount === 9) {
        console.log("\n It's a tie!\n");
        printBoard();
        restartGame();
        console.log("\n Restarting game.. \n");
    }
}

function ticTacToe(row, column) {

    //making sure playerTurns do not overlap previous inputs.
    if (board[row][column] === 'X' || board[row][column] === 'O') {
        console.log("Invalid entry. Try again..");
    }
    else {
        board[row][column] = playerTurn;
        moveCount++;
        checkForWin();
        checkForTie();
        playerTurn = (playerTurn === 'X') ? 'O' : 'X';
    }
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
