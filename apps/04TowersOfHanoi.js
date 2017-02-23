'use strict';

var assert = require('assert');
var prompt = require('prompt');
prompt.start();

var stacks = {
    a: [4, 3, 2, 1],
    b: [],
    c: []
};

var moveCount = 0;

function printStacks() {
    console.log("a: " + stacks.a);
    console.log("b: " + stacks.b);
    console.log("c: " + stacks.c);
}

function restartGame() {
    moveCount = 0;
    stacks = {
    a: [4, 3, 2, 1],
    b: [],
    c: []
    };
    return stacks;
}

function isLegal(startStack, endStack) {
  //regular expression to determine if input is a,b, or c.
  var validEntry = /^(a|b|c)$/;

  var indexStart = stacks[startStack].length - 1;
  var indexEnd = stacks[endStack].length - 1;

  if ((stacks[startStack][indexStart] < stacks[endStack][indexEnd] || !stacks[endStack][indexEnd]) &&
     ((validEntry.exec(startStack)) && (validEntry.exec(endStack)))) {
       return true;
  }
  else {
      console.log("Invalid move! Try again!\n" );
      return false;
  }
}

function checkForWin() {
    if (stacks['b'].length === 4 || stacks['c'].length === 4) {
        printStacks();
        console.log("You won with " + moveCount + " moves!\n"
        + "The miminum amount of moves possible is 15.\n"
        + "Restarting game.." + "\n");
        restartGame();
        return true;
    }
    else {
        return false;
    }
}

function towersOfHanoi(startStack, endStack) {

  if (isLegal(startStack,endStack)) {
      stacks[endStack].push(stacks[startStack].pop());
      moveCount++;
      checkForWin();
  }
  else {
    console.log("Invalid entry again!\n" );
  }
}

function getPrompt() {
    printStacks();
    prompt.get(['startStack', 'endStack'], function (error, result) {
        towersOfHanoi(result['startStack'], result['endStack']);
        getPrompt();
    });
}

// Tests

if (typeof describe !== 'undefined') {

    describe('#towersOfHanoi()', function () {
        it('should be able to move a block', function () {
            towersOfHanoi('a', 'b');
            assert.deepEqual(stacks, { a: [4, 3, 2], b: [1], c: [] });
        });
    });

    describe('#isLegal()', function () {
        it('should not allow an illegal move', function () {
            stacks = {
              a: [4, 3, 2],
              b: [1],
              c: []
            };
            assert.equal(isLegal('a', 'b'), false);
        });
        it('should allow a legal move', function () {
            stacks = {
              a: [4, 3, 2, 1],
              b: [],
              c: []
            };
            assert.equal(isLegal('a', 'c'), true);
        });
    });

    describe('#checkForWin()', function () {
        it('should detect a win', function () {
            stacks = { a: [], b: [4, 3, 2, 1], c: [] }
            assert.equal(checkForWin(), true);
            stacks = { a: [1], b: [4, 3, 2], c: [] }
            assert.equal(checkForWin(), false);
        });
    });
} else {

    getPrompt();

}
