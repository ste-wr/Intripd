var SidebarSearchView = Ember.View.extend({
	didInsertElement: function() {
		$('#location-search-input').focus(function() {
	    	// turn on timer
	    	startTimer();
		}).blur(function() {
	    	// turn off timer
	    	endTimer();
		});

		var lastValue = "",
    		$input = $('#location-search-input'),
    		timerCheckCount = 0,
    		checkInputChange = function() {
        		timerCheckCount += 1;

        		if (lastValue !== $input.val()) {
        			//do the input change bit
        			var bounds = map.getBounds();
        			if($input.val() !== '') {
	        			request = {
	        				bounds: bounds,
	        				query: $input.val()
	        			};
	        			locationService.textSearch(request, callback);
        			}
        			else if($input.val() === '') {
        				$('.location-search-results').empty();
        				$('.location-search-results').append("<div class='location-search-results-entry no-entry'>No Results Found</div>");
        			}
            		lastValue = $input.val();
        		}
    		},
    		timer = undefined,
    		startTimer = function() {
        		timer = setInterval(checkInputChange, 500); // check input field every 200 ms (1/5 sec)
    		},
    		endTimer = function() {
        		clearInterval(timer);
        		timerCheckCount = 0;
    		};
    		function callback(results, status) {
			  if (status == google.maps.places.PlacesServiceStatus.OK) {
			  	$('.location-search-results').empty();
			    for (var i = 0; i < results.length; i++) {
			      var place = results[i];
			      //console.log(place);
			      $('.location-search-results').append("<div class='location-search-results-entry'>"+place.name+"<br />"+place.formatted_address+"</div>");
			    }
			  }
			}
	}
});

module.exports = SidebarSearchView;