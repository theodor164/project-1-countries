<?php

$lat = $_GET['lat'];
$lng = $_GET['lng'];


$apiUrl = "http://api.geonames.org/findNearByWeatherJSON?lat={$lat}&lng={$lng}&username=theodor164";


$response = file_get_contents($apiUrl);

// Send the response back to the client
echo $response;
?>