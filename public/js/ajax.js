

// these are the var to access the html id's
var $friends = $('#friends');
var $name    = $('#name');
var $age     = $('#age');
// this var is to make a template of names and age and ids 
var friendTemplate = " " +
    "<div style='position:fixed; top: 100px; left: 800px;' " +
    "<li>" +
    "<p><strong>Name:</strong> {{name}}</p>" +
    "<p><strong>Age:</strong> {{age}}</p>" +
    "<button id='{{id}}' class='remove'style='background-color: green; border-radius: 10%; width: 50px; height: 30px; padding: 10px'>Delete</button>" +
    "</li>"+
    "</div>" ;
    function addFriend(friend){
    	$friends.append(Mustache.render(friendTemplate, friend));
        
    }

    

$(document).ready(function() {
	$.ajax({
		type: 'GET',
		url:'http://rest.learncode.academy/api/learncode/friends',
		success: function(friends){
			(friends, function(i, friend){
				// this is getting data 
				console.log(friends)
				addFriend(friends)
                 
			});
		 },
		 error:function(){
		 	alert('error loading friends')
		 }
	});

// these are the name on our web page
	$('#add-friend').on('click', function(){
		 var friend={
			name: $name.val(),
			age: $age.val()
		};


		$.ajax({
			// AJAX POST FUNCTION: click the. button w/id add friend 
			type: 'POST',
			url: 'http://rest.learncode.academy/api/learncode/friends',
			data: friend,
			success: function(newFriend){
				addFriend(newFriend);
			},
			error: function(){
				alert('error saving order');
			}
		});
	});
	// .delegate allows you to remove items that were loaded by other by other students
    $friends.delegate('.remove', 'click', function(){
    	var $li = $(this).closest('div');
    	// AJAX DELETE function - click the .remove class button and the id indentifies what to delete
    	$.ajax({
    		type: 'DELETE',
    		url: 'http://rest.learncode.academy/api/learncode/friends/' + $(this).attr('id'),
    		success:function(){
    			$li.fadeOut(300, function(){
    				$(this).remove();
    			});
    		}
    	});
    });
})

