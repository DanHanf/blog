/* HELLO */

window.onload = function mapInit() {

  var map = L.map(document.getElementById('map')).setView([40.749,-73.987], 13);

  var osmUrl='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  var osmAttrib='Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
  var osm = new L.TileLayer(osmUrl, {attribution: osmAttrib}).addTo(map);   
  //L.geoJson(stations, {}).addTo(map)
  stations.features.forEach(function(feature) {
    L.geoJson(feature, {
      pointToLayer: function(feature, latlng) {
        return L.circleMarker(latlng, geoJsonMarkerProperties)
      },
      onEachFeature: function(feature, layer){
        layer.bindPopup("Station ID: "+feature.properties.id+' <br /> Available Bikes: '+feature.properties.availableBikes+
          '<br /> Coordinates: '+feature.geometry.coordinates[1]+', '+feature.geometry.coordinates[0])
      }
    }).addTo(map)
  })
}

var geoJsonMarkerProperties = {
  radius: 4,
  fillColor: "#1D5B97",
  color: "#1D5B97",
  fillOpacity: .90
}