// When encountering "CORS" issues, run this code on terminal in the same folder :
// python -m http.server 8080 --bind 127.0.0.1
function chooseCol(depth) {
  if (depth <=-10) return "#008000";
  else if (depth <= 10) return "#008000";
  else if (depth <= 30) return "#9ACD32";
  else if (depth <= 50) return "#FFFF00";
  else if (depth <= 70) return "#FFA500";
  else if (depth <= 90) return "#FF5733";
  else return "#800000";

};

var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
d3.json(url).then(function(data) {

  var earthquakes=L.geoJSON(data.features, {
       // Create a circle marker for each feature
        pointToLayer: function(feature,latlng) {
        // Define the style of the circle marker
        var markerStyle = {
            color: "black",
            // fillColor: "green",
            fillColor: chooseCol(feature.geometry.coordinates[2]),
            fillOpacity: 0.5,
            weight: 1.5,
            radius: feature.properties.mag*5
        };

        // Return the circle marker
        return L.circleMarker(latlng, markerStyle).bindPopup(`<h1> ${feature.properties.type} Magnitude: ${feature.properties.mag}</h1> <hr> <h2>Location: ${feature.properties.title}</h2> <h3>  Depth: ${feature.geometry.coordinates[2]}</h3>`);
    
          }
  });


const path='./static/GeoJSON/PB2002_plates.json';
d3.json(path).then(function(pl_data){
  console.log(pl_data);

  var tectonic_plates= L.geoJSON(pl_data,{
    style: {
      color: "yellow",
      weight: 1
    },
    onEachFeature: function(feature) {
      L.polyline(feature.geometry.coordinates, {
        color: "yellow",
        weight: 1,
        fillOpacity: 0
      })
    
  }
  });

 


        // Create the base layers.
        var satellite = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
          maxZoom: 20,
          subdomains:['mt0','mt1','mt2','mt3']
        })

        var grayscale = L.tileLayer('http://tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: 'Map data &copy; <a href="http://openstreetmap.org/">OpenStreetMap</a> contributors',
          maxZoom: 14, 
          minZoom: 2,
          tileFunction: function (coords, url) {
            return L.Util.template(url, coords) + '?grayscale';
          }
        })
      
        var outdoors = L.tileLayer('https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png', {
          maxZoom: 20,
          attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
        });
      
        // Create a baseMaps object.
        var baseMaps = {
          "Satellite": satellite,
          "Grayscale": grayscale,
          "Outdoors":outdoors
        };
      
        // Create an overlay object to hold our overlay.
        var overlayMaps = {
          Tectonic_Plates: tectonic_plates,
          Earthquakes: earthquakes 
        };
      

  
// Create our map, giving it the satellite,grayscale, outdoors, earthquakes, & tectonic Plates layers to display on load.
  var myMap = L.map("map", {
    center: [38, -111.8910],
    zoom: 6,
    layers: [satellite, grayscale, earthquakes,tectonic_plates]
  });

    var legend = L.control({ position: "bottomright" });
    legend.onAdd = function() {
    var div = L.DomUtil.create("div", "info legend");
    div.innerHTML += '<div><span class="dot" style="background-color: #008000;"></span> -10-10</div>';
    div.innerHTML += '<div><span class="dot" style="background-color: #9ACD32;"></span> 10-30</div>';
    div.innerHTML += '<div><span class="dot" style="background-color: #FFFF00;"></span> 30-50</div>';
    div.innerHTML += '<div><span class="dot" style="background-color: #FFA500;"></span> 50-70</div>';
    div.innerHTML += '<div><span class="dot" style="background-color: #FF5733;"></span> 70-90</div>';
    div.innerHTML += '<div><span class="dot" style="background-color: #800000;"></span> 90+</div>';
    return div;
    };
    legend.addTo(myMap);


 // Create a layer control.
    // Pass it our baseMaps and overlayMaps.
    // Add the layer control to the map.
    L.control.layers(baseMaps, overlayMaps, {
      collapsed: false
      }).addTo(myMap);

    });
  });