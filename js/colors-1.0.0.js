function getColorArrayfromSelectedBrewer(numRangs, initNumRangs) {

	brewerName = $('.selected').prop('id');

	if (numRangs < initNumRangs) {
		return chroma.brewer[brewerName].slice(numRangs);
	} else {

		return chroma.brewer[brewerName].slice(-numRangs);

	}

}

function getColorArrayfromBrewer(brewerName, numRangs, initNumRangs) {


	if (numRangs < initNumRangs) {
		return chroma.brewer[brewerName].slice(numRangs);
	} else {

		return chroma.brewer[brewerName].slice(-numRangs);

	}



}

function insertPaletteColor(HTML_ID, numRangs) {

	var palettes2 = ["OrRd", "BuGn", "BuPu", "GnBu", "PuBu", "PuBuGn", "PuRd", "RdPu", "YlGn", "YlGnBu", "YlOrBr", "YlOrRd",
		"BrBG", "PRGn", "PuOr", "RdGy", "RdYlBu", "RdYlGn"
	];

	var palettes = ["OrRd", "BuGn", "BuPu", "GnBu", "PuBu", "PuBuGn", "PuRd", "RdPu", "YlGn"];
	var posY = [0, 15, 30, 45, 60, 75, 90.105, 120, 135];
	var colors = [];
	var selected = "";
	$.each(palettes, function (index, palette) {
		if (chroma.brewer[palette]) {
			colors = chroma.brewer[palette].slice(-numRangs);
			if (index == 0) {
				selected = "selected"
			} else {
				selected = ""
			}
			var html = '<div id="' + palette + '" class="ramp ' + palette + ' ' + selected + '"><svg width="15" height="75">';
			$.each(colors, function (index, color) {
				html = html + '<rect fill="' + color + '" width="15" height="15" y="' + posY[index] + '"></rect>';


			});
			html = html + '</svg></div>';
			$(HTML_ID).append(html);
		}
	});
}



function updateLegendSVG(legend_colors, legend_ranges, textTitol, HTML_ID, _numRangs) {

	var html = "";
	var _estil = "";

	if (_numRangs < initNumRangs) {

		_estil = "padding-left:40%";
	}



	for (var index = 0; index < _numRangs; index++) {
		html = html + '<div class="w-15 fl">' +
			'<div style="' + _estil + '" >' + legend_ranges[index];

		if (index == _numRangs - 1) {
			var val = legend_ranges[index + 1];

			if (!val) {
				val = ""
			}

			html = html + '<span style="float: right;">' + val + '</span>';

		}
		html = html + '</div>';
		html = html + '<div style="width:100%;height:20px;border:0px solid white;background-color:' + legend_colors[index] + '"></div></div> ';
	};

	$(HTML_ID).html(html);

	$(HTML_ID + '_header').html("<b>" + textTitol + "</b>");


}