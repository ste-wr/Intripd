$(function() {
	$('#profile-init').modal({
		show: false,
		backdrop: 'static',
  		keyboard: false
	});
});

function setMarker(element) {
	var image = '../img/logo.png';
	var latLng = new google.maps.LatLng($(element).children('.place_lat').data('value'), $(element).children('.place_lng').data('value'));
	var marker = new google.maps.Marker({
    	position: latLng,
      	map: map,
      	icon: image,
      	title: $(element).children('.place_name').data('value')
  	});
  	map.setCenter(latLng);
}