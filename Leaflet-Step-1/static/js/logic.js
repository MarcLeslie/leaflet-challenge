let dataURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/1.0_week.geojson"

d3.json(dataURL).then(function(data)
{
    createFeatures(data.features);
    console.log(data.features);
})