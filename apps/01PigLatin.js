'use strict';

var assert = require('assert');
var prompt = require('prompt');
prompt.start();


function pigLatin(word) {

    //scrubs data

   word = word.toLowerCase();
   var firstLetter = word[0];

   //checks to see if first letter is a vowel. If so, just add 'yay' to the end of the word
 
    // if(firstLetter == 'a'
    //   || firstLetter == 'e'
    //   || firstLetter == 'i'
    //   || firstLetter == 'o'
    //   || firstLetter == 'u'){
    //      var pigLatinWord = word + "yay";
    //      return pigLatinWord;
    // }

    // Runs through each letter in a word until the first vowel is found. This script uses vowelIndex as a counter variable and an index tracker for all characters before the first vowel.
        // 'If' statement checks for index of particular vowel & checks to make sure another vowel has already been found.
        // If the word does not have the particular vowel the OR operator is used to store the false value of -1 in vowelIndex variable.

    var vowelIndex = -1;

    if ( ( word.indexOf('a') > -1 && word.indexOf('a') < vowelIndex ) || vowelIndex === -1 ) {
    vowelIndex = word.indexOf('a');
    } 
    if ( ( word.indexOf('e') > -1 && word.indexOf('e') < vowelIndex ) || vowelIndex === -1 ) {
    vowelIndex = word.indexOf('e');
    } 
    if ( ( word.indexOf('i') > -1 && word.indexOf('i') < vowelIndex ) || vowelIndex === -1 ) {
    vowelIndex = word.indexOf('i');
    }
    if ( ( word.indexOf('o') > -1 && word.indexOf('o') < vowelIndex ) || vowelIndex === -1 ) {
    vowelIndex = word.indexOf('o');
    }
    if ( ( word.indexOf('u') > -1 && word.indexOf('u') < vowelIndex ) || vowelIndex === -1 ) {
    vowelIndex = word.indexOf('u');
    }
    if ( ( word.indexOf('y') > -1 && word.indexOf('y') < vowelIndex ) || vowelIndex === -1 ) {
    vowelIndex = word.indexOf('y');
    }

    //the firstPart variable stores all characters before the vowelIndex and stores it in firstPart.
    //the restWord variable stores all characters after the vowelindex and stores it in restWord.


    var firstPart = word.slice(0, vowelIndex);
    var restWord = word.slice(vowelIndex, word.length);

    //if first character is a vowel then 'yay' is simply added to the end.

    if (vowelIndex === 0) {
        return word + "yay";
    }

    //if vowel is found after the first character then two storage variables manipulate the word to add 'yay' following all characters before first vowel

    else if (vowelIndex > 0) {
        return restWord + firstPart + "ay";
    }

    // if no vowel is found, the word is deemed invalid because no word without a vowel exists in the English dictionary.

    else {
        return "This word is invalid";
    }

}


function getPrompt() {
    prompt.get(['word'], function (error, result) {

        console.log( pigLatin(result['word']) );

        getPrompt();
    });
}

// Tests

if (typeof describe !== 'undefined') {

    describe('#pigLatin()', function () {
        it('should translate a simple word', function () {
            assert.equal(pigLatin('car'), 'arcay');
            assert.equal(pigLatin('dog'), 'ogday');
        });
        it('should translate a complex word', function () {
            assert.equal(pigLatin('create'), 'eatecray');
            assert.equal(pigLatin('valley'), 'alleyvay');
        });
        it('should attach "yay" if word begins with vowel', function () {
            assert.equal(pigLatin('egg'), 'eggyay');
            assert.equal(pigLatin('emission'), 'emissionyay');
        });
        it('should auto lowercase word before translation', function () {
            assert.equal(pigLatin('HeLlO'), 'ellohay');
            assert.equal(pigLatin('RoCkEt'), 'ocketray');
        });
    });
} else {

    getPrompt();

}
