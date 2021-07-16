let dataURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/1.0_week.geojson"; 

d3.json(dataURL).then(function(data) // THIS IS WHAT MAKES THE MAP WORK
{ 
    createFeatures(data.features);
    console.log(data.features); 
}); 


//DO YOUR CIRCLES FOR LOOP HERE LIKE FUNCTION MAG COLORS = 
//MAKE CIRCLE RADIUS DEPENDENT ON MAGNITUTE 
//HOW THE FUCK?????

function createFeatures(yourData)
{
    function onEachFeature(feature, layer)
        {  //Pop up must have MAGNITURE, LOCATION, DEPTH 
            layer.bindPopup("<h3>" + "Location:" +feature.properties.place + 
            "</h3><hr><p>" + "Magnitude:" + feature.properties.mag + 
            "</p><hr><p>" + "Depth:" + feature.geometry.coordinates[2] + "</p>"); //The [2] takes you to depth 
        }
    let quakes = L.geoJson(yourData, 
        {
            onEachFeature: onEachFeature
        });
    
    createMap(quakes); 
}


   // I NEED SOME WAY TO LOOK AT THE RANGE OF MAG AND DEPTH AND THIS DOES NOT WORKT
//    let depthMax = d3.json.max(yourData, function(d) {return +d.geometry}); 
//    console.log(depthMax); 

// Circle SIZE = quake MAG (> mag = larger circle)
// Circle COLOR = quake DEPTH (> depth = darker circle)


function createMap(quakes) {

    // Define streetmap 
    let streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", 
    {
      attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
      tileSize: 512,
      maxZoom: 18,
      zoomOffset: -1,
      id: "mapbox/streets-v11",
      accessToken: API_KEY
    });
  
   
    // Create our map, giving it the streetmap and earthquakes layers to display on load
    var myMap = L.map("map", 
    {
      center: [37.09, -95.71],
      zoom: 5,
      layers: [streetmap, quakes]
    });

}
  