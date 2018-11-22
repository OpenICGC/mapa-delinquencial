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