<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="./css/navbarStyles.css">
  <link rel="stylesheet" href="./css/styles.css">
  <link rel="stylesheet" href="./css/mapStyles.css">
  <link rel="stylesheet" href="./css/modalStyles.css">
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
     integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
     crossorigin=""/>
  <link rel="stylesheet" href="https://unpkg.com/leaflet.markercluster@1.4.1/dist/MarkerCluster.css" />
  <link rel="stylesheet" href="https://unpkg.com/leaflet.markercluster@1.4.1/dist/MarkerCluster.Default.css" />
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/leaflet-easybutton@2/src/easy-button.css">
  <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
  <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
  integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
  crossorigin=""></script>
  <script src="https://unpkg.com/leaflet.markercluster@1.4.1/dist/leaflet.markercluster.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/leaflet-easybutton@2/src/easy-button.js"></script>
  <script src="https://kit.fontawesome.com/83764effb0.js" crossorigin="anonymous"></script>
  <title>GAZETTEER</title>
</head>
<body>
  
  <nav>
    <!-- <select id="countrySelect">
      <option value="us">United States</option>
      <option value="ca">Canada</option>
      <option value="uk">United Kingdom</option>
    </select> -->

    <?php include './scripts/countries.php'; ?>
  </nav>
  
  <div id="map"></div>
  
  <!-- Modal -->
  <div id="myModal" class="modal">
    <div class="modal-content">
      <span class="close" onclick="closeModal()">&times;</span>
      <div id="info"></div>
    </div>
  </div>
  
  <script src="./scripts/geojson.js"></script>
  <script src="./scripts/leaflet.js"></script>
  <script src="./scripts/modal.js"></script>

</body>
</html>