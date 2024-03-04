<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="./css/leaflet.extra-markers.min.css">
  <link rel="stylesheet" href="leaflet.css" />  
  <link rel="stylesheet" href="MarkerCluster.css">
  <link rel="stylesheet" href="MarkerCluster.Default.css">
  <link rel="stylesheet" href="easy-button.css">
  <link rel="stylesheet" href="bootstrap.min.css">
  <link rel="stylesheet" href="./css/css/all.css">
  <link rel="stylesheet" href="./css/styles.css">
  <link rel="stylesheet" href="./css/mapStyles.css">
  <link rel="stylesheet" href="./css/modalStyles.css">
  <link rel="apple-touch-icon" sizes="180x180" href="apple-touch-icon.png">
  <link rel="icon" type="image/png" sizes="32x32" href="favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="16x16" href="favicon-16x16.png">
  <link rel="manifest" href="site.webmanifest">
  <title>Gazetteer</title>
</head>

<body>
  
  <nav id="navbar" class="navbar navbar-expand-lg navbar-light bg-light">
    <?php include './scripts/countries.php'; ?>
  </nav>
  
  <div id="map"></div>
  
  <!-- Modal -->
  <div id="myModal" class="my-modal">
    <div class="modal-content">
      <span class="close" onclick="closeModal()">&times;</span>
      <div id="info">
        <div id="loader"></div>
      </div>
    </div>
  </div>
  
  <!-- Modal2 -->
  <div id="myModal2" class="modal">
    <div class="modal-content">
      <span class="close" onclick="closeModal2()">&times;</span>
      <div id="modal-content2"></div>
    </div>
  </div>

  <!-- Modal3 -->
  <div id="myModal3" class="modal">
    <div class="modal-content">
    <span class="close" onclick="closeModal3()">&times;</span>
    <div id="modal-content3"></div>
  </div>
</div>

<!-- Modal4 -->
<div id="myModal4" class="modal">
  <div class="modal-content">
    <span class="close" onclick="closeModal4()">&times;</span>
    <div id="modal-content4"></div>
  </div>
</div>

<!-- Modal5 -->
<div id="myModal5" class="modal">
  <div class="modal-content">
    <span class="close" onclick="closeModal5()">&times;</span>
    <div id="modal-content5"></div>
  </div>
</div>

<!-- Modal6 -->
<div id="myModal6" class="modal">
  <div class="modal-content">
    <span class="close" onclick="closeModal6()">&times;</span>
    <div id="modal-content6"></div>
  </div>
</div>

<script src="jquery-3.7.1.min.js"></script>
<script src="leaflet.js"></script>
<script src="leaflet.markercluster.js"></script>
<script src="easy-button.js"></script>
<script src="./scripts/leaflet.extra-markers.min.js"></script>
<script src="bootstrap.min.js"></script>
<script src="./scripts/geojson.js"></script>
<script src="./scripts/leaflet.js"></script>
<script src="./scripts/modal.js"></script>
</body>
</html>