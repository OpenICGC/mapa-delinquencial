function getGEOJSONArray(geojson, positions, clau) {
    var array1 = []
    var z = 0;
    $.each(geojson.features, function (key, val) {
        z = z + 1;
        if (z <= positions) {
            $.each(val.properties, function (i, j) {

                if (i == clau) {
                    array1.push(j);
                }
            })
        }
    });

    return array1;

}


function ckeckAQArrays(array1, array2) {
    var common = $.grep(array1, function (element) {
        return $.inArray(element, array2) !== -1;
    });
    return common.length;
}


function normalizeNameColumns(row_CSV) {
    var normalized = [];
    $.each(row_CSV, function (i, val) {
        normalized.push(treuAccentsiEspais(val));
    });
    return normalized;
}


function getTypeColumns(row_CSV) {
    var normalized = [];

    $.each(row_CSV, function (i, val) {
        normalized.push(typeof (quiSoconVinc(val)));
    });
    return normalized;
}

function treuAccentsiEspais(str) {
    try {
        str = removeAccents(str);
        str = str.replace(/[^0-9a-zA-Z ]/g, "");
        str = str.replace(/\s/g, "-");
    } catch (Err) {}
    return str;
}


function removeAccents(str) {
    var accents = 'ÀÁÂÃÄÅàáâãäåÒÓÔÕÕÖØòóôõöøÈÉÊËèéêëðÇçÐÌÍÎÏìíîïÙÚÛÜùúûüÑñŠšŸÿýŽž';
    var accentsOut = "AAAAAAaaaaaaOOOOOOOooooooEEEEeeeeeCcDIIIIiiiiUUUUuuuuNnSsYyyZz";
    str = str.split('');
    var strLen = str.length;
    var i, x;
    for (i = 0; i < strLen; i++) {
        if ((x = accents.indexOf(str[i])) != -1) {
            str[i] = accentsOut[x];
        }
    }
    return str.join('');
}


function randomColor() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
}



