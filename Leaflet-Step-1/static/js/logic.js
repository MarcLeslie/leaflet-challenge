



//    Create map types
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
let basemap = 
{
    "Street Map" : streetMap,
    "Dark Map" : darkMap,
    "Satellite Map" : satelliteMap
}; 


// GET THE MAP AND GIVE IT A DEFAULT LAYER
let myMap = L.map("map",
{
    center: [37.09, -95.71],
    zoom: 5,
    layers: [satelliteMap] //THIS MAKES SATELLITE THE DEFAULT MAP
});

///////////////////THIS IS ALL SHIT FROM TRYING/FAILING BEFORE JAMIE VIDEO////////////////////////////////////////////////////////////////////

// let dataURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/1.0_week.geojson"; 



// d3.json(dataURL).then(function(data) // THIS IS WHAT MAKES THE MAP WORK
// { 
//     createFeatures(data.features);
//     // console.log('data features', data.features);
// }); 



// function createMap(quakes) {

//     // Define streetmap 
//     let streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", 
//     {
//       attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
//       tileSize: 512,
//       maxZoom: 18,
//       zoomOffset: -1,
//       id: "mapbox/streets-v11",
//       accessToken: API_KEY
//     });
  
   
//     // Create our map, giving it the streetmap and earthquakes layers to display on load
//     





// //DO YOUR CIRCLES FOR LOOP HERE LIKE FUNCTION MAG COLORS = 
// //MAKE CIRCLE RADIUS DEPENDENT ON MAGNITUTE 


// function createFeatures(yourData) {
//     // console.log('your data', yourData);
//     // let quakes = L.geoJson(
//     //         yourData,
//     //         {  onEachFeature: onEachFeature }
//     //     );

//     let quakeArr = [];
//     for (let i = 0; i < yourData.length; i++) {
//         let quake = L.circle(yourData[i].geometry.coordinates, {
//             _latlng: yourData[i].geometry.coordinates,
//             stroke: false,
//             fillOpacity: 0.75,
//             color: "orange",
//             fillColor: "orange",
//             radius: yourData[i].properties.mag * 10000
//         });
//         // L.latLng(yourData[i].geometry.coordinates);
//         console.log('quake', quake);
//         // console.log('coordinates', yourData[i].geometry.coordinates);
//         quakeArr.push(quake);
//     }

//     let quakes = L.geoJson(yourData, { onEachFeature: onEachFeature });
//     createMap(quakes);
// }

// // CREATE POP UP LABELS 
// function onEachFeature(feature, layer) {  //Pop up must have MAGNITURE, LOCATION, DEPTH 
//     layer.bindPopup("<h3>" + "Location:" + feature.properties.place +
//         "</h3><hr><p>" + "Magnitude:" + feature.properties.mag +
//         "</p><hr><p>" + "Depth:" + feature.geometry.coordinates[2] + "</p>"); //The [2] takes you to depth 
// }

// function createCircles(mag, depth) {
//     console.log('magnitude', mag);
//     console.log('depth', depth);
// }


  


//    // I NEED SOME WAY TO LOOK AT THE RANGE OF MAG AND DEPTH AND THIS DOES NOT WORK
// //    let depthMax = d3.json.max(yourData, function(d) {return +d.geometry}); 
// //    console.log(depthMax); 

// // Circle SIZE = quake MAG (> mag = larger circle)
// // Circle COLOR = quake DEPTH (> depth = darker circle)



  