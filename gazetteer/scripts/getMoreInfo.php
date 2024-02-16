<?php

// Get latitude and longitude from the AJAX request
$country = $_GET['country'];


$apiUrl = "http://api.geonames.org/countryInfoJSON?formatted=true&country={$country}&username=theodor164&style=full";


$response = file_get_contents($apiUrl);

// Send the response back to the client
echo $response;
?>