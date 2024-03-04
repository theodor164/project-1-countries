<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="./css/styles.css">
  <link rel="stylesheet" href="./css/mapStyles.css">
  <link rel="stylesheet" href="./css/modalStyles.css">
  <link rel="stylesheet" href="./css/leaflet.extra-markers.min.css">
  <!-- <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
     integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
     crossorigin=""/> -->
  <link rel="stylesheet" href="leaflet.css" />  
  <!-- <link rel="stylesheet" href="https://unpkg.com/leaflet.markercluster@1.4.1/dist/MarkerCluster.css" /> -->
  <link rel="stylesheet" href="MarkerCluster.css">
  <!-- <link rel="stylesheet" href="https://unpkg.com/leaflet.markercluster@1.4.1/dist/MarkerCluster.Default.css" /> -->
  <link rel="stylesheet" href="MarkerCluster.Default.css">
  <link rel="stylesheet" href="easy-button.css">
  <!-- <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous"> -->
  <!-- <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous"> -->
  <link rel="stylesheet" href="bootstrap.min.css">
  <link rel="stylesheet" href="./css/css/all.css">
  <link rel="apple-touch-icon" sizes="180x180" href="apple-touch-icon.png">
  <link rel="icon" type="image/png" sizes="32x32" href="favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="16x16" href="favicon-16x16.png">
  <link rel="manifest" href="site.webmanifest">
  <script src="jquery-3.7.1.min.js"></script>
  <!-- <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
  integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
  crossorigin=""></script> -->
  <script src="leaflet.js"></script>
  <!-- <script src="https://unpkg.com/leaflet.markercluster@1.4.1/dist/leaflet.markercluster.js"></script> -->
  <script src="leaflet.markercluster.js"></script>
  <script src="easy-button.js"></script>
  <!-- <script src="https://kit.fontawesome.com/83764effb0.js" crossorigin="anonymous"></script> -->
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

  <script src="./scripts/leaflet.extra-markers.min.js"></script>
  <script src="./scripts/geojson.js"></script>
  <script src="./scripts/leaflet.js"></script>
  <script src="./scripts/modal.js"></script>

  <!-- <script src="https://cdn.jsdelivr.net/npm/popper.js@1.14.7/dist/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script> -->
  <!-- <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js" integrity="sha384-I7E8VVD/ismYTF4hNIPjVp/Zjvgyol6VFvRkX/vR+Vc4jQkC+hVqc2pM8ODewa9r" crossorigin="anonymous"></script> -->
  <!-- <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.min.js" integrity="sha384-0pUGZvbkm6XF6gxjEnlmuGrJXVbNuzT9qBBavbLwCsOGabYfZo0T0to5eqruptLy" crossorigin="anonymous"></script> -->
  <script src="bootstrap.min.js"></script>
</body>
</html>