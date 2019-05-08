
/*
var link = document.createElement("link");
link.id = "CookiesICGCCSS";
link.setAttribute("rel", "stylesheet");
link.setAttribute("type", "text/css");
link.setAttribute("href", "https://gencat.github.io/ICGC-Cookie-GDPR/dist/cookies-icgc.min.css");
link.addEventListener("load", function() {

	var cookies = document.createElement("script");
	cookies.id = "CookiesICGCScript";
	cookies.setAttribute("src", "https://gencat.github.io/ICGC-Cookie-GDPR/dist/cookies-icgc.js")
	document.head.appendChild(cookies);
	cookies.addEventListener("load", function() {

		const cuqui = new icgc.CookiesICGC("visors.icgc.cat", ["UA-46332195-2"], {
			content: {
				config: "GDPR"
			}
		});

*/

(function(i, s, o, g, r, a, m) {
	i['GoogleAnalyticsObject'] = r;
	i[r] = i[r] || function() {
		(i[r].q = i[r].q || []).push(arguments)
	}, i[r].l = 1 * new Date();
	a = s.createElement(o), m = s.getElementsByTagName(o)[0];
	a.async = 1;
	a.src = g;
	m.parentNode.insertBefore(a, m)
})(window, document, 'script',
		'//www.google-analytics.com/analytics.js', 'ga');

ga('create', 'UA-46332195-2', 'auto');
ga('send', 'pageview');



		if (typeof console !== 'undefined' && typeof console.log === 'function' && !window.test) {

		console.debug("Fet per @ICGCGeoStart - Institut Cartogràfic i Geològic de Catalunya ICGC.\n"+
		"******************** \n"+
		"Sergio Anguita Rovira \n"+
		"Isaac Besora Vilardaga \n"+	
		"Montserrat Ortega Gallart \n"+
		"Victor Pascual Ayats \n"+
		"Gabriel Reynal Blanch \n"+
		"Rafael Roset Arisso \n"+
		"Jessica Sena Garcia \n"+
		"Wladimir Szczerban Llatas \n"+
		"Marc Torres Saura \n"+
		"********************");
	
		}

	});

});
document.head.appendChild(link);