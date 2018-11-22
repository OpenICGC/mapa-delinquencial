var map;
var arrayXYZPB = [1.239, 41.602, 7.55, 0, 0];
var arrayColorCurrent;
var estilCurrent;
var recordSetCurrent;
var delictes_Array;
var arrayUniqueKeyCurrent;
var arrayUniqueKeyMesosAnyCurrent;
var arrayFromSearchQuery;
var recordeSetCatalunya;
var _classSelected = 'selected';
var anysDades = [2011, 2012, 2013, 2014, 2015, 2016, 2017,2018];
var numRangs = 6;
var initNumRangs = 6;
var id_abp_3D = "arees_basiques_policia_3d";
var id_abp_2D = "arees_basiques_policia_2d";
var id_abp_2D_lin = "arees_basiques_policia_2d_lin";
var id_abp_2D_lin_selected = "arees_basiques_policia_2d_lin_selected";
var selected_feature = null;
var _url_geojson_comissaries = "data/comissaries.geojson";
var _comissaries_point = "comissaries_point";
var _comissaries_point_Halo = "comissaries_point1";
var framesPerSecond = 15;
var initialOpacity = 1
var opacity = initialOpacity;
var initialRadius = 5;
var radius = initialRadius;
var maxRadius = 18;
var popup;
var text_legend = "Nombre de casos: "
var _Any = 2018;
var colorSel = "#00fff6";


var H_factor = 50;


var diccionari = {
  "Mes": 0,
  "Nom_Mes": 1,
  "Any": 2,
  "Regio_Policial": 3,
  "Area_Basica_Policial": 4,
  "Titol_Codi_Penal": 5,
  "Tipus_de_Fet": 6,
  "Coneguts": 7,
  "Resolts": 8,
  "Detencions": 9
}
/*
0:Mes;
1:Nom mes;
2:Any;
3:Regió Policial (RP);
4:Àrea Bàsica Policial (ABP);
5:Títol Codi Penal
6:Tipus de fet;
7:Coneguts;
8:Resolts;
9:Detencions"
*/