function getRamdomColorFromArray() {
    var colors = [
        '#000000', '#424242', '#636363', '#9C9C94', '#CEC6CE', '#EFEFEF', '#F7F7F7', '#FFFFFF',
        '#FF0000', '#FF9C00', '#FFFF00', '#00FF00', '#00FFFF', '#0000FF', '#9C00FF', '#FF00FF',
        '#F7C6CE', '#FFE7CE', '#FFEFC6', '#D6EFD6', '#CEDEE7', '#CEE7F7', '#D6D6E7', '#E7D6DE',
        '#E79C9C', '#FFC69C', '#FFE79C', '#B5D6A5', '#A5C6CE', '#9CC6EF', '#B5A5D6', '#D6A5BD',
        '#E76363', '#F7AD6B', '#FFD663', '#94BD7B', '#73A5AD', '#6BADDE', '#8C7BC6', '#C67BA5',
        '#CE0000', '#E79439', '#EFC631', '#6BA54A', '#4A7B8C', '#3984C6', '#634AA5', '#A54A7B',
        '#9C0000', '#B56308', '#BD9400', '#397B21', '#104A5A', '#085294', '#311873', '#731842',
        '#630000', '#7B3900', '#846300', '#295218', '#083139', '#003163', '#21104A', '#4A1031'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
}

//getColumFromGEOJSON(keyField.GeoJSON,GeoJSON)
function getColumFromGEOJSON(keyField, GeoJSON) {
    var items = [];
    $.each(GeoJSON.features, function (key, val) {
        if (typeof val.properties[keyField] != 'undefined') {
            items.push(val.properties[keyField]);
        }
    });
    return items;
}


function getColumFromGEOJSONFilter(keyField, GeoJSON, keyFilter, valueFilter) {
    var items = [];
    $.each(GeoJSON.features, function (key, val) {
        if (typeof val.properties[keyField] != 'undefined' &&
            val.properties[keyField] != null &&
            val.properties[keyField] != 'null' &&
            !isNaN(val.properties[keyField])) {

            if (val.properties[keyFilter] < valueFilter) {

                items.push(val.properties[keyField]);
            }
        }
    });
    return items;
}

function getColumFromCSV(numColum, forceNumber, dataCSV) {
    var arrayColum = [];
    $.each(dataCSV, function (i, feature) {
        if (i > 0) {
            var value = feature[numColum];
            if (value && value != 'undefined') {
                if (forceNumber) {
                    arrayColum.push(quiSoconVinc(value));
                } else {
                    arrayColum.push(value);
                }
            }
        }
    });
    return arrayColum;
}








function getUniqueValuesfromFilter(numKeyColum, forceNumberKeyColum, dataCSV) {
    var estatsKeyColum = new geostats(getColumFromCSV(numKeyColum, forceNumberKeyColum, dataCSV));
    var itemKeyColum = estatsKeyColum.getClassUniqueValues();
    return itemKeyColum;

}




function insertUniqueValuesfromFilter(numKeyColum, forceNumberKeyColum, dataCSV, HTML_ID) {
    try {
        var estatsKeyColum = new geostats(getColumFromCSV(numKeyColum, forceNumberKeyColum, dataCSV));
        insertValueToSelectHTML(estatsKeyColum, HTML_ID);
        return true;
    } catch (err) {
        return false;

    }

}



function insertValuesFromQuery(numQueryColum, textQuery, numTextColum, HTML_ID, dataCSV) {


    try {
        var arrayColum = [];
        $.each(dataCSV, function (i, feature) {
            if (i > 0) {
                if (feature)
                    var value = feature[numQueryColum];
                if (value == textQuery) {
                    arrayColum.push(feature[numTextColum]);
                }
            }
        });

        var estatsKeyColum = new geostats(arrayColum);
        insertValueToSelectHTML(estatsKeyColum, HTML_ID);


        return true;
    } catch (err) {
        return false;


    }


}

function insertValueToSelectHTML(itemKeyColumGeostats, HTML_ID) {

    try {

        $(HTML_ID).html('');

        var itemKeyColum = itemKeyColumGeostats.getClassUniqueValues();

        $.each(itemKeyColum, function (key, value) {
            $(HTML_ID)
                .append($('<option>', {
                        value: value
                    })
                    .text(value));
        });



    } catch (err) {
        console.log(err);

    }

}


function getValuesFromQuery(numQueryColum, textQuery, dataCSV) {

    var arrayColum = [];
    $.each(dataCSV, function (i, feature) {
        if (i > 0) {
            if (feature)
                var value = feature[numQueryColum];
            if (value == textQuery) {
                arrayColum.push(feature);
            }
        }
    });
    return arrayColum;
}


function updateLegend(legend, textTitol, HTML_ID) {


    $(HTML_ID).html(legend);
    $('.geostats-legend-title').html(textTitol);

}



function getGenerateStyle(recordset, numRangs, arrayColors, factorH) {


    //var _numRangs = recordset.estadistica.getClassQuantile(numRangs);
    var _numRangs = recordset.estadistica.getClassJenks(numRangs);

    if (numRangs < initNumRangs) {
        _numRangs = recordset.estadistica.getClassUniqueValues(numRangs);
    }

    if (recordset.estadistica.ranges.length > arrayColors.length) {
        arrayColorCurrent = getColorArrayfromSelectedBrewer(recordset.estadistica.ranges.length + 1, initNumRangs);
        recordset.estadistica.setColors(arrayColorCurrent);

    } else {
        recordset.estadistica.setColors(arrayColors);
    }



    var expColor = ["match", ["get", "abp"]];
    var expHeight = ["match", ["get", "abp"]];
    recordset.results.forEach(function (row) {
        var value = parseInt((row["sum"]));
        var color = recordset.estadistica.colors[recordset.estadistica.getRangeNum(value)];
        if (!color) {
            color = "rgba(0,0,0,0)";
        }

        expColor.push(row["abp"], color);
        expHeight.push(row["abp"], parseInt(value * factorH));
    });

    expColor.push("rgba(0,0,0,0)");
    expHeight.push(0);



    return {
        "color": expColor,
        "height": expHeight,
        'legend': recordset.estadistica.getHtmlLegend(),
        'titol': recordset.titol,
        'legend_color': recordset.estadistica.colors,
        'legend_rangs': recordset.estadistica.bounds
    };

}




function getArrayValuesFromUniqueKeyFilterByABP(arrayUniqueKey, arrayFromSearchQuery, numKeyColum, numSumColum, textNumColum, forceNumber, textTitle, numKeyColumABP, nomABP) {

    var array = [];
    var arrayValues = [];

    var title = textTitle;
    var text = "";
    for (var i = 0; i < arrayUniqueKey.length; i++) {
        var ini = 0;
        for (var j = 0; j < arrayFromSearchQuery.length; j++) {

            if (arrayUniqueKey[i] == arrayFromSearchQuery[j][numKeyColum] && arrayFromSearchQuery[j][numKeyColumABP] == nomABP) {
                var _al = parseInt(arrayFromSearchQuery[j][numSumColum]);
                var text = arrayFromSearchQuery[j][textNumColum]
                if (isNaN(_al)) {
                    _al = 0
                }

                ini = ini + parseInt(_al);
                // text=arrayFromSearchQuery[j][textNumColum]
            }
        }
        array.push([arrayUniqueKey[i], ini, capitalizeFirstLetter(text)]);

        array.sort(sortFunction);

    }

    return {
        "titol": title,
        "filter": nomABP,
        "results": array
    };


}













function getArrayValuesFromUniqueKey(arrayUniqueKey, arrayFromSearchQuery, numKeyColum, numSumColum, textNumColum, forceNumber, textTitle) {

    var array = [];
    var arrayValues = [];

    var title = textTitle;
    var text = "";
    for (var i = 0; i < arrayUniqueKey.length; i++) {
        var ini = 0;
        for (var j = 0; j < arrayFromSearchQuery.length; j++) {

            if (arrayUniqueKey[i] == arrayFromSearchQuery[j][numKeyColum]) {
                var _al = parseInt(arrayFromSearchQuery[j][numSumColum]);
                var text = arrayFromSearchQuery[j][textNumColum]
                if (isNaN(_al)) {
                    _al = 0
                }

                ini = ini + parseInt(_al);
                // text=arrayFromSearchQuery[j][textNumColum]
            }
        }
        array.push([arrayUniqueKey[i], ini, capitalizeFirstLetter(text)]);

        array.sort(sortFunction);

    }

    return {
        "titol": title,
        "results": array
    };


}

function sortFunction(a, b) {
    if (a[0] === b[0]) {
        return 0;
    } else {

        return (a[0] < b[0]) ? -1 : 1;
    }
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


function getSumValuesFromUniqueKey(arrayUniqueKey, arrayFromSearchQuery, numKeyColum, numSumColum, textNumColum, forceNumber, textTitle) {
    var array = [];
    var arrayValues = [];
    var _GEOSTATS;
    var title = textTitle;
    var text = "";
    for (var i = 0; i < arrayUniqueKey.length; i++) {
        var ini = 0;
        for (var j = 0; j < arrayFromSearchQuery.length; j++) {

            if (arrayUniqueKey[i] == arrayFromSearchQuery[j][numKeyColum]) {
                var _al = parseInt(arrayFromSearchQuery[j][numSumColum]);
                if (isNaN(_al)) {
                    _al = 0
                }

                ini = ini + parseInt(_al);
                // text=arrayFromSearchQuery[j][textNumColum]
            }
        }
        array.push({
            "abp": arrayUniqueKey[i],
            "sum": ini
        })
        arrayValues.push(ini);
    }
    _GEOSTATS = new geostats(arrayValues);
    var newEstats = new geostats(arrayValues);


    var _controlUniques = newEstats.getClassUniqueValues().length;

    if (_controlUniques >= initNumRangs) {
        _numRangs = initNumRangs;
    } else {
        _numRangs = _controlUniques;
    }


    return {
        "estadistica": _GEOSTATS,
        "titol": title,
        "results": array,
        "numRangs": _numRangs
    };


}


function getTitlefromCSV(numColum, dataCSV) {
    return dataCSV[0][numColum];
}


function calculateStatsCVS(numColum, forceNumber, dataCSV) {
    var _GEOSTATS;
    var title = dataCSV[0][numColum];
    _GEOSTATS = new geostats(getColumFromCSV(numColum, forceNumber, dataCSV));

    return {
        "estadistica": _GEOSTATS,
        "titol": title
    };

}


function quiSoconVinc(valor) {
    if (!isNaN(parseFloat(valor)) && 'string' == typeof (valor)) {
        valor = valor.replace(",", ".");
        valor = parseFloat(valor);
    } else if ('number' == typeof (valor)) {} else if (valor == 'undefined') {
        valor = 0;
    } else {}
    return valor;
}


function calculateStatsGeoJSON(keyField, newGeoJSON) {
    var _GEOSTATS;
    if ('number' == keyType) {
        _GEOSTATS = new geostats(getColumFromGEOJSON(keyField, newGeoJSON));
    }
    return _GEOSTATS;

}