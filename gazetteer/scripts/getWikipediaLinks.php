<?php


$city = $_GET['city'];

// Encode the country name
$encodedCity = urlencode($city);

$apiUrl = "http://api.geonames.org/wikipediaSearchJSON?q={$encodedCity}&maxRows=5&username=theodor164";


$response = file_get_contents($apiUrl);

// Send the response back to the client
echo $response;
?>