$(document).ready(function () {


  if ($(document).width() < 700 || $(document).height() < 700) {
    collapsaMenu();
  }

  loadDataCSV(_Any, 0);


  function loadDataCSV(any, init) {
    $('#cover').show();
    $.ajax({
      type: "GET",
      url: "data/Fets_" + any + ".csv",
      dataType: "text",
      success: function (data) {

        processData(data, init);
        $('#cover').fadeOut(100);
        _Any = any;
        $('#spn_any').html("(" + _Any + ")");

      }
    });
  }

  function processData(allText, init) {
    try {
      var lines = allText.split('\n');
      delictes_Array = lines.map(function (line) {
        return line.split(";");
      });
      addData();
      if (init == 0) {
        addHTML();
        addMap();
      } else if (init == 1) {
        updateTematicByTipusFet($('#sel_tipus_fet').val());

      }


    } catch (err) {

      $('#cover').fadeOut(100);
    }

  }


  function addData() {
    arrayUniqueKeyCurrent = getUniqueValuesfromFilter(diccionari.Area_Basica_Policial, false, delictes_Array);
    arrayUniqueKeyMesosAnyCurrent = getUniqueValuesfromFilter(diccionari.Mes, false, delictes_Array);

  }




  function addMap() {
    mapboxgl.accessToken = 'NOT-REQUIRED-WITH-YOUR-VECTOR-TILES-DATA';
    map = new mapboxgl.Map({
      container: 'map',
      center: [arrayXYZPB[0], arrayXYZPB[1]],
      pitch: arrayXYZPB[3],
      hash: true,
      bearing: arrayXYZPB[4],
      style: 'https://tilemaps.icgc.cat/tileserver/styles/water.json',
      zoom: arrayXYZPB[2],
      attributionControl:false}).addControl(new mapboxgl.AttributionControl({
        compact: true
    }));



    map.setMaxZoom(14.45);
    map.addControl(new mapboxgl.NavigationControl());
    var setCenterFromLayer = true;
    popup = new mapboxgl.Popup({
      closeButton: false
    });

    jQuery('.mapboxgl-ctrl-top-right div:first')
      .append('<button id="bt_pitch" title="Perspectiva" class="mapboxgl-ctrl-icon fa fa-road"></button>');

    jQuery('#bt_pitch').on('click', function () {
      var pitch = parseInt(map.getPitch());
      pitch == 60 ? pitch = 0 : pitch = pitch + 30;
      map.easeTo({
        'pitch': pitch
      });

    });


    map.on('load', function () {
      map.getCanvas().style.cursor = 'default';
      map.addSource('abd_source', {
        "attribution": "<a href='https://mossos.gencat.cat/' target='_blank'>Mossos d Esquadra</a>",
        "type": "vector",
        "center": [1.8457, 41.7262, 8],
        "description": "Delictes 2012",
        "format": "pbf",
        "maxzoom": 16,
        "minzoom": 6,
        "tiles": ["https://tilemaps.icgc.cat/tileserver/tileserver.php/arees_basiques_policia.v4/{z}/{x}/{y}.pbf"],
        "vector_layers": [{
          "id": "Arees_Basiques_Policia"
        }]
      });

      map.addLayer({
        "id": id_abp_2D,
        "source": "abd_source",
        "source-layer": "Arees_Basiques_Policia",
        "interactive": true,
        "transition": {
          "duration": 2600,
          "delay": 0
        },
        "type": "fill",
        "layout": {
          "visibility": "visible"
        },
        "paint": {
          "fill-color": "#FFCC00",
          "fill-opacity": [
            "interpolate", ["exponential", 1],
            ["zoom"],
            8,
            0.95,
            15,
            0.3
          ]
        }
      },"place-town");

      map.addLayer({
        "id": id_abp_2D_lin,
        "source": "abd_source",
        "source-layer": "Arees_Basiques_Policia",
        "interactive": true,
        "transition": {
          "duration": 2600,
          "delay": 0
        },
        "type": "line",
        "layout": {
          "visibility": "visible"
        },
        "paint": {
          "line-color": "#ffffff"
        }
      },"place-town");

      map.addLayer({
        "id": id_abp_2D_lin_selected,
        "source": "abd_source",
        "source-layer": "Arees_Basiques_Policia",
        "interactive": true,
        "transition": {
          "duration": 2600,
          "delay": 0
        },
        "type": "line",
        "layout": {
          "visibility": "visible"
        },
        "paint": {
          "line-color": colorSel,
          "line-width": 3
        },
        "filter": ["in", "abp", ""]
      },"place-town");


      map.addLayer({
        "id": id_abp_3D,
        "source": "abd_source",
        "source-layer": "Arees_Basiques_Policia",
        "interactive": true,
        "transition": {
          "duration": 2600,
          "delay": 0
        },
        "type": "fill-extrusion",
        "layout": {
          "visibility": "none"
        },
        "paint": {
          "fill-extrusion-color": "#FFCC00",
		  "fill-extrusion-opacity": 0.8,
          "fill-extrusion-height": [
            "interpolate", ["exponential", 50],
            ["zoom"],
            8,
            1,
            15,
            0.3
          ]
        }
      },"place-town");

      addComissaries();

      var insertValues = insertUniqueValuesfromFilter(diccionari.Titol_Codi_Penal, false, delictes_Array, "#sel_codi_penal");

      if (insertValues) {
        updateSelTipusFet(jQuery("#sel_codi_penal").val());
      }

      map.on("pitchend", function (e) {

        if (map.getPitch() > 1) {
          if (!$('#bt_3d').hasClass('bt_selected')) {
            $('#bt_3d').addClass('bt_selected');
          }
          map.setLayoutProperty(id_abp_3D, "visibility", "visible");
          map.setLayoutProperty(id_abp_2D, "visibility", "none");
          map.setLayoutProperty(id_abp_2D_lin, "visibility", "none");
        } else {
          $('#bt_3d').removeClass('bt_selected');
          map.setLayoutProperty(id_abp_2D, "visibility", "visible");
          map.setLayoutProperty(id_abp_2D_lin, "visibility", "visible");
          map.setLayoutProperty(id_abp_3D, "visibility", "none");
        }

      });
    }); //final load   

  } //fi map


  function addComissaries() {

    $.ajax({
      url: _url_geojson_comissaries,
      jsonp: "callback",
      dataType: "json",
      success: function (comissariesGEOJSON) {
        map.addSource("comissaries_source", {
          type: "geojson",
          data: comissariesGEOJSON
        });


        map.addLayer({
          "id": _comissaries_point,
          "type": "circle",

          "source": "comissaries_source",
          "layout": {
            "visibility": "none"

          },
          "paint": {
            "circle-radius": initialRadius,
            "circle-radius-transition": {
              duration: 0
            },
            "circle-opacity-transition": {
              duration: 0
            },
            "circle-color": "#6D98B6"
          }
        });

        map.addLayer({
          "id": _comissaries_point_Halo,
          "type": "circle",
          "source": "comissaries_source",

          "layout": {
            "visibility": "none"

          },

          "paint": {
            "circle-radius": initialRadius,
            "circle-color": "#a90000"

          }
        });


        animateMarker(0);

      }
    });



    map.on("mousemove", id_abp_3D, function (e) {
      actOnMove(e);
    });

    map.on("mousemove", id_abp_2D, function (e) {

      actOnMove(e);

    });


    map.on("click", id_abp_3D, function (e) {
      actOnClik(e);
    });

    map.on("click", id_abp_2D, function (e) {

      actOnClik(e);

    });



    map.on('mouseleave', id_abp_3D, function () {
      map.getCanvas().style.cursor = '';
      popup.remove();

    });


    map.on('mouseleave', id_abp_2D, function () {
      map.getCanvas().style.cursor = '';
      popup.remove();

    });


    map.on("mousemove", _comissaries_point_Halo, function (e) {

      map.getCanvas().style.cursor = 'pointer';
      var feature = e.features[0];
      var txt = "<div class='popup'>" +
        "<div>" + feature.properties.NOM + "</div>" +
        "<div>" + feature.properties.VIA + "</div>" +
        "<div>Telf:" + feature.properties.TELEFON1 + "</div>" +
        // "<div>"+feature.properties.EMAIL+"</div>"+
        "<div>" + feature.properties.POBLACIO + "</div>" +
        "</div>";
      popup.setLngLat(e.lngLat)
        .setHTML(txt)
        .addTo(map);


    });

    map.on('mouseleave', _comissaries_point_Halo, function () {
      map.getCanvas().style.cursor = '';
      popup.remove();

    });


  }


  function addHTML() {

    insertPaletteColor("#ramps", 6);
    createSlider(anysDades);
    initChart();

    $('#sel_codi_penal').on('change', function () {
      updateSelTipusFet($(this).val());
    });


    $('#sel_tipus_fet').on('change', function () {
      updateTematicByTipusFet($(this).val());
    });


    $('.ramp').click(function () {
      removeClassSelected(_classSelected, '.ramp');
      $(this).addClass(_classSelected);
      setEstilsMapa();

    });


    $('#bt_3d').click(function () {

      if ($(this).hasClass('bt_selected')) {
        $(this).removeClass('bt_selected');
        map.easeTo({
          'pitch': 0
        });
        // $('#i_3d').html('<b>3D</b>');
      } else {

        $(this).addClass('bt_selected');
        map.easeTo({
          'pitch': 45
        });
        // $('#i_3d').html('<b>2D</b>');
      }


    });






    $('#bt_comissaries').click(function () {

      if ($(this).hasClass('bt_selected')) {
        $(this).removeClass('bt_selected');
        map.setLayoutProperty(_comissaries_point, 'visibility', 'none');
        map.setLayoutProperty(_comissaries_point_Halo, 'visibility', 'none');
      } else {

        $(this).addClass('bt_selected');
        map.setLayoutProperty(_comissaries_point, 'visibility', 'visible');
        map.setLayoutProperty(_comissaries_point_Halo, 'visibility', 'visible');
      }

    });


    $('#burguer-menu-icon').click(function () {
      collapsaMenu();
    });





    $('#bt_vincle').on('click', function () {


      /*
            var params = "?XYZPB=" + map.getCenter().lng.toFixed(6) + "," + map.getCenter().lat.toFixed(6) + "," + map.getZoom().toFixed(0) + "," + map.getPitch().toFixed(1) + "," + map.getBearing().toFixed(1) +
              "&PROP=" + temaActiu +
              "&ANY=" + anyActiu +
              "&COLORS=" + arrayColors[0].replace('#', '') + "," + arrayColors[5].replace('#', '') +
              "&FILTERS=" + arrayFilters[0] + "," + arrayFilters[1] + "&";

              */
      var currentURL = "http://" + $.url('hostname') + $.url('path');

      $('#urlMap').val(currentURL);
      var iframecode = '<iframe width="100%" height="100%" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="' + currentURL + '" ></iframe>';
      $('#iframeMap').html(iframecode);
      $('#enllacamodal').modal('show');
    });



    jQuery('#bt_capture').on('click', function () {
      $('#md_print').modal({
        show: true
      });
    });











  }


  function collapsaMenu() {

    if ($('#burguer-menu-icon').hasClass('fa-chevron-circle-down')) { //tancat
      $('#burguer-menu-icon').removeClass('fa-chevron-circle-down');
      $('#burguer-menu-icon').addClass('fa-chevron-circle-up');
      $('.social_in').hide();
      $('.social_out').show();
     $('#titol').css('width', '100%');
    // $('#div_panel_body').show();
      if ($(document).width() < 700 || $(document).height() < 700) {
        $('#div_panel').css('height', '99%');
      } else {
       $('#div_panel').css('height', '93%');
      }
    } else {

      $('#burguer-menu-icon').removeClass('fa-chevron-circle-up');
      $('#burguer-menu-icon').addClass('fa-chevron-circle-down');
      $('.social_out').hide();
      $('.social_in').show();
      $('#titol').css('width', '100%');
      $('#div_panel').css('height', '58px');
     // $('#div_panel_body').hide();
    }
    $('.map-overlay').toggle();
   
    $('.panel-footer').toggle();

  }

  function actOnClik(e) {

    var feature = e.features[0];
    var abp = feature.properties.abp;

    if (selected_feature == abp) {
      abp = "";
      selected_feature = null;
      setEstilsMapa();
    } else {
      selected_feature = abp;
      recordeSetABP = getArrayValuesFromUniqueKeyFilterByABP(arrayUniqueKeyMesosAnyCurrent, arrayFromSearchQuery, diccionari.Mes, diccionari.Coneguts, diccionari.Nom_Mes, true, $('#sel_tipus_fet').val(), diccionari.Area_Basica_Policial, feature.properties.abp);
      prepareDatatoChart(recordeSetABP, colorSel, true, feature.properties.abp)
    }
    map.setFilter(id_abp_2D_lin_selected, ['in', 'abp', abp]);

  }


  function actOnMove(e) {

    map.getCanvas().style.cursor = 'pointer';
    var feature = e.features[0];
    var txt = "<div class='popup'>" +
      "<div>" + feature.properties.abp + "</div>" +

      "</div>";
    popup.setLngLat(e.lngLat)
      .setHTML(txt)
      .addTo(map);

  }

  function removeClassSelected(_className, ClassID) {
    $(ClassID).each(function () {
      $(this).removeClass(_className);
    });
  }

  function updateSelTipusFet(valueTipusCodiPenal) {
    var _up = insertValuesFromQuery(diccionari.Titol_Codi_Penal, valueTipusCodiPenal, diccionari.Tipus_de_Fet, '#sel_tipus_fet', delictes_Array, );
    if (_up) {
      updateTematicByTipusFet($('#sel_tipus_fet').val());
    }

  }


  function updateTematicByTipusFet(valueTipusFet) {

    arrayFromSearchQuery = getValuesFromQuery(diccionari.Tipus_de_Fet, valueTipusFet, delictes_Array);
    recordeSetCatalunya = getArrayValuesFromUniqueKey(arrayUniqueKeyMesosAnyCurrent, arrayFromSearchQuery, diccionari.Mes, diccionari.Coneguts, diccionari.Nom_Mes, true, valueTipusFet);
    recordSetCurrent = getSumValuesFromUniqueKey(arrayUniqueKeyCurrent, arrayFromSearchQuery, diccionari.Area_Basica_Policial, diccionari.Coneguts, diccionari.Tipus_de_Fet, true, valueTipusFet);
    numRangs = recordSetCurrent.numRangs;
    setEstilsMapa();

  }


  function _updateToChartCat(_recordeSetCatalunya, color, addFromClick, textABP) {

    var ArrayLabels = [];
    var ArrayValors = [];

    for (var i = 0; i < _recordeSetCatalunya.results.length; i++) {
      ArrayLabels.push(_recordeSetCatalunya.results[i][2]);
      ArrayValors.push(_recordeSetCatalunya.results[i][1]);
    }

    $('#tit_grafic').html(_recordeSetCatalunya.titol);
    updateChart(ArrayLabels, ArrayValors, _recordeSetCatalunya.titol, color);

    return true;

  }

  function prepareDatatoChart(_recordeSetCatalunya, color, addFromClick, textABP) {

    var ArrayLabels = [];
    var ArrayValors = [];
    for (var i = 0; i < _recordeSetCatalunya.results.length; i++) {
      ArrayLabels.push(_recordeSetCatalunya.results[i][2]);
      ArrayValors.push(_recordeSetCatalunya.results[i][1]);
    }
    if (textABP != null) {
      addLineToChart(ArrayValors, color, textABP);
    }

  }


  function setEstilsMapa() {

    try {
      arrayColorCurrent = getColorArrayfromSelectedBrewer(numRangs, initNumRangs);
      var color_mig = arrayColorCurrent[parseInt(arrayColorCurrent.length / 2)];
      changeColorSelector('#i_square', color_mig);
      estilCurrent = getGenerateStyle(recordSetCurrent, numRangs, arrayColorCurrent, H_factor);
      var _upd = _updateToChartCat(recordeSetCatalunya, color_mig, false, selected_feature);
      if (_upd && selected_feature != null) {
        recordeSetABP = getArrayValuesFromUniqueKeyFilterByABP(arrayUniqueKeyMesosAnyCurrent, arrayFromSearchQuery, diccionari.Mes, diccionari.Coneguts, diccionari.Nom_Mes, true, $('#sel_tipus_fet').val(), diccionari.Area_Basica_Policial, selected_feature);
        prepareDatatoChart(recordeSetABP, colorSel, true, selected_feature)
      }
      map.setPaintProperty(id_abp_2D, 'fill-color', estilCurrent.color);
      map.setPaintProperty(id_abp_3D, 'fill-extrusion-color', estilCurrent.color);
      map.setPaintProperty(id_abp_3D, 'fill-extrusion-height', estilCurrent.height);
      $('#div_capcalera').css('color', color_mig);
      $('#div_capcalera').html(estilCurrent.titol + ' <span id="spn_any"></span>');
      $('#spn_any').text("(" + _Any + ")");
      updateLegendSVG(estilCurrent.legend_color, estilCurrent.legend_rangs, estilCurrent.titol, '#taula_dades', numRangs);
      updateLegendSVG(estilCurrent.legend_color, estilCurrent.legend_rangs, estilCurrent.titol, '#h_legend', numRangs);
      // map.setFilter(id_abp_2D_lin_selected, ['in', 'abp', ""]);
      //selected_feature = null;

    } catch (err) {

      $('#cover').fadeOut(100);
    }
  }

  function changeColorSelector(HTML_ID, color) {

    $(HTML_ID).css('color', color);

  }


  function createSlider(arrayValues) {

    var last = parseInt(anysDades.length - 1)



    slider = document.getElementById('slider');
    noUiSlider.create(slider, {
      start: arrayValues[last],
      step: 1,
      connect: true,
      format: {
        to: function (value) {
          return parseInt(value).toFixed(0);
        },
        from: function (value) {
          return parseInt(value).toFixed(0);
        }
      },
      tooltips: true,
      range: {
        'min': arrayValues[0],
        'max': arrayValues[last]
      }
    });

    slider.noUiSlider.pips({
      mode: 'values',
      values: arrayValues,
      density: 20
    });





    slider.noUiSlider.on('change', function (values, handle) {
      $('.noUi-tooltip').show();

      loadDataCSV(values[0], 1);


    });

    slider.noUiSlider.on('end', function (values, handle) {
      $('.noUi-tooltip').hide();

    });


  }






  function animateMarker(timestamp) {
    setTimeout(function () {
      requestAnimationFrame(animateMarker);

      radius += (maxRadius - radius) / framesPerSecond;
      opacity -= (.9 / framesPerSecond);

      if (opacity <= 0) {
        radius = initialRadius;
        opacity = initialOpacity;
      }

      map.setPaintProperty(_comissaries_point, 'circle-radius', radius);
      map.setPaintProperty(_comissaries_point, 'circle-opacity', opacity);



    }, 1000 / framesPerSecond);



  }





}); //fi ready