'use strict';

$(document).ready(function(){
  // $('[data-stack]').hover(function(){ $(this).css('background-color', '#33a0ff');},
  //                         function(){ $(this).css('background-color', '#f0f8ff');});
  var block = null;
  var turns = 0;
  $('[data-stack]').on('click', function(){
    $("#announcer").empty();
    if (block === null) {
      block = $(this).children().last().detach();
    }
    else {
      block.fadeTo(500, 1);
      var blockValue = Number(block.attr('data-block'));
      var moveToValue = Number($(this).children().last().attr('data-block'));
      if (blockValue < moveToValue || !moveToValue){
        block.detach();
        $(this).append(block);
        turns++;
      }
      else {
        $("#announcer").text('Invalid move');
      }
      block = null;
      checkForWin();
    }
  });

  function checkForWin() {
    if ($('[data-stack="2"]').children().length === 4 || $('[data-stack="3"]').children().length === 4) {
      $("#announcer").text('You won in '+turns+' turns!');

      //restart game by arranging blocks by size and appending to starting data-stack
      var $stacks = $('[data-stack]');
      $stacks.find('[data-block]').sort(function(a,b) {
        return +b.getAttribute('data-block') - +a.getAttribute('data-block');
      }).appendTo('[data-stack="1"]');

      turns = 0;
    }
  }
});
