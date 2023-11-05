$(document).ready(function() {
  let checkedAmenities = {};

  $('input[type="checkbox"]').change(function() {
    if (this.checked) {
      checkedAmenities[$(this).data('id')] = $(this).data('name');
    } else {
      delete checkedAmenities[$(this).data('id')];
    }
    let lst = Object.values(checkedAmenities);
    if (lst.length > 0) {
      $('div.amenities h4').text(Object.values(checkedAmenities).join(', '));
    } else {
      $('div.amenities h4').html(' ');
    }
  });
});

$(document).ready(function() {
  $.get('http://0.0.0.0:5001/api/v1/status/', function(data, textStatus) {
    if (textStatus === 'success') {
      if (data.status === 'OK') {
        $('#api_status').addClass('available');
      } else {
        $('#api_status').removeClass('available');
      }
    }
  });
});

$(document).ready(function() {
  // Define the URL for the API endpoint
  const url = 'http://0.0.0.0:5001/api/v1/places_search/';

  // Send a POST request with an empty object as the POST body
  $.ajax({
    url: url,
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({}),
    success: function(places) {
      // Loop through the places and create an article for each
      $.each(places, function(i, place) {
        // Create a new article element
        let article = $('<article></article>');

        // Set the innerHTML of the article
        article.html(`
          <div class="title">
            <h2>${place.name}</h2>
            <div class="price_by_night">${place.price_by_night}</div>
          </div>
          <div class="information">
            <div class="max_guest">${place.max_guest} Guest(s)</div>
            <div class="number_rooms">${place.number_rooms} Bedroom(s)</div>
            <div class="number_bathrooms">${place.number_bathrooms} Bathroom(s)</div>
          </div>
          <div class="description">
            ${place.description}
          </div>
        `);

        // Append the article to the section.places
        $('section.places').append(article);
      });
    }
  });
});
