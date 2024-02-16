<?php

// Get latitude and longitude from the AJAX request
$country = $_GET['country'];

// Encode the country name
$encodedCountry = urlencode($country);


$apiUrl = "http://api.geonames.org/searchJSON?q={$encodedCountry}&maxRows=30&username=theodor164";


$response = file_get_contents($apiUrl);

// Send the response back to the client
echo $response;
?>