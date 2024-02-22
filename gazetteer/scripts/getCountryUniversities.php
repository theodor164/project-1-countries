<?php

// Get latitude and longitude from the AJAX request
$country = $_GET['country'];

$apiUrl = "http://api.geonames.org/searchJSON?q=university&maxRows=30&username=theodor164&country={$country}";

$response = file_get_contents($apiUrl);

// Send the response back to the client
echo $response;
?>