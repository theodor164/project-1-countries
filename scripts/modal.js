var selectedPinsCluster = L.markerClusterGroup();

function onMapClick(e) {

  var modal = document.getElementById("myModal");
  modal.style.display = "block";
  var informationParagraph = document.querySelector("#info");
  informationParagraph.innerHTML = e.latlng.toString();

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