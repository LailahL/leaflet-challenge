

var myMap = L.map("map", {
    center: [38, -111.8910],
    zoom: 6
  });
  
  // Adding the tile layer
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(myMap);

  function chooseCol(depth) {
    if (depth >= 90) return "#FF0000";
    else if (depth >= 70) return "#FF5733";
    else if (depth >= 50) return "#FFA500";
    else if (depth >= 30) return "#FFAE42";
    else if (depth >= 10) return "#FFFF00";
    else if (depth >= -10) return "#9ACD32";
    else return "#008000";
}


var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
d3.json(url).then(function(response) {
    L.geoJSON(response.features, {
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
        }).addTo(myMap);
        });


    var legend = L.control({ position: "bottomright" });
    legend.onAdd = function() {
    var div = L.DomUtil.create("div", "info legend");
    div.innerHTML += '<div><span class="dot" style="background-color: red;"></span> Depth >= 90</div>';
    div.innerHTML += '<div><span class="dot" style="background-color: orange;"></span> 70 <= Depth < 90</div>';
    div.innerHTML += '<div><span class="dot" style="background-color: yellow;"></span> 50 <= Depth < 70</div>';
    div.innerHTML += '<div><span class="dot" style="background-color: yellowgreen;"></span> 30 <= Depth < 50</div>';
    div.innerHTML += '<div><span class="dot" style="background-color: green;"></span> Depth < 30</div>';
    return div;
    };
    legend.addTo(myMap);
