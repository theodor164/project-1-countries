var data = window.geojsonData;
var highlightedLayer; // Global variable to store the highlighted layer

function swapLatLongCoordinates(coordinates) {
  return coordinates.map((area) =>
    area.map((polygon) => polygon.map((coord) => [coord[1], coord[0]]))
  );
}

$(document).ready(function () {
  // Event listener for the select element
  $("#countrySelect").on("change", function () {
    var selectedCountryCode = $(this).val();

    // Remove the previously highlighted country
    if (highlightedLayer) {
      map.removeLayer(highlightedLayer);
      highlightedLayer = null;
    }
    // Call a function to fetch coordinates based on the selected country code
    fetchCoordinates(selectedCountryCode);
  });
});

// Function to fetch coordinates based on the selected country code
function fetchCoordinates(countryCode) {
  // Make an AJAX request to fetch the JSON data
  $.ajax({
    url: "./scripts/countryBorders.geo.json",
    dataType: "json",
    success: function (data) {
      // Find the selected country in the JSON data
      var selectedCountry = data.features.find(function (country) {
        return country.properties.iso_a2 === countryCode;
      });

      if (selectedCountry) {
        if (!highlightedLayer) {
          highlightedLayer = L.geoJson(selectedCountry, {
            style: {
              fillColor: "red",
              fillOpacity: 0.1,
              color: "red",
              weight: 2,
            },
          }).addTo(map);

          // Update the map bounds
          map.fitBounds(highlightedLayer.getBounds());
        }
      } else {
        console.error("Selected country not found in the JSON data.");
      }
    },
    error: function (xhr, status, error) {
      console.error("Error fetching JSON data:", status, error);
    },
  });
}

var markerCluster = L.markerClusterGroup();

var streets = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
});

var satellite = L.tileLayer(
  "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
  {
    attribution:
      "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
  }
);

var basemaps = {
  "Streets": streets,
  "Satellite": satellite
};

var map = L.map("map", {
  layers: [streets]
}).setView([54.5, -4], 6);

var layerControl = L.control.layers(basemaps).addTo(map);

var popup = L.popup();

L.geoJson(data, {
  onEachFeature: function (feature, layer) {
    layer.bindPopup(feature.properties.name);
  },
  pointToLayer: function (feature, latlng) {
    var myicon = L.icon({
      iconUrl: feature.properties.icon,
      iconSize: [24, 24],
      iconAnchor: [0, 24],
      popupAnchor: [12, -32],
    });

    var marker = L.marker(latlng, { icon: myicon });
    markerCluster.addLayer(marker); // Add marker to the cluster group
    return marker;
  },
}).addTo(markerCluster);

map.addLayer(markerCluster);

var yourPosition = L.popup().setContent("Your Position!");

navigator.geolocation.getCurrentPosition(showPosition);

function showPosition(position) {
  // Set the map view to the current location
  // map.setView([position.coords.latitude, position.coords.longitude], 13);
  $.ajax({
    url: "./scripts/getLocationInfo.php",
    type: "GET",
    data: { lat: position.coords.latitude, lng: position.coords.longitude },
    success: function (response) {
      if (!response) {
        console.error("Empty response received.");
        return;
      }
      // Parse OpenCage API response
      var locationInfo = JSON.parse(response);
      fetchCoordinates(
        locationInfo.results[0].components["ISO_3166-1_alpha-2"]
      );
      $("#countrySelect")
        .val(locationInfo.results[0].components["ISO_3166-1_alpha-2"])
        .trigger("change");
    },
    error: function (xhr, status, error) {
      console.error("Error fetching location info:", status, error);
    },
  });

  // Display a marker at your current location
  L.easyButton("fa-crosshairs", function (btn, map) {
    yourPosition
      .setLatLng([position.coords.latitude, position.coords.longitude])
      .openOn(map);
    map.setView([position.coords.latitude, position.coords.longitude], 13);
  }).addTo(map);
}
