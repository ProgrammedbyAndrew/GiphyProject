var showTitle = ['Ferrari', 'Lamborghini', 'Ford', 'Dodge', 'Bugatti', 'Bentley','Rolls Royce','Lotus','Volkswagen','Mercedes','Audi',];
var currentGif; var pausedGif; var animatedGif; var stillGif;


function createButtons(){
	$('#CarButtons').empty();
	for(var i = 0; i < showTitle.length; i++){
		var showBtn = $('<button>').text(showTitle[i]).addClass('showBtn').attr({'data-name': showTitle[i]});
		$('#CarButtons').append(showBtn);
	}

	

	$('.showBtn').on('click', function(){
		$('.display').empty();

		var thisShow = $(this).data('name');
		var giphyURL = "http://api.giphy.com/v1/gifs/search?q=cars+" + thisShow + "&limit=10&api_key=ZRdVbeXcaaXxwXNBSmY0BLMj6HuTSJ8H";
		$.ajax({url: giphyURL, method: 'GET'}).done(function(giphy){
			currentGif = giphy.data;
			$.each(currentGif, function(index,value){
				animatedGif= value.images.original.url;
				pausedGif = value.images.original_still.url;
				var thisRating = value.rating;
			
				if(thisRating == ''){
					thisRating = 'unrated';
				}
				var rating = $('<h5>').html('Rated: '+thisRating).addClass('ratingStyle');
				stillGif= $('<img>').attr('data-animated', animatedGif).attr('data-paused', pausedGif).attr('src', pausedGif).addClass('playOnHover');
				var fullGifDisplay = $('<button>').append(rating, stillGif);
				$('.display').append(fullGifDisplay);
			});
		});
	});
}


$(document).on('mouseover','.playOnHover', function(){
 	   	$(this).attr('src', $(this).data('animated'));
 });
 $(document).on('mouseleave','.playOnHover', function(){
 	   	$(this).attr('src', $(this).data('paused'));
 });


$('#addCar').on('click', function(){
	var newShow = $('#newCarInput').val().trim();
	showTitle.push(newShow);
	createButtons();
	return false;
});

createButtons();