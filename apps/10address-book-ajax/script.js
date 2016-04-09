'use strict';

$(document).ready(function() {
	$.ajax('https://reqres-api.herokuapp.com/api/users', {
		success: function(response) {
			$('tbody').empty();
			 _.each(response, function(user) {
			 	var str = '<tr>' + '<td>'+user.id+'</td>' + 
			 	'<td>'+user.first_name+'</td>' +
			 	'<td>'+user.last_name+'</td>' + 
	 		 	'<td><a href="#" data-id="'+user.id+'">view</a></td>' + '</tr>';
			 	$('tbody').append(str);
			});
	 	
		 	$('[data-id]').on('click', function() {
				var data_id = $(this).data('id');
				var url = 'https://reqres-api.herokuapp.com/api/users/';
				var urlPlusID = url + data_id;
				$.ajax(urlPlusID, {
					success: function(user) {
						var str = '<h3>'+user.first_name+ ' ' +user.last_name+'</h3>' +
	    						  '<h4>'+user.occupation+'</h4>' +
	    						  '<p>'+user.phone+'</p>' +
	    						  '<p>'+user.address+'</p>' +
	    						  '<img src="'+user.avatar+'">'
	    				$('#details').html(str);
	    			}
	    		});
			});
	 	}
	});
});