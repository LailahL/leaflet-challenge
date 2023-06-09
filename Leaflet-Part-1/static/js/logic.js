

var myMap = L.map("map", {
    center: [38, -111.8910],
    zoom: 6
  });
  
  // Adding the tile layer
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(myMap);

//   function chooseCol(depth) {
//     if (depth >= 90) return "#FF0000";
//     else if (depth >= 70) return "#FF5733";
//     else if (depth >= 50) return "#FFA500";
//     else if (depth >= 30) return "#FFAE42";
//     else if (depth >= 10) return "#FFFF00";
//     else if (depth >= -10) return "#9ACD32";
//     else return "#008000";
// }

function chooseCol(depth) {
  if (depth <=-10) return "#008000";
  else if (depth <= 10) return "#008000";
  else if (depth <= 30) return "#9ACD32";
  else if (depth <= 50) return "#FFFF00";
  else if (depth <= 70) return "#FFA500";
  else if (depth <= 90) return "#FF5733";
  else return "#800000";

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
    div.innerHTML += '<div><span class="dot" style="background-color: #008000;"></span> -10-10</div>';
    div.innerHTML += '<div><span class="dot" style="background-color: #9ACD32;"></span> 10-30</div>';
    div.innerHTML += '<div><span class="dot" style="background-color: #FFFF00;"></span> 30-50</div>';
    div.innerHTML += '<div><span class="dot" style="background-color: #FFA500;"></span> 50-70</div>';
    div.innerHTML += '<div><span class="dot" style="background-color: #FF5733;"></span> 70-90</div>';
    div.innerHTML += '<div><span class="dot" style="background-color: #800000;"></span> 90+</div>';
    return div;
    };
    legend.addTo(myMap);
