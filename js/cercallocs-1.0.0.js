function initLlocs(container) {

  $(container).html('<div>' +
    '<div id="boxcontainer" class="searchbox searchbox-shadow">' +
    '<div class="searchbox-menu-container">' +
    '<span aria-hidden="true" style="display:none">Menu</span> </div>' +
    '<div><input id="searchboxinput" placeHolder="Anar a.."  type="text" style="position: relative;" /></div>' +
    '<div class="searchbox-searchbutton-container">' +
    '<button aria-label="search" id="searchbox-searchbutton" class="searchbox-searchbutton">' +
    '</button> <span aria-hidden="true" style="display:none;">search</span> </div>' +
    '</div>');


  $(".searchbox-menu-container").on('click', function() {
    $("#div_panel").fadeToggle();
  });

  $(".panel-close-button").on('click', function() {
    $("#div_panel").fadeToggle();
  });

  $(".searchbox-searchbutton-container").on('click', function() {
    checkInput(false);
  });

  $('#searchboxinput').on('keypress', function(event) {
   
	  if (event.which == 13) {
    checkInput(true);
    event.preventDefault();
       }else{
		    checkInput(false);
	   }

  });


  $(document).on('click', 'li a', function(e) {
    if ($(this).attr('data')) {
      var coords = $(this).attr('data').split("#");
      zoomTo(coords[0], coords[1])
    }
  });

}


function checkInput(keyOrigen) {
  var _toponim = $("#searchboxinput").val();
		  if (_toponim && _toponim.length > 2) {
			sendRequest(_toponim,keyOrigen);
		  }




}

function sendRequest(_toponim,keyOrigen) {
  $.ajaxSetup({
    cache: true
  });

  $.ajax({
    url: '/icgc_geocoder/?maxresultats=17&obtenirCoordGeografiques=si&tipus=Cap%20de%20Municipi&metode=localitzaToponim&ordre=alfabetic&trobaTots=no&nom=' + _toponim,
    method: 'GET',
    dataType: 'json',
    success: function(data) {

      if (data) {
        $('#mygrid').fadeIn();
        $('#mygrid').html('');
        if (data.length >= 1) {
          var cList = $('<ul>').appendTo('#mygrid');
          $.each(data, function(index, value) {

            $('<li><a data="' + value.coordenadesETRS89LonLat.y + '#' + value.coordenadesETRS89LonLat.x + '" href="#"> ' +
              '<b>' + value.nom + '</b> (' + value.nomMunicipi + ')</a>').appendTo(cList);;
              if(keyOrigen && data.length >= 1){
                    zoomTo(value.coordenadesETRS89LonLat.y, value.coordenadesETRS89LonLat.x)
                 
              }


          });
        }
      } else {
        $('#mygrid').html("An error occured:");
      }
    },
    error: function(xhr) {
      $('#mygrid').html("An error occured: " + xhr.status + " " + xhr.statusText);
    }

  });

}


function netejaPantalla(){
  $('#mygrid').fadeOut();
  $("#searchboxinput").val('');

}

function zoomTo(lat, lon) {
   netejaPantalla();
//  map.setView([lat, lon], 15);
  map.flyTo({center: [lon, lat], zoom:13});
}
