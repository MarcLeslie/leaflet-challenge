///////    Create map types
let streetMap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", 
{
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
});

let darkMap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", 
{
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "dark-v10",
    accessToken: API_KEY
});

let satelliteMap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", 
{
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/satellite-v9",
    accessToken: API_KEY
});





//Add all three map types into a var called basemap as a "control layer"
let baseMaps = 
{
    "Street Map" : streetMap,
    "Dark Map" : darkMap,
    "Satellite Map" : satelliteMap
}; 

// CREATE QUAKE DATA AS A NEW LAYER GROUP
let quake = new L.LayerGroup();
let techPlates = new L.LayerGroup(); 



// OVERLAP MAPS - HERE IS WHERE THE QUAKE DATA GETS CALLED IN
let overlayMaps = {
    "Quake!" : quake, 
    "Tectonic Plates" : techPlates
}; 

// GET THE MAP AND GIVE IT A DEFAULT LAYER
let myMap = L.map("map",
{
    center: [37.09, -95.71],
    zoom: 5,
    layers: [satelliteMap, quake, techPlates] //Everything in these brackets show up by default 
});



// LAYER CONTROL TO SWITCH BACK AND FORTH
L.control.layers(baseMaps, overlayMaps, 
{
    collapsed: false
}).addTo(myMap);


// load data
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/1.0_week.geojson").then(function(data)
{
    console.log(data);

    //create circle markers
    //est radius for mag size/circle size - > mag = > circle size
    function estRadius(mag) 
    {
        return Math.sqrt(mag) *6;  // multiply if needed
    }

    // est circle color - > depth = darker circles 
    function circleColor(depth) 
    {
        switch (true) 
        { //this part tells it to execute the rest of the code if there is a depth
            case depth > 90: return "#bd0026"; //colors from colorbrewer2.org
            case depth > 70: return "#f03b20"; 
            case depth > 50: return "#fd8d3c"; 
            case depth > 30: return "#feb24c"; 
            case depth > 10: return "#fed976"; 
            default: return "#ffffb2";   
        }
    }

    // style the circle markers
    function getStylish(features){
        return{
            fillColor: circleColor(features.geometry.coordinates[2]),
            radius: estRadius(features.properties.mag), 
            weight: 0.5,
            stroke: false,
            opacity: 0.9, 
            fillOpacity: 0.7 
        }
    }

    // add in geoJSON layer to actually create circles 
    L.geoJSON(data, {
        pointToLayer: function(feature, latLng) {
            return L.circleMarker(latLng); // circleMarker is an inherit function
        },
        style: getStylish,
        
        // CREATE POP UP LABELS 
        onEachFeature: function(features, layer) {  //Pop up must have MAGNITURE, LOCATION, DEPTH 
            layer.bindPopup(
                "<h3>" + "Location: " + features.properties.place +
                "</h3><hr><p>" + "Magnitude: " + features.properties.mag +
                "</p><hr><p>" + "Depth: " + features.geometry.coordinates[2] + "</p>"  //The [2] takes you to depth 
            );
        }        
    }).addTo(quake); 
});  //END OF ACCESS TO DATA




//get techtonic plates data, add to layer and map from https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json
d3.json("https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json").then(function(plateData) {
    L.geoJSON(plateData, {
        color: "red", 
        weight: 2.0, 
    })
    .addTo(techPlates);
});

// add legend for depth
let legend = L.control({position: 'bottomright'}); 

legend.onAdd = function() {
    var div = L.DomUtil.create('div' , 'info legend'), 
    grades = [90, 70, 50, 30, 20, 10], 
    colors = ["#bd0026" , "#f03b20" , "#fd8d3c", "#feb24c", "#fed976", "#ffffb2"]; //colors match the depth colors so change both if you change one 
    
    for(var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style = "background: '
            + colors[i]
            + '"></i>'
            + grades[i]
            + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }
    return div; 
}; 

legend.addTo(myMap); 







  