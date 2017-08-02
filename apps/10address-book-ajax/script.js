'use strict';

$(document).ready(function() {
	populateUsers();
	viewUserDetails();
});

	function populateUsers() {
		$.ajax('https://reqres-api.herokuapp.com/api/users', {
			success: function(response) {
				$('tbody').empty();
				 _.each(response, function(user) {
				 	var idCell = '<td>'+user.id+'</td>';
				 	var firstNameCell = '<td>'+user.first_name+'</td>';
				 	var lastNameCell = '<td>'+user.last_name+'</td>';
				 	var urlCell = '<td><a href="#" data-id="'+user.id+'">view</a></td>';

				 	var str = '<tr>' + idCell + firstNameCell + lastNameCell + urlCell + '</tr>';
				 	$('tbody').append(str);
				});

				viewUserDetails();
			}
		});
	}

	function viewUserDetails() {

		$(document).on('click', 'a', function() {
			var data_id = $(this).data('id');
			console.log(data_id);
			var url = 'https://reqres-api.herokuapp.com/api/users/';
			var urlPlusID = url + data_id;
			console.log(urlPlusID);

			$.ajax(urlPlusID, {
				success: function(user) {
					var nameCell = '<h3>'+user.first_name+ ' ' +user.last_name+'</h3>';
					var occupationCell = '<h4>'+user.occupation+'</h4>';
					var phoneNumberCell = '<p>'+user.phone+'</p>';
					var addressCell = '<p>'+user.address+'</p>';
					var avatarCell = '<img src="'+user.avatar+'">';

    				$('#details').html(nameCell + occupationCell + phoneNumberCell + addressCell + avatarCell);
    			}
	    	});
		});
	}
