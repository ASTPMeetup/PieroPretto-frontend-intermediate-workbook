'use strict';
var test;

$(document).on('ready', function() {
	var playerTurn = "X";
    var turns = 0;
    $('[data-cell]').on('click', function() {
        var $this = $(this);
        console.log($('[data-cell]'));
        if ($this.text() === "") {
    	   	$($this).text(playerTurn);
          $('#announce-winner').empty();
          turns++;
          checkForWin();
					checkForTie();
    	   	playerTurn = (playerTurn === 'X') ? 'O' : 'X';
        }
        else {
          $('#announce-winner').text('There\'s something already there! Try again.');
        }
    });

    function winningCombo() {

    var winningPositions = [[0,1,2], [3,4,5],[6,7,8], [0,3,6],
                           [1,4,7],[2,5,8],[0,4,8], [2,4,6]];

    for(var i = 0; i < 8; i++){
        if ($('[data-cell="'+ winningPositions[i][0] +'"]').text() === playerTurn &&
						$('[data-cell="'+ winningPositions[i][1] +'"]').text() === playerTurn &&
						$('[data-cell="'+ winningPositions[i][2] +'"]').text() === playerTurn){
            	return true;
            }
        }
    }

    function checkForWin() {
        if(winningCombo()) {
            $('#announce-winner').text('player ' + playerTurn + ' wins!');
                $('[data-cell]').each(function() {
                    $(this).empty();
                    turns = 0;
                });
        }
    }

    function checkForTie() {
        if(turns === 9) {
            $('#announce-winner').text('It\'s a tie!');
            $('[data-cell]').each(function() {
                $(this).empty();
                turns = 0;
            });
        }
    }

    $('[data-cell]').hover(function(){ $(this).css('background-color', '#1278FF');},
													 function(){ $(this).css('background-color', 'transparent');
    });
});
