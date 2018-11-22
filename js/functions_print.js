// functions print

$(document).ready(function() {

var maxSize;
if (map) {
  var canvas = map.getCanvas();
  var gl = canvas.getContext('experimental-webgl');
  maxSize = gl.getParameter(gl.MAX_RENDERBUFFER_SIZE);
}

var errors = {
  width : {
    state : false,
    msg : 'Amplada ha de ser un número positiu!',
    grp : 'widthGroup'
  },
  height : {
    state : false,
    grp : 'heightGroup'
  },
  dpi : {
    state : false,
    msg : 'DPI ha de ser un número positiu!',
    grp : 'dpiGroup'
  }
};

function handleErrors() {
  'use strict';
  var errorMsgElem = document.getElementById('error-message');
  var anError = false;
  var errorMsg;
  for ( var e in errors) {
    e = errors[e];
    if (e.state) {
      if (anError) {
        errorMsg += ' ' + e.msg;
      } else {
        errorMsg = e.msg;
        anError = true;
      }
      document.getElementById(e.grp).classList.add('has-error');
    } else {
      document.getElementById(e.grp).classList.remove('has-error');
    }
  }
  if (anError) {
    errorMsgElem.innerHTML = errorMsg;
    errorMsgElem.style.display = 'block';
  } else {
    errorMsgElem.style.display = 'none';
  }
}

function isError() {
  'use strict';
  for ( var e in errors) {
    if (errors[e].state) {
      return true;
    }
  }
  return false;
}

function preparaFormPrint() {

  jQuery('#widthInput')
  .on(
    'change',
    function(e) {


      'use strict';
      var val = Number(e.target.value);
      var dpi = Number(jQuery('#dpiInput').val());
      if (val > 0) {
        if (val * dpi > maxSize) {
          errors.width.state = true;
          errors.width.msg = 'El valor màxim de l´amplada és '
          + maxSize
          + 'px, però l´amplada entrada és '
          + (val * dpi) + 'px.';
        } else if (val * window.devicePixelRatio * 96 > maxSize) {
          errors.width.state = true;
          errors.width.msg = 'l´amplada és massa gran!';
        } else {
          errors.width.state = false;
          // document.getElementById('map').style.width =
          // toPixels(val);
          // map.resize();
        }
      } else {
        errors.width.state = true;
        errors.height.msg = 'l´amplada ha de ser un número positiu!';
      }
      handleErrors();
    });

    jQuery('#heightInput')
    .on(
      'change',
      function(e) {
        // form.heightInput.addEventListener('change',
        // function(e) {
        'use strict';

        var val = Number(e.target.value);

        var dpi = Number(jQuery('#dpiInput').val());

        if (val > 0) {
          if (val * dpi > maxSize) {
            errors.height.state = true;
            errors.height.msg = 'El valor màxim de l´alçada és '
            + maxSize
            + 'px, però l´alçada entrada és '
            + (val * dpi) + 'px.';
          } else if (val * window.devicePixelRatio * 96 > maxSize) {
            errors.height.state = true;
            errors.height.msg = 'l´alçada és massa gran!';
          } else {
            errors.height.state = false;
            // document.getElementById('map').style.height =
            // toPixels(val);
            // map.resize();
          }
        } else {
          errors.height.state = true;
          errors.height.msg = 'l´alçada ha de ser un número positiu!';
        }
        handleErrors();
      });

      jQuery('#dpiInput').on('change', function(e) {
        // form.dpiInput.addEventListener('change', function(e) {
        'use strict';
        var val = Number(e.target.value);
        if (val > 0) {
          errors.dpi.state = false;
          var event = document.createEvent('HTMLEvents');
          // event.initEvent('change', true, true);
          // form.widthInput.dispatchEvent(event);
          // form.heightInput.dispatchEvent(event);
        } else {
          errors.dpi.state = true;
        }
        handleErrors();
      });

      jQuery('#mmUnit').on('change', function(e) {

        jQuery('#widthInput').val(jQuery('#widthInput').val() * 25.4);
        jQuery('#heightInput').val(jQuery('#heightInput').val() * 25.4);
      });

      jQuery('#inUnit').on('change', function(e) {
        // form.inUnit.addEventListener('change', function() {
        'use strict';
        jQuery('#widthInput').val(jQuery('#widthInput').val() / 25.4);
        jQuery('#heightInput').val(jQuery('#heightInput').val() / 25.4);
      });

      /*
      * if($('input[name=unitOptions]:checked', '#config').val()=='mm'){
      *
      * jQuery('#widthInput').val(jQuery('#widthInput').val() *25.4) ;
      * jQuery('#heightInput').val(jQuery('#heightInput').val() * 25.4) ; }
      */
      /*
      * if (jQuery('#unitOptions').val() == 'mm') { jQuery('#widthInput').val() *=
      * 25.4; jQuery('#heightInput').val() *= 25.4; }
      */

    }

    function toPixels(length) {
      'use strict';
      var unit = $('input[name=unitOptions]:checked', '#config').val();
      var conversionFactor = 96;
      if (unit == 'mm') {
        conversionFactor /= 25.4;
      }

      return conversionFactor * length + 'px';
    }

    jQuery('#generate-btn').on('click', generateMap);

    // document.getElementById('generate-btn').addEventListener('click',
    // generateMap);

    function generateMap() {
      'use strict';

      if (isError()) {
        openErrorModal('Configuració invàlida.');
        return;
      }

      document.getElementById('spinner').style.display = 'inline-block';
      document.getElementById('generate-btn').classList.add('disabled');

      var width = Number(jQuery('#widthInput').val());
      var height = Number(jQuery('#heightInput').val());

      var dpi = Number(jQuery('#dpiInput').val());

      var format = $('input[name=outputOptions]:checked', '#config').val();

      var unit = $('input[name=unitOptions]:checked', '#config').val();

      var zoom = map.getZoom();
      var center = map.getCenter();
      var bearing = map.getBearing();
      var pitch= map.getPitch();

      createPrintMap(width, height, dpi, format, unit, zoom, center, bearing, pitch);
    }

    function createPrintMap(width, height, dpi, format, unit, zoom, center, bearing, pitch) {
      'use strict';

      // Calculate pixel ratio

      /*
      * console.info(width); console.info(height); console.info(dpi);
      * console.info(format); console.info(unit); console.info(zoom);
      * console.info(center); console.info( bearing);
      */

      var actualPixelRatio = window.devicePixelRatio;
      Object.defineProperty(window, 'devicePixelRatio', {
        get : function() {
          return dpi / 96
        }
      });

      // Create map container
      var hidden = document.createElement('div');
      hidden.className = 'hidden-map';
      document.body.appendChild(hidden);
      var container = document.createElement('div');
      container.style.width = toPixels(width);
      container.style.height = toPixels(height);

      // console.info( container.style.width);
      // console.info( container.style.height);

      hidden.appendChild(container);

      // Render map
      var renderMap = new mapboxgl.Map({
        container : container,
        center : center,
        zoom : zoom,
        style : map.getStyle(),
        bearing : bearing,
        pitch:pitch,
        interactive : false,
        attributionControl : false
      });
      renderMap.once('load', function() {
        if (format == 'png') {
          renderMap.getCanvas().toBlob(function(blob) {
            saveAs(blob, 'captura_mapa.png');
          });
        } else {
          var pdf = new jsPDF({
            orientation : width > height ? 'l' : 'p',
            unit : unit,
            format : [ width, height ],
            compress : true
          });

          pdf.addImage(renderMap.getCanvas().toDataURL('image/jpeg', 0.95),
          'jpeg', 0, 0, width, height);
          pdf.save('captura_mapa.pdf');
        }

        renderMap.remove();
        hidden.parentNode.removeChild(hidden);
        Object.defineProperty(window, 'devicePixelRatio', {
          get : function() {
            return actualPixelRatio
          }
        });
        document.getElementById('spinner').style.display = 'none';
        document.getElementById('generate-btn').classList.remove('disabled');
      });
    }


});
