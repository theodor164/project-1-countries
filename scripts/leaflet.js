var data = window.geojsonData;

function swapLatLongCoordinates(coordinates) {
  return coordinates.map((area) =>
    area.map((polygon) => polygon.map((coord) => [coord[1], coord[0]]))
  );
}
$(document).ready(function() {
  // Event listener for the select element
  $("#countrySelect").on("change", function() {
    var selectedCountryCode = $(this).val();

    // Call a function to fetch coordinates based on the selected country code
    console.log('here');
    fetchCoordinates(selectedCountryCode);
  });
});
 // Function to fetch coordinates based on the selected country code
 function fetchCoordinates(countryCode) {
  // Make an AJAX request to fetch the JSON data
  $.ajax({
    url: './scripts/countryBorders.geo.json', 
    dataType: 'json',
    success: function(data) {
      // Find the selected country in the JSON data
      var selectedCountry = data.features.find(function(country) {
        return country.properties.iso_a2 === countryCode;
      });

      if (selectedCountry) {
        // Swap the coordinates if needed
        var coordinates = swapLatLongCoordinates([selectedCountry.geometry.coordinates]);

        // Update the map bounds
        map.fitBounds(coordinates);
      } else {
        console.error('Selected country not found in the JSON data.');
      }
    },
    error: function(xhr, status, error) {
      console.error('Error fetching JSON data:', status, error);
    }
  });
}

var originalCoordinates = [
  [
    [-90.09555457229098, 13.735337632700734],
    [-90.60862403030085, 13.909771429901951],
    [-91.23241024449605, 13.927832342987957],
    [-91.68974667027912, 14.126218166556455],
    [-92.22775000686983, 14.538828640190928],
    [-92.20322953974731, 14.830102850804069],
    [-92.08721594925207, 15.06458466232844],
    [-92.22924862340628, 15.25144664149586],
    [-91.74796017125591, 16.066564846251723],
    [-90.46447262242265, 16.069562079324655],
    [-90.43886695022204, 16.410109768128095],
    [-90.60084672724092, 16.47077789963876],
    [-90.71182186558772, 16.687483018454728],
    [-91.08167009150065, 16.918476670799404],
    [-91.45392127151516, 17.252177232324172],
    [-91.0022692532842, 17.25465770107418],
    [-91.00151994501596, 17.81759491624571],
    [-90.06793351923098, 17.819326076727474],
    [-89.14308041050332, 17.80831899664932],
    [-89.15080603713095, 17.015576687075836],
    [-89.22912167026928, 15.88693756760517],
    [-88.93061275913527, 15.887273464415074],
    [-88.60458614780583, 15.70638011317736],
    [-88.51836402052686, 15.855389105690975],
    [-88.22502275262202, 15.727722479713902],
    [-88.68067969435563, 15.346247056535304],
    [-89.15481096063357, 15.06641917567481],
    [-89.22522009963127, 14.874286200413621],
    [-89.14553504103718, 14.678019110569084],
    [-89.35332597528279, 14.424132798719116],
    [-89.58734269891654, 14.362586167859488],
    [-89.53421932652051, 14.244815578666305],
    [-89.72193396682073, 14.134228013561694],
    [-90.0646779039966, 13.881969509328924],
    [-90.09555457229098, 13.735337632700734],
  ],
];
var swappedCoordinates = swapLatLongCoordinates([originalCoordinates]);

var map = L.map("map").fitBounds(swappedCoordinates);

var markerCluster = L.markerClusterGroup();
var selectedPinsCluster = L.markerClusterGroup();

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

var popup = L.popup();

function onMapClick(e) {
  var modal = document.getElementById("myModal");
  modal.style.display = "block";
  var informationParagraph = document.querySelector("#info");
  informationParagraph.innerHTML = e.latlng.toString();

  console.log(e);

  // $(".leaflet-marker-icon").remove(); $(".leaflet-popup").remove(); // remove existing markers
  // $(".leaflet-pane.leaflet-shadow-pane").remove();    //remove marker shadow

  let marker = L.marker([e.latlng.lat, e.latlng.lng]);
  marker.bindPopup(`lat: ${e.latlng.lat}, lng: ${e.latlng.lng}`)
  selectedPinsCluster.addLayer(marker);
  map.addLayer(selectedPinsCluster);
}

// Function to close the modal
function closeModal() {
  var modal = document.getElementById("myModal");
  modal.style.display = "none";
}

map.on("click", onMapClick);

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
  map.setView([position.coords.latitude, position.coords.longitude], 13);

  // Display a marker at your current location
  L.easyButton("fa-crosshairs", function (btn, map) {
    yourPosition
      .setLatLng([position.coords.latitude, position.coords.longitude])
      .openOn(map);
  }).addTo(map);
}
