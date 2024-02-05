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
          "icon": "https://upload.wikimedia.org/wikipedia/en/thumb/5/53/Arsenal_FC.svg/1200px-Arsenal_FC.svg.png"
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
          "icon": "https://yt3.googleusercontent.com/XfyIR7Fer_xgIAX1Cs5jFFrjEFyA-iHSKWGMTNu3Al-V_lZlTWcszIXhR-Y5b8uCcWPPikJhr2k=s900-c-k-c0x00ffffff-no-rj"
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
          "icon": "https://upload.wikimedia.org/wikipedia/en/thumb/c/cc/Chelsea_FC.svg/1200px-Chelsea_FC.svg.png"
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
          "icon": "https://ichef.bbci.co.uk/ace/standard/480/cpsprodpb/2052/live/4d614ac0-f52c-11eb-8617-87bebb01a75e.jpg"
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