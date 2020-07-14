function initialize() {
		// création de la carte et paramétrage général : centre et niveau de zoom
        var map = L.map('mapid').setView([11.5806, 43.1457], 13);
 
		// création d'une couche "osmLayer"
        var osmLayer = L.tileLayer('http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
            attribution: '© <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
            maxZoom: 19
        });
		    
		// la couche "osmLayer" est ajoutée à la carte		
        map.addLayer(osmLayer);
		
		// création d'une couche "Satellitelayer"
        var SatelliteLayer = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v10/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoibW91c3RhcGhhOTQiLCJhIjoiY2ptaHJzcDN0MHd2bzN2cXk1bzNyaGg4bCJ9.-K0_-wg0or-3HAFtFZlEHw', {
            
            maxZoom: 19
        });
		 
		// la couche "Satellitelayer" est ajoutée à la carte			 
        map.addLayer(SatelliteLayer);

		
			
		// création d'une couche geoJson qui appelle le fichier "Brigade.geojson"													
		var  Brigade= $.getJSON("Brigade.geojson",function(dataBrigade)
										// icone mouga	
										{var iconeBrigade = L.icon({
													iconUrl: 'style/gn.jpg',
													iconSize: [27, 25]

																	});


     



		// fon ction pointToLayer qui ajoute la couche "Brigade1" à la carte, selon la symbologie "iconeBrigade", et paramètre la popup

		L.geoJson(dataBrigade,{
			pointToLayer: function(feature,latlng){
				var marker = L.marker(latlng,{icon: iconeBrigade});
				marker.bindPopup('<b><u>Description de la Gendarmerie Nationale</u></b><br>'
							   + "<b>Nom : </b>" + feature.properties.Nom+ '<br>'
							   + "<b>Numero de Telephone : </b>" + feature.properties.Num_Tel+ '<br>'
							   + "<b>Commune: </b>" + feature.properties.Commune+ '<br>'
							    + "<b>Site web : <a href=\"http://www.gendarmerie.dj\">Gendarmerie Nationale</a>" +'<br>'
                               + "<b>Numero vert : 116" 

							   
							   )

                 var mapStyle = {
                 	"overlay": {
            "type": "image",
            "url": "accident2.jpg",}}
				;
				return marker;
				}
						}).addTo(map);
										});				
															
															
		// création d'un contrôle des couches pour modifier les couches de fond de plan	
		var baseLayers = {
			"OpenStreetMap": osmLayer,
			"Satellite" : SatelliteLayer
			
		};
		L.control.layers(baseLayers).addTo(map);
}
