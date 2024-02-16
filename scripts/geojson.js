(function () {
  var data = {
    "type": "FeatureCollection",
    "features": [
      {
        "type": "Feature",
        "properties": {
          "name": "Emirates Stadium",
          "amenity": "Football Stadium",
          "popupContent": "This is where the Gunners play!",
          "icon": "../marker-icons/arsenal.webp"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [-0.1084, 51.5551], 
        }
      },
      {
        "type": "Feature",
        "properties": {
          "name": "London Stadium",
          "amenity": "Football Stadium",
          "popupContent": "This is where the Hammers play!",
          "icon": "../marker-icons/west_ham.jpg"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [-0.0172, 51.5387]
        }
      },
      {
        "type": "Feature",
        "properties": {
          "name": "Stamford Bridge",
          "amenity": "Football Stadium",
          "popupContent": "This is where Chelsea play!",
          "icon": "../marker-icons/chelsea.webp"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [-0.1910, 51.4817]
        }
      },
      {
        "type": "Feature",
        "properties": {
          "name": "Tottenham Hotspur Stadium",
          "amenity": "Football Stadium",
          "popupContent": "This is where the Spurs play!",
          "icon": "../marker-icons/tottenham.jpg"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [-0.0662, 51.6042]
        }
      },
    ]
  };

  window.geojsonData = data;
})();