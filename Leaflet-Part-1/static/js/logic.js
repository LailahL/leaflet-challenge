var myMap = L.map("map", {
  center: [37.7749, -122.4194],
  zoom: 13
});

// Adding the tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";


var legend = L.control({ position: "bottomright" });
  legend.onAdd = function() {
    var div = L.DomUtil.create("div", "info legend");
    legend.addTo(myMap);
  }

function chooseColor(depth {
    if (depth >=90) return "red";
    else if (depth >=70) return "red orange";
    else if (depth >=50) return "orange";
    else if (depth >=30) return "yellow orange";
    else if (depth >=10) return "yellow";
    else if (depth >=-10) return "yellow green";
    else return "black";
})

d3.json(url).then(function(response) {

  console.log(response);

  var heatArray=[]

  for (var i = 0; i < response.length; i++) {
    var location = response[i].features.geometry;

    if (location) {
        heatArray.push([location.coordinates[1], location.coordinates[0]]);
      }
    }
    L.heatLayer(heatArray, {
        style: function(feature) {
            return {
            color: "white",
            fillColor: chooseColor(features.geometry.coordinates[2]),
            fillOpacity: 0.5,
            weight: 1.5
            radius:features.properties.mag
            };
        }
    })

    onEachFeature: function(feature, layer) {
        layer.on({
        click: function(event) {
            layer = event.target;
            layer.bindPopup("<h1>" + feature.properties.type+ "</h1> <hr> <h2>" + feature.properties.title + "</h2>");
            }
        })

    }}).addTo(myMap);




