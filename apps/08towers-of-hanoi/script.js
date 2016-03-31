'use strict';

$(document).ready(function() {
  var block = null;
  $('[data-stack]').on('click', function(){
    $("#announce-game-won").empty();
    if (block === null) {
      block = $(this).children().last();
    }
    else {
      var blockValue = Number(block.attr('data-block'));
      var moveToValue = Number($(this).children().last().attr('data-block'));
      if (blockValue < moveToValue || !moveToValue){
        block.detach();
        $(this).append(block);
      }
      else {
        $("#announce-game-won").text('Invalid move');
      }
      block = null;
      checkForWin();
    }
  });

  function checkForWin() {
    var stack2 = $('[data-stack="2"]').children().length;
    var stack3 = $('[data-stack="3"]').children().length;
    if (stack2 === 4 || stack3 === 4) {
      $("#announce-game-won").text('You won!');
    }
  }
});