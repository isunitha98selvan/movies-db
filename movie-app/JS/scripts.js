$(document).ready(function(){
	// The base url for all API calls
	var apiKey=123;
	var apiBaseURL = 'http://api.themoviedb.org/3/';

	// URL in Authentication. Base URL of image
	var imageBaseUrl = 'https://image.tmdb.org/t/p/';

	// const nowPlayingURL = apiBaseURL + 'movie/now_playing?api_key=' + apiKey;
	const nowPlayingURL='http://localhost:8080/?sql=select%20*%20from%20now_showing;'
	//==============================================================================
	//====================== Get "now playing" data on default. ====================
	//=================== Change results when a genre is clicked on.================
	//==============================================================================
	function getNowPlayingData(location){
		$.getJSON(nowPlayingURL, function(nowPlayingData){
			// var nowdata=[{poster:"https://m.media-amazon.com/images/M/MV5BMjE3MDQ0MTA3M15BMl5BanBnXkFtZTgwMDMwNDY2NTM@._V1_UX67_CR0,0,67,98_AL_.jpg",title:"some movie",overwiew:"A magnificent movie, captivating performances",releaseDate:"29-01-1998",voteaverage:4.5}]
			// console.log(nowPlayingData[0]);
			// console.log(nowPlayingData);
			//we needed to add .results because nowPlayingData is an array.
			// console.log(nowPlayingData[0],nowPlayingURL);
			for(let i = 0; i<nowPlayingData.length; i++){
					var showtime="http://localhost:8080/?sql=select%20*%20from%20theatres;"
					$.getJSON(showtime, function(showdata){
						// console.log(showdata);
					var poster = 'http://image.tmdb.org/t/p/w185_and_h278_bestv2/'+nowPlayingData[i]["poster_path"];
					console.log(location);
					

					var title = nowPlayingData[i]["title"];

					var releaseDate = nowPlayingData[i]["release_date"];

					var overview = nowPlayingData[i]["description"];
					// $('.overview').addClass('overview');

					var voteAverage = nowPlayingData[i]["vote_average"];				
					// console.log(movieKey)
					// var youtubeKey = movieKey.results[0].key;

					var youtubeLink = 'https://www.youtube.com/results?search_query='+title+' trailer';
					// console.log(youtubeLink)

					var nowPlayingHTML = '';
			// 		// added in i to nowPlayingHTML. Without it, only the details for the first movie in the results display in the modal no matter which movie poster you click on.
					nowPlayingHTML += '<div class="col-sm-3 eachMovie">';
						nowPlayingHTML += '<button type="button" class="btnModal" data-toggle="modal" data-target="#exampleModal'+ i + '" data-whatever="@' + i + '">'+'<img src="'+poster+'"></button>'; 	
						nowPlayingHTML += '<div class="modal fade" id="exampleModal' + i +'" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">';
							nowPlayingHTML += '<div class="modal-dialog" role="document">';
								nowPlayingHTML += '<div class="modal-content col-sm-12">';
									nowPlayingHTML += '<div class="col-sm-6 moviePosterInModal">';
										nowPlayingHTML += '<a href="'+youtubeLink+'"><img src="'+poster+'"></a>'; 
									nowPlayingHTML += '</div><br>';//close trailerLink
									nowPlayingHTML += '<div class="col-sm-6 movieDetails">';
										nowPlayingHTML += '<div class="movieName">'+title+'</div><br>';
										nowPlayingHTML += '<div class="linkToTrailer"><a href="'+youtubeLink+'"><span class="glyphicon glyphicon-play"></span>&nbspPlay trailer</a>' + '</div><br>';	
										nowPlayingHTML += '<div class="release">Release Date: '+releaseDate+'</div><br>';
			// 							// nowPlayingHTML += '<div class="genre">Genre: '+genre+'</div><br>';
										nowPlayingHTML += '<div class="overview">' +overview+ '</div><br>';// Put overview in a separate div to make it easier to style
										nowPlayingHTML += '<div class="rating">Rating: '+voteAverage+ '/10</div><br>';
										nowPlayingHTML += '<div class="rating">Theatre Name: '+showdata[0]["theatreName"]+ '</div>';
										nowPlayingHTML += '<div class="col-sm-3 btn btn-primary">3:00 PM' + '</div>';
										nowPlayingHTML += '<div class="col-sm-3 btn btn-primary">4:10 PM' + '</div>';
										nowPlayingHTML += '<div class="col-sm-3 btn btn-primary">5:30 PM' + '</div>';
										nowPlayingHTML += '<div class="col-sm-3 btn btn-primary">8:00 PM' + '</div>';
										nowPlayingHTML += '<div class="col-sm-3 btn btn-primary">10:30 PM' + '</div>';
									nowPlayingHTML += '</div>'; //close movieDetails
								nowPlayingHTML += '</div>'; //close modal-content
							nowPlayingHTML += '</div>'; //close modal-dialog
						nowPlayingHTML += '</div>'; //close modal
					nowPlayingHTML += '</div>'; //close off each div

					$('#movie-grid').append(nowPlayingHTML);
					//Without this line, there is nowhere for the posters and overviews to display so it doesn't show up 
					$('#movieGenreLabel').html("Now Playing");
			// 		//h1 will change depending on what is clicked. Will display "Now Playing" in this case.
		});
		}
		}) 
	}
	//==============================================================================
	//====================== Get movies by genre ===================================
	//==============================================================================

		// Check genreIDs and genre names: 
		// http://api.themoviedb.org/3/movie/:movieID?api_key=<<>>
					//28 = action
					//12 = adventure
					//16 = animation
					//35 = comedy
					//80 = crime
					//18 = drama
					//10751 = family
					//14 = fantasy
					//36 = history
					//27 = horror
					//10402 = music
					//10749 = romance
					//878 = science fiction
					//53 = thriller

	function getMoviesByGenre(genre_id){
		const getMoviesByGenreURL = 'http://localhost:8080/?sql=select%20*%20from%20film%20where%20genre_ids%20=%20'+genre_id+'%20;';
		// console.log(getMoviesByGenreURL);
		$.getJSON(getMoviesByGenreURL, function(nowPlayingData){
			// var nowdata=[{poster:"https://m.media-amazon.com/images/M/MV5BMjE3MDQ0MTA3M15BMl5BanBnXkFtZTgwMDMwNDY2NTM@._V1_UX67_CR0,0,67,98_AL_.jpg",title:"some movie",overwiew:"A magnificent movie, captivating performances",releaseDate:"29-01-1998",voteaverage:4.5}]

			// console.log(nowPlayingData);
			//we needed to add .results because nowPlayingData is an array.
			// console.log(nowPlayingData[0],nowPlayingURL);
			for(let i = 0; i<nowPlayingData.length; i++){
					var showtime="http://localhost:8080/?sql=select%20*%20from%20theatres;"
					$.getJSON(showtime, function(showdata){
					var poster = 'http://image.tmdb.org/t/p/w185_and_h278_bestv2/'+nowPlayingData[i]["poster_path"];
					// console.log(poster);

					var title = nowPlayingData[i]["title"];

					var releaseDate = nowPlayingData[i]["release_date"];

					var overview = '';//nowPlayingData[i]["comments"];
					// $('.overview').addClass('overview');

					var voteAverage = nowPlayingData[i]["vote_average"];				
					// console.log(movieKey)
					// var youtubeKey = movieKey.results[0].key;

					var youtubeLink = 'https://www.youtube.com/results?search_query='+title+' trailer';
					// console.log(youtubeLink)

					var nowPlayingHTML = '';
			// 		// added in i to nowPlayingHTML. Without it, only the details for the first movie in the results display in the modal no matter which movie poster you click on.
					nowPlayingHTML += '<div class="col-sm-3 eachMovie">';
						nowPlayingHTML += '<button type="button" class="btnModal" data-toggle="modal" data-target="#exampleModal'+ i + '" data-whatever="@' + i + '">'+'<img src="'+poster+'"></button>'; 	
						nowPlayingHTML += '<div class="modal fade" id="exampleModal' + i +'" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">';
							nowPlayingHTML += '<div class="modal-dialog" role="document">';
								nowPlayingHTML += '<div class="modal-content col-sm-12">';
									nowPlayingHTML += '<div class="col-sm-6 moviePosterInModal">';
										nowPlayingHTML += '<a href="'+youtubeLink+'"><img src="'+poster+'"></a>'; 
									nowPlayingHTML += '</div><br>';//close trailerLink
									nowPlayingHTML += '<div class="col-sm-6 movieDetails">';
										nowPlayingHTML += '<div class="movieName">'+title+'</div><br>';
										nowPlayingHTML += '<div class="linkToTrailer"><a href="'+youtubeLink+'"><span class="glyphicon glyphicon-play"></span>&nbspPlay trailer</a>' + '</div><br>';	
										nowPlayingHTML += '<div class="release">Release Date: '+releaseDate+'</div><br>';
			// 							// nowPlayingHTML += '<div class="genre">Genre: '+genre+'</div><br>';
										nowPlayingHTML += '<div class="overview">' +overview+ '</div><br>';// Put overview in a separate div to make it easier to style
										nowPlayingHTML += '<div class="rating">Rating: '+voteAverage+ '/10</div><br>';
										nowPlayingHTML += '<div class="rating">Theatre Name: '+showdata[0]["tname"] + '</div>';
										nowPlayingHTML += '<div class="col-sm-3 btn btn-primary">3:00 PM' + '</div>';
										nowPlayingHTML += '<div class="col-sm-3 btn btn-primary">4:10 PM' + '</div>';
										nowPlayingHTML += '<div class="col-sm-3 btn btn-primary">5:30 PM' + '</div>';
										nowPlayingHTML += '<div class="col-sm-3 btn btn-primary">8:00 PM' + '</div>';
										nowPlayingHTML += '<div class="col-sm-3 btn btn-primary">10:30 PM' + '</div>';
									nowPlayingHTML += '</div>'; //close movieDetails
								nowPlayingHTML += '</div>'; //close modal-content
							nowPlayingHTML += '</div>'; //close modal-dialog
						nowPlayingHTML += '</div>'; //close modal
					nowPlayingHTML += '</div>'; //close off each div

					$('#movie-grid').append(nowPlayingHTML);
					//Without this line, there is nowhere for the posters and overviews to display so it doesn't show up 
					$('#movieGenreLabel').html("Now Playing");
			// 		//h1 will change depending on what is clicked. Will display "Now Playing" in this case.
		});
		}
		}) 
	}
	// call getMoviesByGenre using click function but call getNowPlayingData on default.
	getNowPlayingData();

	//Reset HTML strings to empty to overwrite with new one!
	var nowPlayingHTML = '';
	var genreHTML = '';

	

	$('.navbar-brand').click(function(){
		getNowPlayingData();
		$('#movie-grid').html(nowPlayingHTML);
		$('#movieGenreLabel').html("Now Playing");
	})		
	$('.nowPlaying').click(function(){
		getNowPlayingData();
		$('#movie-grid').html(nowPlayingHTML);
		$('#movieGenreLabel').html("Now Playing");
	})
	$('#action').click(function(){
		getMoviesByGenre(28);
		$('#movie-grid').html(genreHTML);
		$('#movieGenreLabel').html("Action");
	})
	$('#adventure').click(function(){
		getMoviesByGenre(12);
		$('#movie-grid').html(genreHTML);
		$('#movieGenreLabel').html("Adventure");
	})
	$('#animation').click(function(){
		getMoviesByGenre(16);
		$('#movie-grid').html(genreHTML);
		$('#movieGenreLabel').html("Animation");
	})
	$('#comedy').click(function(){
		getMoviesByGenre(35);
		$('#movie-grid').html(genreHTML);
		$('#movieGenreLabel').html("Comedy");
	})
	$('#crime').click(function(){
		getMoviesByGenre(80);
		$('#movie-grid').html(genreHTML);
		$('#movieGenreLabel').html("Crime");
	})
	$('#drama').click(function(){
		getMoviesByGenre(18);
		$('#movie-grid').html(genreHTML);
		$('#movieGenreLabel').html("Drama");
	})
	$('#family').click(function(){
		getMoviesByGenre(10751);
		$('#movie-grid').html(genreHTML);
		$('#movieGenreLabel').html("Family");
	})
	$('#fantasy').click(function(){
		getMoviesByGenre(14);
		$('#movie-grid').html(genreHTML);
		$('#movieGenreLabel').html("Fantasy");
	})
	$('#history').click(function(){
		getMoviesByGenre(36);
		$('#movie-grid').html(genreHTML);
		$('#movieGenreLabel').html("History");
	})
	$('#horror').click(function(){
		getMoviesByGenre(27);
		$('#movie-grid').html(genreHTML);
		$('#movieGenreLabel').html("Horror");
	})
	$('#music').click(function(){
		getMoviesByGenre(10402);
		$('#movie-grid').html(genreHTML);
		$('#movieGenreLabel').html("Music");
	})
	$('#romance').click(function(){
		getMoviesByGenre(10749);
		$('#movie-grid').html(genreHTML);
		$('#movieGenreLabel').html("Romance");
	})
	$('#scifi').click(function(){
		getMoviesByGenre(878);
		$('#movie-grid').html(genreHTML);
		$('#movieGenreLabel').html("Science Fiction");
	})
	$('#thriller').click(function(){
		getMoviesByGenre(53);
		//28 = action
		//12 = adventure
		//16 = animation
		//35 = comedy
		//80 = crime
		//18 = drama
		//10751 = family
		//14 = fantasy
		//36 = history
		//27 = horror
		//10402 = music
		//10749 = romance
		//878 = science fiction
		//53 = thriller
		$('#movie-grid').html(genreHTML);
		$('#movieGenreLabel').html("Thriller");
	})
//location
$('#Ahmedabad').click(function(){
	getNowPlayingData('Ahmedabad');
})
$('#Bangalore').click(function(){
	getNowPlayingData('Bangalore');
})
$('#Chennai').click(function(){
	getNowPlayingData('Chennai');
})
$('#Delhi').click(function(){
	getNowPlayingData('Delhi');
})
$('#Hyderabad').click(function(){
	getNowPlayingData('Hyderabad');
})
$('#Kochi').click(function(){
	getNowPlayingData('Kochi');
})
$('#Mumbai').click(function(){
	getNowPlayingData('Mumbai');
})

	//==============================================================================
	//====================== Search Function =======================================
	//==============================================================================

	//Run function searchMovies AFTER an input has been submitted. Submit form first.
	//Run searchMovies once to add an empty html to movie-grid using .html(). Then, overwrite it with the new html using .append(). Need to use .append() to overwrite or all the images will display on top of each other.

	var searchTerm = '';
	searchMovies();
	//reference entire search form
	$('.searchForm').submit(function(event){
		$('#movie-grid').html('');
		event.preventDefault();
		//search term is only concerned with what the user inputted 
		//Get input with .val();
		searchTerm = $('.form-control').val();
		searchMovies();
	})

	function searchMovies(){
		//need to include query in url. (ex: &query=boss+baby)
		
		const searchMovieURL ="http://localhost:8080/?sql=select%20*%20from%20film%20where%20LOWER(title)=LOWER(%27"+searchTerm+"%27);";
		$.getJSON(searchMovieURL, function(nowPlayingData){
			console.log(nowPlayingData[0]);
			for(let i = 0; i<nowPlayingData.length; i++){
					var showtime="http://localhost:8080/?sql=select%20*%20from%20theatres;"
					$.getJSON(showtime, function(showdata){
					var poster = 'http://image.tmdb.org/t/p/w185_and_h278_bestv2/'+nowPlayingData[i]["poster_path"];
					// console.log(poster);

					var title = nowPlayingData[i]["title"];

					var releaseDate = nowPlayingData[i]["release_date"];

					var overview = '';//nowPlayingData[i]["comments"];
					// $('.overview').addClass('overview');

					var voteAverage = nowPlayingData[i]["vote_average"];				
					// console.log(movieKey)
					// var youtubeKey = movieKey.results[0].key;

					var youtubeLink = 'https://www.youtube.com/results?search_query='+title+' trailer';
					// console.log(youtubeLink)

					var nowPlayingHTML = '';
			// 		// added in i to nowPlayingHTML. Without it, only the details for the first movie in the results display in the modal no matter which movie poster you click on.
					nowPlayingHTML += '<div class="col-sm-3 eachMovie">';
						nowPlayingHTML += '<button type="button" class="btnModal" data-toggle="modal" data-target="#exampleModal'+ i + '" data-whatever="@' + i + '">'+'<img src="'+poster+'"></button>'; 	
						nowPlayingHTML += '<div class="modal fade" id="exampleModal' + i +'" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">';
							nowPlayingHTML += '<div class="modal-dialog" role="document">';
								nowPlayingHTML += '<div class="modal-content col-sm-12">';
									nowPlayingHTML += '<div class="col-sm-6 moviePosterInModal">';
										nowPlayingHTML += '<a href="'+youtubeLink+'"><img src="'+poster+'"></a>'; 
									nowPlayingHTML += '</div><br>';//close trailerLink
									nowPlayingHTML += '<div class="col-sm-6 movieDetails">';
										nowPlayingHTML += '<div class="movieName">'+title+'</div><br>';
										nowPlayingHTML += '<div class="linkToTrailer"><a href="'+youtubeLink+'"><span class="glyphicon glyphicon-play"></span>&nbspPlay trailer</a>' + '</div><br>';	
										nowPlayingHTML += '<div class="release">Release Date: '+releaseDate+'</div><br>';
			// 							// nowPlayingHTML += '<div class="genre">Genre: '+genre+'</div><br>';
										nowPlayingHTML += '<div class="overview">' +overview+ '</div><br>';// Put overview in a separate div to make it easier to style
										nowPlayingHTML += '<div class="rating">Rating: '+voteAverage+ '/10</div><br>';
										nowPlayingHTML += '<div class="rating">Theatre Name: '+showdata[0]["tname"] + '</div>';
										nowPlayingHTML += '<div class="col-sm-3 btn btn-primary">3:00 PM' + '</div>';
										nowPlayingHTML += '<div class="col-sm-3 btn btn-primary">4:10 PM' + '</div>';
										nowPlayingHTML += '<div class="col-sm-3 btn btn-primary">5:30 PM' + '</div>';
										nowPlayingHTML += '<div class="col-sm-3 btn btn-primary">8:00 PM' + '</div>';
										nowPlayingHTML += '<div class="col-sm-3 btn btn-primary">10:30 PM' + '</div>';
									nowPlayingHTML += '</div>'; //close movieDetails
								nowPlayingHTML += '</div>'; //close modal-content
							nowPlayingHTML += '</div>'; //close modal-dialog
						nowPlayingHTML += '</div>'; //close modal
					nowPlayingHTML += '</div>'; //close off each div

					$('#movie-grid').append(nowPlayingHTML);
					//Without this line, there is nowhere for the posters and overviews to display so it doesn't show up 
					$('#movieGenreLabel').html("Now Playing");
			// 		//h1 will change depending on what is clicked. Will display "Now Playing" in this case.
		});
		}
		}) 
	}
});


//.append(nowPlayingHTML) adds nowPlayingHTML to the present HTML
//.html(nowPlayingHTML) ovwrwrites the HTML present with nowPlayingHTML. 
//.html() is faster than DOM creation
//.html() is good for when the element is empty. 
//.append() is better when you want to add something dynamically, like adding a list item dynamically. (You would be adding a new string of HTML to the element.)


