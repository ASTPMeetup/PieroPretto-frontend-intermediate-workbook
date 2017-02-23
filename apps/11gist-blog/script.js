'use strict';

$(document).ready(function() {
	$.ajax('http://localhost:8080/api/gists.json', {
		success: function(gists) {

			 	var filterPosts = _.filter(gists, function(gist) {
			 		var postSubStr = gist.description.slice(0,5);
			 		return postSubStr == "#post";
			 	});

			 	_.each(filterPosts, function(filterItem) {
			 		var URL = filterItem.url;
			 		var description = filterItem.description.slice(5).trim();
			 		var filterList = '<li><a href="#" data-url="'+URL+'">'+description+'</a></li>';
			 		$('#posts').prepend(filterList);
				});

			grabBlogAndComments();
		}
	});

    function grabBlogAndComments() {
		$('a').on('click', function(e){
			e.preventDefault();
			// var dataUrl = $(this).data('url');
			var dataUrl = $(this).attr('href');
			$.ajax(dataUrl, {
				success: function(gist) {
					var mdContent = gist.files["post.md"].content;
					var convertedToHTML = marked(mdContent);
					$('#post').html(convertedToHTML);

					grabComments(gist);
				}
			});
		});
    }

    function grabComments(gist) {
		$.ajax(gist.comments_url, {
			success: function(comments) {

				//delete comments from any previous post
				$('#comments').empty();
				
				_.each(comments, function(comment) {
					var userInfo = '<b>'+comment.user.login+ ':  ' + '</b>';
					var bodyInfo = '<i>' + ' -"'+comment.body+'"'+ '</i>';
					$('#comments').prepend('<p>' + userInfo + bodyInfo + '</p>');
				});
			}
    	});
	}
});