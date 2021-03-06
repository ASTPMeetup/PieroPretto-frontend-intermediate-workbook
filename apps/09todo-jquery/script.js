'use strict';

$(document).ready(function() {
	$('#todo-list').sortable();
	addBoxandButton();
	deleteItem();

	$('form').submit(function(event){
    	event.preventDefault(); 
		var todoText = $(this).find('#todo').val();
		$('#todo-list').append('<li>'+todoText+'</li>');
		$(this).find('#todo').val('');
		addBoxandButton();
		deleteItem();
	});

	function addBoxandButton() {
		$('li:last').prepend('<input type="checkbox"/>').append('<button>remove</button>');
	}

	function deleteItem() {
		$(':button').on('click', function(){
			$(this).parent().remove();
		});
	}
});
