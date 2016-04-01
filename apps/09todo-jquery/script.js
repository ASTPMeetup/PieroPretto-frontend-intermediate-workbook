'use strict';

$(document).ready(function() {
	$('#todo-list').sortable();
	$('li').prepend('<input type="checkbox"/>');
	$('li').append('<button class="removeitem">remove</button>');
	$('button').on('click', function(){
		$(this).parent().remove();
	});

	$('form').submit(function(event){
    	event.preventDefault(); 
		var todoText = $(this).find('#todo').val();
		$('#todo-list').append('<li id="newtodo">'+todoText+'</li>');
		$('#newtodo').prepend('<input type="checkbox"/>');
		$('#newtodo').append('<button class="removeitem">remove</button>');
		$('li').removeAttr('id');
		$('button').on('click', function(){
			$(this).parent().remove();
		});
	});
});
