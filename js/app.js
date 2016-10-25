(function() {
  'use strict';

  var movies = [];

  var renderMovies = function() {
    $('#listings').empty();

    for (var movie of movies) {
      var $col = $('<div class="col s6">');
      var $card = $('<div class="card hoverable">');
      var $content = $('<div class="card-content center">');
      var $title = $('<h6 class="card-title truncate">');

      $title.attr({
        'data-position': 'top',
        'data-tooltip': movie.title
      });

      $title.tooltip({ delay: 50, });
      $title.text(movie.title);

      var $poster = $('<img class="poster">');

      $poster.attr({
        src: movie.poster,
        alt: `${movie.poster} Poster`
      });

      $content.append($title, $poster);
      $card.append($content);

      var $action = $('<div class="card-action center">');
      var $plot = $('<a class="waves-effect waves-light btn modal-trigger">');

      $plot.attr('href', `#${movie.id}`);
      $plot.text('Plot Synopsis');

      $action.append($plot);
      $card.append($action);

      var $modal = $(`<div id="${movie.id}" class="modal">`);
      var $modalContent = $('<div class="modal-content">');
      var $modalHeader = $('<h4>').text(movie.title);
      var $movieYear = $('<h6>').text(`Released in ${movie.year}`);
      var $modalText = $('<p>').text(movie.plot);

      $modalContent.append($modalHeader, $movieYear, $modalText);
      $modal.append($modalContent);

      $col.append($card, $modal);

      $('#listings').append($col);

      $('.modal-trigger').leanModal();
    }
  };


  $('.container button').on('click', function(e) {
    e.preventDefault();
    var searchInput = $('#search').val();

    if (searchInput === '') {
      return;
    }
    $.getJSON('http://www.omdbapi.com/?s=' + searchInput)
      .done(function(data) {
        movies = [];
        $.each(data.Search, function() {
          var thisMovie = {};

          // $.getJSON('http://www.omdbapi.com/?i=' + this.imdbID + '&plot=full&r=json')
          //   .done(function(data) {
          //   thisMovie.plot = data.Plot;
          //   console.log(thisMovie);
          //
          //
          // });

          thisMovie.id = this.imdbID;
          thisMovie.title = this.Title;
          thisMovie.year = this.Year;

          if (this.Poster=== "N/A") {
            thisMovie.poster = "noposter.jpg";
          } else {
            thisMovie.poster = this.Poster;
          };

          movies.push(thisMovie);

        });
        $('#search').val('');
        console.log(movies);
        renderMovies();

      })
      .fail(function() {
        console.log( "error" );
      });

  });


  // ADD YOUR CODE HERE
})();
