'use strict';

$(document).ready(function() {
	$('#todo-list').sortable();
	$('li').prepend('<input type="checkbox"/>').append('<button class="removeitem">remove</button>');
	$(':button').on('click', function(){
		$(this).parent().remove();
	});

	$('form').submit(function(event){
    	event.preventDefault(); 
		var todoText = $(this).find('#todo').val();
		$('#todo-list').append('<li>'+todoText+'</li>');
		$('li:last').prepend('<input type="checkbox"/>').append('<button class="removeitem">remove</button>');
		$(':button').on('click', function(){
			$(this).parent().remove();
		});
	});
});
