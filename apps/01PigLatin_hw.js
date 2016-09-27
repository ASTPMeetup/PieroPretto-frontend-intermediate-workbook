'use strict';

var assert = require('assert');
var prompt = require('prompt');
prompt.start();



function pigLatin(word) {

word = word.toLowerCase();
    // Your code here

for (var i = 0; i < word.length; i++) {
    if(word[i] == 'a'
      || word[i] == 'e'
      || word[i] == 'i'
      || word[i] == 'o'
      || word[i] == 'u'
      || word[i] == 'y')
    {
        if (word[i] === 0) {
            var pigLatinWord = word + "yay";
            return pigLatinWord;
        }
        else if (word[i] > 0) {
            var firstPart = word.slice(0, word[i]);
            var restWord = word.slice(word[i], word.length);
            var pigLatinWord = restWord + firstPart + "ay";
            return pigLatinWord;
        }
        else {
            return "This word is invalid";
        }
    }
}
}
    
function getPrompt() {
    prompt.get(['word'], function (error, result) {

        console.log( pigLatin(result['word']) );

        getPrompt();
    });
}

// eat
//1. check if e is one of the a, e, i, o , u;
//2. check if a is one of the a, e, i, o, u;
//...

// if (  word.indexOf('a') > -1 ) {
//     vowelIndex = word.indexOf('a'); 
// } 

// if (  word.indexOf('e') > -1  ) {
//     vowelIndex = word.indexOf('e');
// } 

// if (  word.indexOf('i') > -1 ) {
//     vowelIndex = word.indexOf('i');
// }
// if (  word.indexOf('o') > -1  ) {
//     vowelIndex = word.indexOf('o');
// } 

// if (  word.indexOf('u') > -1  ) {
//     vowelIndex = word.indexOf('u');
// } 

// if ( word.indexOf('y') > -1 ) {
//     vowelIndex = word.indexOf('y');
// }

// var firstPart = word.slice(0, vowelIndex);
// var restWord = word.slice(vowelIndex, word.length);
// var finalWord = "";

// if (vowelIndex === 0) {
//     finalWord = word + "yay";
// }
// if (vowelIndex > 0) {
//     finalWord = restWord + firstPart + "ay";
// }
// else {
//     console.log("Word does not translate into Pig Latin.");
// }

// return finalWord;
// }




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
 } else if (typeof describe !== 'undefined') {

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

   getPrompt();

 }
