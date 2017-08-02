'use strict';

var assert = require('assert');
var prompt = require('prompt');
prompt.start();

    

function randomInt(low, high) {
    return Math.floor(Math.random() * (high - low) + low);
}

function compHand() {
    const random = randomInt(1,4);

    if (random === 1) {
        return "rock";
    }
    else if (random === 2) {
        return "scissors";
    }
    else {
        return "paper";
    }
}

function validateInput(handOne, handTwo){
    const validEntry = /^(rock|paper|scissors)$/;
    return validEntry.exec(handOne) && validEntry.exec(handTwo);
}

function rockPaperScissors(hand1, hand2){
    if (hand1 === "") {
        hand1 = compHand();
        console.log('Hand 1 chose ' + hand1 + '!');
    }
    if (hand2 === "") {
        hand2 = compHand();
        console.log('Hand 2 chose ' + hand2 + '!');
    }

    hand1 = hand1.toLowerCase();
    hand2 = hand2.toLowerCase();
    
    if(validateInput(hand1, hand2)) {
        if(hand1 === hand2) {
            return "It's a tie!";
        }
        else if ((hand1 === "rock" && hand2 === "scissors") ||
                 (hand1 === "scissors" && hand2 === "paper") ||
                 (hand1 === "paper" && hand2 === "rock")) {
            return "Hand one wins!";
        }
        else {
            return "Hand two wins!";
        }
    }
    else {
        return 'invalid input(s). Please try again.';
    }
}

function getPrompt() {
    prompt.get(['hand1','hand2'], function (error, result) {

        console.log( rockPaperScissors(result['hand1'], result['hand2']) );

        getPrompt();
    });
}

// Tests

if (typeof describe !== 'undefined') {

    describe('#rockPaperScissors()', function () {
        it('should detect a tie', function () {
            assert.equal(rockPaperScissors('rock', 'rock'), "It's a tie!");
            assert.equal(rockPaperScissors('paper', 'paper'), "It's a tie!");
            assert.equal(rockPaperScissors('scissors', 'scissors'), "It's a tie!");
        });
        it('should detect which hand won', function () {
            assert.equal(rockPaperScissors('rock', 'paper'), "Hand two wins!");
            assert.equal(rockPaperScissors('paper', 'scissors'), "Hand two wins!");
            assert.equal(rockPaperScissors('rock', 'scissors'), "Hand one wins!");
        });
    });
} else {

    getPrompt();

}
