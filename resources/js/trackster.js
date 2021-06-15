var Trackster = {};
const API_KEY = 'eb0025da5cdeb28148206aa86d8c163f';

$(document).ready(function() {
  $('#search-button').click(function() {
    Trackster.searchTracksByTitle($('#search-input').val());
  });

  $('#search-input').keydown(function(event) {
    var key = event.which;
    if(key === 13){
      Trackster.searchTracksByTitle($('#search-input').val());
    }
  });
});

/*
  Given an array of track data, create the HTML for a Bootstrap row for each.
  Append each "row" to the container in the body to display all tracks.
*/

Trackster.renderTracks = function(tracks) {
  $("h1").removeClass("logo");
  var $trackList = $('#track-list');
  $trackList.empty();
  for (var trackIndex = 0; trackIndex < tracks.length; trackIndex++) {
    var track = tracks[trackIndex];
    var mediumAlbumArt = track.image[1]["#text"];
    var listeners = numeral(track.listeners).format('0,0');
    var htmlTrackRow =
      '<div class="row track">' +
      '  <div class="col-xs-1 col-xs-offset-1 play-button">' +
      '    <a href="'+ track.url + '" target="_blank">' +
      '      <i class="fa fa-play-circle-o fa-2x"></i>' +
      '    </a>' +
      '  </div>' +
      '  <div class="col-xs-4">' + track.name + '</div>' +
      '  <div class="col-xs-2">' + track.artist + '</div>' +
      '  <div class="col-xs-2"><img src="' + mediumAlbumArt + '"/></div>' +
      '  <div class="col-xs-2">' + listeners + '</div>' +
      '</div>';
    $trackList.append(htmlTrackRow);
  }
};

/*
  Given a search term as a string, query the LastFM API.
  Render the tracks given in the API query response.
*/

Trackster.searchTracksByTitle = function(title) {
  $("h1").addClass("logo");
  $.ajax({
    url: 'https://ws.audioscrobbler.com/2.0/?method=track.search&track=' + title + '&api_key=' + API_KEY + '&format=json',
    success: function(response) {
      Trackster.renderTracks(response.results.trackmatches.track);
    }
  });
};
